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

function extractContent(html: string, url: string) {
  // Strip scripts and styles
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const title = clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description =
    clean.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']{0,300})/i)?.[1] ??
    clean.match(/<meta[^>]*content=["']([^"']{0,300})[^>]*name=["']description["']/i)?.[1] ??
    "";
  const h1 = clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
  const h2Matches: string[] = [];
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let h2Match;
  while ((h2Match = h2Regex.exec(clean)) !== null && h2Matches.length < 6) {
    const text = h2Match[1].replace(/<[^>]+>/g, "").trim();
    if (text) h2Matches.push(text);
  }
  const h2s = h2Matches;

  const ctaMatches: string[] = [];
  const ctaRegex = /<(?:a|button)[^>]*>([\s\S]*?)<\/(?:a|button)>/gi;
  let ctaMatch;
  while ((ctaMatch = ctaRegex.exec(clean)) !== null && ctaMatches.length < 10) {
    const text = ctaMatch[1].replace(/<[^>]+>/g, "").trim();
    if (text.length > 2 && text.length < 60) ctaMatches.push(text);
  }
  const ctas = ctaMatches;

  const bodyText = clean
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);

  return { url, title, description, h1, h2s, ctas, bodyText };
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
H2s: ${content.h2s.length ? content.h2s.join(" | ") : "(none)"}
CTAs found: ${content.ctas.length ? content.ctas.join(" | ") : "(none)"}
Page text snippet: ${content.bodyText}`;

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
