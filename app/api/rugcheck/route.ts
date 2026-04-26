import { analyzeToken } from "@/lib/analyzeToken";

export async function POST(request: Request) {
  try {
    const { address } = await request.json();
    if (!address?.trim()) {
      return Response.json({ error: "Contract address required" }, { status: 400 });
    }
    const result = await analyzeToken(address);
    return Response.json(result);
  } catch (err) {
    console.error("Rugcheck API error:", err);
    return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
