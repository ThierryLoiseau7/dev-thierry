const CHAIN_ID_MAP: Record<string, string> = {
  ethereum: "1",
  bsc: "56",
  polygon: "137",
  arbitrum: "42161",
  base: "8453",
  avalanche: "43114",
  optimism: "10",
  cronos: "25",
  fantom: "250",
};

export type TokenAnalysis = {
  found: boolean;
  token: {
    name: string;
    symbol: string;
    address: string;
    chain: string;
    createdAt: string | null;
  };
  market: {
    priceUsd: string | null;
    marketCap: number | null;
    liquidity: number | null;
    volume24h: number | null;
    priceChange24h: number | null;
    pairUrl: string | null;
  };
  socials: {
    twitter: string | null;
    telegram: string | null;
    website: string | null;
  };
  security: {
    score: number;
    verdict: "SAFE" | "RISKY" | "SCAM";
    honeypot: boolean;
    ownershipRenounced: boolean;
    mintable: boolean;
    blacklist: boolean;
    transferPausable: boolean;
    openSource: boolean;
    buyTax: number | null;
    sellTax: number | null;
    lpLocked: boolean;
    holderCount: number | string | null;
  };
};

function calcScore(
  goplus: Record<string, unknown> | null,
  honeypot: boolean
): { score: number; verdict: "SAFE" | "RISKY" | "SCAM" } {
  if (honeypot) return { score: 0, verdict: "SCAM" };
  if (!goplus) return { score: 50, verdict: "RISKY" };

  let score = 100;

  if (
    goplus.owner_address &&
    goplus.owner_address !== "0x0000000000000000000000000000000000000000"
  )
    score -= 20;
  if (goplus.is_mintable === "1") score -= 15;
  if (goplus.is_blacklisted === "1") score -= 15;
  if (goplus.transfer_pausable === "1") score -= 10;
  if (goplus.is_open_source !== "1") score -= 10;

  const buyTax = parseFloat(String(goplus.buy_tax ?? "0"));
  const sellTax = parseFloat(String(goplus.sell_tax ?? "0"));
  if (buyTax > 20) score -= 20;
  else if (buyTax > 10) score -= 10;
  if (sellTax > 20) score -= 20;
  else if (sellTax > 10) score -= 10;

  const lpHolders =
    (goplus.lp_holders as Array<{ is_locked?: number }> | undefined) ?? [];
  const hasLockedLP = lpHolders.some((h) => h.is_locked === 1);
  if (!hasLockedLP && lpHolders.length > 0) score -= 10;

  score = Math.max(0, score);
  const verdict: "SAFE" | "RISKY" | "SCAM" =
    score >= 75 ? "SAFE" : score >= 45 ? "RISKY" : "SCAM";

  return { score, verdict };
}

export async function analyzeToken(address: string): Promise<TokenAnalysis> {
  const addr = address.trim();

  // DexScreener
  const dexRes = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${addr}`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  const dexData = dexRes.ok ? await dexRes.json() : null;

  const pairs: Array<Record<string, unknown>> = dexData?.pairs ?? [];
  const bestPair =
    pairs.sort((a, b) => {
      const liqA = (a.liquidity as Record<string, number>)?.usd ?? 0;
      const liqB = (b.liquidity as Record<string, number>)?.usd ?? 0;
      return liqB - liqA;
    })[0] ?? null;

  const chainId = String(bestPair?.chainId ?? "");
  const isSolana = chainId === "solana";
  const goplusChainId = CHAIN_ID_MAP[chainId];

  // GoPlus
  let goplusResult: Record<string, unknown> | null = null;
  if (goplusChainId || isSolana) {
    const goplusUrl = isSolana
      ? `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${addr}`
      : `https://api.gopluslabs.io/api/v1/token_security/${goplusChainId}?contract_addresses=${addr.toLowerCase()}`;

    const gpRes = await fetch(goplusUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (gpRes.ok) {
      const gpData = await gpRes.json();
      const resultMap = gpData?.result ?? {};
      const key = Object.keys(resultMap)[0];
      if (key) goplusResult = resultMap[key] as Record<string, unknown>;
    }
  }

  const baseToken = bestPair?.baseToken as Record<string, string> | undefined;
  const info = bestPair?.info as Record<string, unknown> | undefined;
  const socials = (info?.socials as Array<{ type: string; url: string }>) ?? [];
  const websites = (info?.websites as Array<{ url: string }>) ?? [];

  const twitterSocial = socials.find((s) => s.type === "twitter");
  const telegramSocial = socials.find((s) => s.type === "telegram");

  const honeypot = goplusResult?.is_honeypot === "1";
  const { score, verdict } = calcScore(goplusResult, honeypot);

  const lpHolders =
    (goplusResult?.lp_holders as Array<{ is_locked?: number }> | undefined) ??
    [];
  const hasLockedLP = lpHolders.some((h) => h.is_locked === 1);

  const priceChange = bestPair?.priceChange as Record<string, number> | undefined;
  const liquidity = bestPair?.liquidity as Record<string, number> | undefined;
  const volume = bestPair?.volume as Record<string, number> | undefined;

  return {
    found: !!bestPair,
    token: {
      name: baseToken?.name ?? String(goplusResult?.token_name ?? "Unknown"),
      symbol: baseToken?.symbol ?? String(goplusResult?.token_symbol ?? "???"),
      address: addr,
      chain: chainId || "unknown",
      createdAt: bestPair?.pairCreatedAt
        ? new Date(bestPair.pairCreatedAt as number).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          )
        : null,
    },
    market: {
      priceUsd: (bestPair?.priceUsd as string) ?? null,
      marketCap: (bestPair?.fdv as number) ?? null,
      liquidity: liquidity?.usd ?? null,
      volume24h: volume?.h24 ?? null,
      priceChange24h: priceChange?.h24 ?? null,
      pairUrl: (bestPair?.url as string) ?? null,
    },
    socials: {
      twitter: twitterSocial?.url ?? null,
      telegram: telegramSocial?.url ?? null,
      website: websites[0]?.url ?? null,
    },
    security: {
      score,
      verdict,
      honeypot,
      ownershipRenounced:
        !goplusResult ||
        goplusResult.owner_address ===
          "0x0000000000000000000000000000000000000000",
      mintable: goplusResult?.is_mintable === "1",
      blacklist: goplusResult?.is_blacklisted === "1",
      transferPausable: goplusResult?.transfer_pausable === "1",
      openSource: goplusResult?.is_open_source === "1",
      buyTax: goplusResult
        ? parseFloat(String(goplusResult.buy_tax ?? "0"))
        : null,
      sellTax: goplusResult
        ? parseFloat(String(goplusResult.sell_tax ?? "0"))
        : null,
      lpLocked: hasLockedLP,
      holderCount: goplusResult?.holder_count != null ? String(goplusResult.holder_count) : null,
    },
  };
}
