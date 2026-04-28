const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHANNEL = "@ayiticoin";
const CRON_SECRET = process.env.CRON_SECRET ?? "";
const TOOL_URL = "https://devthierry.com/rugcheck";

// Alert thresholds
const THRESHOLD_EXTREME_24H = 100;  // +100% en 24h
const THRESHOLD_HOT_24H = 50;       // +50% en 24h
const THRESHOLD_RISING_24H = 30;    // +30% en 24h
const THRESHOLD_HOT_1H = 30;        // +30% en 1h
const THRESHOLD_RISING_1H = 15;     // +15% en 1h

type PairData = {
  tokenAddress: string;
  chainId: string;
  name: string;
  symbol: string;
  priceUsd: string | null;
  priceChange1h: number | null;
  priceChange24h: number | null;
  marketCap: number | null;
  liquidity: number | null;
  volume24h: number | null;
  pairUrl: string | null;
};

function fmt(n: number | null | undefined, prefix = ""): string {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(0)}K`;
  return `${prefix}${n.toFixed(2)}`;
}

function getLevel(h1: number | null, h24: number | null): { emoji: string; label: string } | null {
  if (h24 != null && h24 >= THRESHOLD_EXTREME_24H) return { emoji: "🚀", label: "EXTREME" };
  if ((h24 != null && h24 >= THRESHOLD_HOT_24H) || (h1 != null && h1 >= THRESHOLD_HOT_1H))
    return { emoji: "🔥", label: "HOT" };
  if ((h24 != null && h24 >= THRESHOLD_RISING_24H) || (h1 != null && h1 >= THRESHOLD_RISING_1H))
    return { emoji: "📈", label: "RISING" };
  return null;
}

async function fetchPairData(tokenAddress: string): Promise<PairData | null> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      { headers: { Accept: "application/json" }, cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const pairs: Array<Record<string, unknown>> = data?.pairs ?? [];
    const best = pairs.sort((a, b) => {
      const lA = (a.liquidity as Record<string, number>)?.usd ?? 0;
      const lB = (b.liquidity as Record<string, number>)?.usd ?? 0;
      return lB - lA;
    })[0];
    if (!best) return null;

    const base = best.baseToken as Record<string, string>;
    const pc = best.priceChange as Record<string, number> | undefined;
    const liq = best.liquidity as Record<string, number> | undefined;
    const vol = best.volume as Record<string, number> | undefined;

    return {
      tokenAddress,
      chainId: String(best.chainId ?? ""),
      name: base?.name ?? "Unknown",
      symbol: base?.symbol ?? "???",
      priceUsd: (best.priceUsd as string) ?? null,
      priceChange1h: pc?.h1 ?? null,
      priceChange24h: pc?.h24 ?? null,
      marketCap: (best.fdv as number) ?? null,
      liquidity: liq?.usd ?? null,
      volume24h: vol?.h24 ?? null,
      pairUrl: (best.url as string) ?? null,
    };
  } catch {
    return null;
  }
}

async function sendAlert(token: PairData, level: { emoji: string; label: string }) {
  const h1Str = token.priceChange1h != null
    ? `${token.priceChange1h >= 0 ? "+" : ""}${token.priceChange1h.toFixed(1)}%`
    : "—";
  const h24Str = token.priceChange24h != null
    ? `${token.priceChange24h >= 0 ? "+" : ""}${token.priceChange24h.toFixed(1)}%`
    : "—";

  const msg = [
    `${level.emoji} *ALÈT ${level.label} — ${token.name} ($${token.symbol})*`,
    ``,
    `📊 *Chanjman Pri*`,
    `⏱ 1 Èdtan: *${h1Str}*`,
    `📅 24 Èdtan: *${h24Str}*`,
    ``,
    `💰 Pri: ${token.priceUsd ? `$${parseFloat(token.priceUsd).toFixed(8)}` : "—"}`,
    `📈 Market Cap: ${fmt(token.marketCap, "$")}`,
    `💧 Liquidite: ${fmt(token.liquidity, "$")}`,
    `📦 Volume 24h: ${fmt(token.volume24h, "$")}`,
    `🔗 Chain: \`${token.chainId.toUpperCase()}\``,
    ``,
    token.pairUrl ? `[📊 Wè sou DexScreener](${token.pairUrl})` : "",
    `[🔍 Analyze Token](${TOOL_URL}?address=${token.tokenAddress})`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `🇭🇹 *Komunote AyitiCoin — @ayiticoin*`,
    `_Pa bliye toujou DYOR anvan ou achte._`,
  ].filter((l) => l !== "").join("\n");

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHANNEL,
      text: msg,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
}

export async function GET(request: Request) {
  // Security check
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") ?? request.headers.get("x-cron-secret") ?? "";
  if (CRON_SECRET && secret !== CRON_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch top boosted tokens
    const boostRes = await fetch("https://api.dexscreener.com/token-boosts/top/v1", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!boostRes.ok) return Response.json({ ok: false, error: "DexScreener unavailable" });

    const boostData = await boostRes.json();
    const items: Array<Record<string, unknown>> = Array.isArray(boostData) ? boostData : [];

    // Deduplicate + take top 10
    const seen = new Set<string>();
    const addresses: string[] = [];
    for (const item of items) {
      const addr = String(item.tokenAddress ?? "");
      if (!addr || seen.has(addr)) continue;
      seen.add(addr);
      addresses.push(addr);
      if (addresses.length >= 10) break;
    }

    // Fetch price data for each (with small delay to avoid rate limit)
    const alerts: { token: PairData; level: { emoji: string; label: string } }[] = [];

    for (const addr of addresses) {
      const token = await fetchPairData(addr);
      if (!token) continue;
      const level = getLevel(token.priceChange1h, token.priceChange24h);
      if (level) alerts.push({ token, level });
    }

    // Sort by 24h change desc
    alerts.sort((a, b) => {
      const aH24 = a.token.priceChange24h ?? 0;
      const bH24 = b.token.priceChange24h ?? 0;
      return bH24 - aH24;
    });

    // Send top 3 alerts max (avoid spam)
    const toSend = alerts.slice(0, 3);
    for (const { token, level } of toSend) {
      await sendAlert(token, level);
    }

    return Response.json({
      ok: true,
      checked: addresses.length,
      alertsSent: toSend.length,
      tokens: toSend.map((a) => ({
        name: a.token.name,
        symbol: a.token.symbol,
        h24: a.token.priceChange24h,
        level: a.level.label,
      })),
    });
  } catch (err) {
    console.error("Cron alert error:", err);
    return Response.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
