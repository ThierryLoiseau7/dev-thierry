import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

const ROAST_SYSTEM_PROMPT = `You are a brutally honest but constructive senior web developer and UX expert who gives savage but genuinely helpful website feedback. Your style is like a tech Twitter roast — funny, specific, cutting, but always with actionable advice.

Analyze the website content and roast it using EXACTLY this format:

## Overall Verdict
[One brutal but funny sentence summarizing the site]

## 🔥 The Roast

[4-5 specific roast points. Be specific — reference actual content, headlines, or copy from the site. Each point is 1-3 sentences, witty and direct. Cover: hero copy, value proposition, calls-to-action, SEO basics, design red flags if mentioned.]

## 💡 Fix It (You're Welcome)
1. [Specific actionable improvement]
2. [Specific actionable improvement]
3. [Specific actionable improvement]

## Final Score: X/10
[One-liner closing joke with a tiny note of encouragement]

Rules:
- Be funny and SPECIFIC using actual content from the site — no generic feedback
- Tone = a brilliant senior dev roasting a friend's site at a hackathon
- Never be mean about the person, only about the website decisions
- If the site is actually good, still find 3 things to roast (nothing is perfect)
- Always end with a hint of genuine encouragement`;

function stripTag(html: string, tag: string) {
  return html.replace(new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, "gi"), "");
}

function innerText(html: string) {
  // Add space before tags to prevent word concatenation (e.g. "Web,Web3")
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function cleanText(text: string) {
  // Fix missing spaces after punctuation (e.g. "Web,Web3" → "Web, Web3")
  return text
    .replace(/([,.:;!?])([^\s\d])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

function extractContent(html: string, url: string) {
  // Remove noise: scripts, styles, comments
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Remove navigation, header, footer — these cause "DTDevThierry" style noise
  clean = stripTag(clean, "nav");
  clean = stripTag(clean, "header");
  clean = stripTag(clean, "footer");

  // Meta
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']{0,300})/i)?.[1] ??
    html.match(/<meta[^>]*content=["']([^"']{0,300})[^>]*name=["']description["']/i)?.[1] ??
    "";

  // Headings from cleaned body (no nav)
  const h1 = cleanText(clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "") ?? "");

  const h2Matches: string[] = [];
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let h2Match;
  while ((h2Match = h2Regex.exec(clean)) !== null && h2Matches.length < 6) {
    const text = cleanText(innerText(h2Match[1]));
    if (text.length > 2) h2Matches.push(text);
  }

  // Paragraphs — real content only (min 30 chars, skip short fragments)
  const paraMatches: string[] = [];
  const paraRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let paraMatch;
  while ((paraMatch = paraRegex.exec(clean)) !== null && paraMatches.length < 6) {
    const text = cleanText(innerText(paraMatch[1]));
    if (text.length > 30) paraMatches.push(text);
  }

  // CTAs — only real action-oriented links/buttons (exclude gallery filenames, numbers, etc.)
  const ctaMatches: string[] = [];
  const ctaRegex = /<(?:a|button)[^>]*>([\s\S]*?)<\/(?:a|button)>/gi;
  let ctaMatch;
  while ((ctaMatch = ctaRegex.exec(clean)) !== null && ctaMatches.length < 8) {
    const text = cleanText(innerText(ctaMatch[1]));
    // Skip: too short, too long, looks like a filename/number, contains # symbols
    const looksLikeFilename = /\d{2}$/.test(text) || /^[#\d]/.test(text);
    if (text.length > 3 && text.length < 45 && !looksLikeFilename) ctaMatches.push(text);
  }

  return {
    url,
    title,
    description,
    h1,
    h2s: h2Matches,
    paragraphs: paraMatches,
    ctas: ctaMatches.filter((v, i, a) => a.indexOf(v) === i), // deduplicate
  };
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url?.trim()) {
      return new Response("No URL provided", { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return new Response("Invalid URL", { status: 400 });
    }

    // Fetch the page
    let html = "";
    try {
      const res = await fetch(parsedUrl.href, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DevThierry-Roaster/1.0)" },
        signal: AbortSignal.timeout(8000),
      });
      html = await res.text();
    } catch {
      return new Response("Could not fetch this URL. Make sure the site is public and try again.", { status: 422 });
    }

    const content = extractContent(html, parsedUrl.href);

    const userPrompt = `Roast this website:
URL: ${content.url}
Title: ${content.title}
Meta description: ${content.description || "(none)"}
H1: ${content.h1 || "(none)"}
H2 headings: ${content.h2s.length ? content.h2s.join(" | ") : "(none)"}
Page paragraphs: ${content.paragraphs.length ? content.paragraphs.join(" // ") : "(none)"}
CTAs / buttons: ${content.ctas.length ? content.ctas.join(" | ") : "(none)"}`;

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      stream: true,
      messages: [
        { role: "system", content: ROAST_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Roast API error:", err);
    return new Response("Service unavailable. Please try again.", { status: 500 });
  }
}
