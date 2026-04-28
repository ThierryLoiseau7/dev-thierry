import OpenAI from "openai";
import { AGENT_SYSTEM_PROMPT } from "@/lib/constants";

interface RequestMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const body = await request.json();
    const { messages } = body as { messages: RequestMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const ALLOWED_ROLES = new Set(["user", "assistant"]);
    const trimmed = messages
      .slice(-20)
      .filter((m) => m.content?.trim() && ALLOWED_ROLES.has(m.role));

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 512,
      stream: true,
      messages: [
        { role: "system", content: AGENT_SYSTEM_PROMPT },
        ...trimmed,
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
    console.error("Chat API error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
