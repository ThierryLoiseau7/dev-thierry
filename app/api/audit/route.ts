import OpenAI from "openai";

const SYSTEM_PROMPT = `You are an expert tech consultant. Analyze a client's project description and return a JSON object with this exact structure.

IMPORTANT: Detect the language of the client's description and write ALL text values in that same language (French, English, Spanish, Haitian Creole, etc.). Only the JSON keys must stay in English.

{
  "projectType": "Short label (e.g. SaaS Platform, E-commerce, Web3 App, Landing Page, Mobile App, AI Tool, DeFi Protocol)",
  "complexity": "Simple" | "Medium" | "Complex",
  "summary": "2 sentences max — what the project is and its goal",
  "techStack": ["Tech1", "Tech2", "Tech3", ...],
  "challenges": ["Main technical challenge", "Second challenge", "Third challenge"],
  "services": [
    {
      "id": "webdev",
      "name": "Web Development",
      "match": "high" | "medium" | "low" | "none",
      "reason": "Specific reason why this service applies or doesn't"
    },
    {
      "id": "ai",
      "name": "AI Integration",
      "match": "high" | "medium" | "low" | "none",
      "reason": "Specific reason"
    },
    {
      "id": "blockchain",
      "name": "Blockchain / Web3",
      "match": "high" | "medium" | "low" | "none",
      "reason": "Specific reason"
    },
    {
      "id": "bot",
      "name": "Telegram Bot / Automation",
      "match": "high" | "medium" | "low" | "none",
      "reason": "Specific reason"
    }
  ],
  "timeline": "Estimated timeline (e.g. 1-2 weeks, 3-4 weeks, 2-3 months)",
  "budget": "Rough budget range in USD (e.g. $500-1,500 / $2,000-5,000 / $5,000+)",
  "verdict": "One punchy sentence — the most important thing this client needs to know to move forward"
}

Only return valid JSON. No markdown, no extra text. Be honest and specific — not everything needs all services.`;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description?.trim()) {
      return new Response("No project description provided", { status: 400 });
    }

    if (description.length > 4000) {
      return new Response("Description too long (max 4,000 characters)", { status: 400 });
    }

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Analyze this project:\n\n${description}`,
        },
      ],
    });

    const json = completion.choices[0]?.message?.content ?? "{}";

    return new Response(json, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Project analysis API error:", err);
    return new Response(JSON.stringify({ error: "Analysis service unavailable." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
