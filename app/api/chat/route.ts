import Anthropic from "@anthropic-ai/sdk";
import { AGENT_SYSTEM_PROMPT } from "@/lib/constants";

const client = new Anthropic();

interface RequestMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: RequestMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    // Keep last 20 messages to avoid token overrun
    const trimmed = messages.slice(-20).filter((m) => m.content?.trim());

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: AGENT_SYSTEM_PROMPT,
      messages: trimmed,
    });

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
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
