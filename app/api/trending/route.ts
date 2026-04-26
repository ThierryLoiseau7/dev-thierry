export async function GET() {
  try {
    // DexScreener top boosted tokens (free, no auth)
    const res = await fetch("https://api.dexscreener.com/token-boosts/top/v1", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return Response.json({ tokens: [] });

    const data = await res.json();
    const items: Array<Record<string, unknown>> = Array.isArray(data) ? data : [];

    // Take top 8, deduplicate by tokenAddress
    const seen = new Set<string>();
    const tokens = items
      .filter((t) => {
        const addr = String(t.tokenAddress ?? "");
        if (seen.has(addr)) return false;
        seen.add(addr);
        return true;
      })
      .slice(0, 8)
      .map((t) => {
        const links = (t.links as Array<{ type?: string; label?: string; url: string }>) ?? [];
        const twitter = links.find((l) => l.type === "twitter" || l.label?.toLowerCase().includes("twitter"))?.url ?? null;
        const telegram = links.find((l) => l.type === "telegram" || l.label?.toLowerCase().includes("telegram"))?.url ?? null;
        const website = links.find((l) => l.type === "website" || l.label?.toLowerCase().includes("website"))?.url ?? null;

        return {
          address: t.tokenAddress,
          chain: t.chainId,
          name: t.description ?? null,
          icon: t.icon ?? null,
          url: t.url ?? null,
          twitter,
          telegram,
          website,
        };
      });

    return Response.json({ tokens });
  } catch (err) {
    console.error("Trending API error:", err);
    return Response.json({ tokens: [] });
  }
}
