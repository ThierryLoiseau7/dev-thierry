import { analyzeToken, TokenAnalysis } from "@/lib/analyzeToken";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TOOL_URL = "https://dev-thierry.vercel.app/rugcheck";
const COMMUNITY_URL = "https://t.me/ayiticoin";

function fmt(n: number | null | undefined, prefix = ""): string {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(2)}K`;
  return `${prefix}${n.toFixed(4)}`;
}

function check(ok: boolean | null): string {
  if (ok === null) return "➖";
  return ok ? "✅" : "❌";
}

function buildMessage(data: TokenAnalysis): string {
  const { token, market, security, socials } = data;

  const verdictEmoji =
    security.verdict === "SAFE" ? "✅" : security.verdict === "RISKY" ? "⚠️" : "🚨";

  const lines: string[] = [
    `🔍 *Rug Pull Analysis*`,
    ``,
    `*${token.name}* ($${token.symbol})`,
    `🔗 Chain: \`${token.chain.toUpperCase()}\`${token.createdAt ? `  |  📅 Created: ${token.createdAt}` : ""}`,
    ``,
    `📊 *Market Data*`,
    `💰 Price: ${market.priceUsd ? `$${parseFloat(market.priceUsd).toFixed(8)}` : "—"}`,
    `📈 Market Cap: ${fmt(market.marketCap, "$")}`,
    `💧 Liquidity: ${fmt(market.liquidity, "$")}`,
    `📦 Volume 24h: ${fmt(market.volume24h, "$")}`,
    `${market.priceChange24h != null ? `${market.priceChange24h >= 0 ? "📈" : "📉"} Change 24h: ${market.priceChange24h >= 0 ? "+" : ""}${market.priceChange24h.toFixed(2)}%` : ""}`,
    ``,
    `${verdictEmoji} *Security Score: ${security.score}/100 — ${security.verdict}*`,
    ``,
    `${check(!security.honeypot)} Honeypot`,
    `${check(security.ownershipRenounced)} Ownership Renounced`,
    `${check(!security.mintable)} Not Mintable`,
    `${check(!security.blacklist)} No Blacklist Function`,
    `${check(!security.transferPausable)} Transfer Not Pausable`,
    `${check(security.openSource)} Open Source`,
    `${check(security.lpLocked)} Liquidity Locked`,
    `💸 Buy Tax: ${security.buyTax != null ? `${security.buyTax.toFixed(1)}%` : "—"}`,
    `💸 Sell Tax: ${security.sellTax != null ? `${security.sellTax.toFixed(1)}%` : "—"}`,
    security.holderCount ? `👥 Holders: ${security.holderCount}` : "",
    ``,
    `🔗 Links`,
    socials.twitter ? `[𝕏 Twitter](${socials.twitter})` : "",
    socials.telegram ? `[✈️ Telegram](${socials.telegram})` : "",
    socials.website ? `[🌐 Website](${socials.website})` : "",
    market.pairUrl ? `[📊 DexScreener](${market.pairUrl})` : "",
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `🇭🇹 *Communauté crypto haïtienne*`,
    `👉 [Rejoins @ayiticoin](${COMMUNITY_URL})`,
    `🛠️ Tool by [Dev Thierry](${TOOL_URL})`,
  ];

  return lines.filter((l) => l !== "").join("\n");
}

async function sendMessage(chatId: number, text: string, replyToId?: number) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      ...(replyToId ? { reply_to_message_id: replyToId } : {}),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const update = await request.json();
    const message = update?.message ?? update?.channel_post;
    if (!message?.text) return Response.json({ ok: true });

    const chatId: number = message.chat.id;
    const msgId: number = message.message_id;
    const text: string = message.text.trim();

    // /start or /help
    if (text === "/start" || text === "/help") {
      await sendMessage(
        chatId,
        `🔍 *Rug Pull Detector — by Dev Thierry*\n\nAnalyse n'importe quel token crypto en temps réel.\n\n*Utilisation:*\n\`/rugcheck <adresse_contrat>\`\n\n*Exemple:*\n\`/rugcheck 0x1234...abcd\`\n\nSupporte: ETH · BSC · Base · Solana · Polygon · Arbitrum\n\n🇭🇹 Communauté crypto haïtienne: [Rejoins @ayiticoin](${COMMUNITY_URL})`,
        msgId
      );
      return Response.json({ ok: true });
    }

    // /rugcheck <address>
    const rugMatch = text.match(/^\/rugcheck(?:@\S+)?\s+(\S+)/i);
    if (!rugMatch) return Response.json({ ok: true });

    const address = rugMatch[1];

    // Acknowledge
    await sendMessage(chatId, `⏳ Analyse de \`${address}\` en cours...`, msgId);

    const data = await analyzeToken(address);

    if (!data.found) {
      await sendMessage(
        chatId,
        `❌ Token introuvable pour l'adresse \`${address}\`\n\nVérifie l'adresse et réessaie.\n\n🇭🇹 [Rejoins @ayiticoin](${COMMUNITY_URL})`,
        msgId
      );
      return Response.json({ ok: true });
    }

    const msg = buildMessage(data);
    await sendMessage(chatId, msg, msgId);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Telegram bot error:", err);
    return Response.json({ ok: true }); // Always 200 to Telegram
  }
}
