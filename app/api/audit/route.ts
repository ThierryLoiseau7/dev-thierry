import OpenAI from "openai";

const AUDIT_SYSTEM_PROMPT = `You are an expert Solidity smart contract security auditor with deep knowledge of EVM vulnerabilities, DeFi attack vectors, and Solidity best practices.

Analyze the provided contract and structure your response exactly as follows:

## Security Score: X/10

## Summary
Brief 2-3 sentence overview of the contract and its main security posture.

## Findings

For each issue found, use this format:
### [SEVERITY] — Title
**Location:** function or line reference
**Description:** What the vulnerability is
**Impact:** What an attacker could do

Severity levels (use exactly one of): CRITICAL, HIGH, MEDIUM, LOW, INFO

## Recommendations
Numbered list of specific fixes for each finding.

Be concise, accurate, and focus only on real vulnerabilities. Do not invent issues that are not present.`;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code?.trim()) {
      return new Response("No contract code provided", { status: 400 });
    }

    if (code.length > 8000) {
      return new Response("Contract too large (max 8,000 characters)", { status: 400 });
    }

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1500,
      stream: true,
      messages: [
        { role: "system", content: AUDIT_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Audit this Solidity smart contract:\n\n\`\`\`solidity\n${code}\n\`\`\``,
        },
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
    console.error("Audit API error:", err);
    return new Response("Audit service unavailable. Please try again.", { status: 500 });
  }
}
