import { analyzeToken, TokenAnalysis } from "@/lib/analyzeToken";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TOOL_URL = "https://dev-thierry.vercel.app/rugcheck";
const COMMUNITY_URL = "https://t.me/ayiticoin";

const ANALYZE_BUTTON = {
  inline_keyboard: [
    [{ text: "🔍 Analyze yon Token", callback_data: "ask_address" }],
    [{ text: "🇭🇹 Komunote @ayiticoin", url: COMMUNITY_URL }],
  ],
};

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
    market.priceChange24h != null
      ? `${market.priceChange24h >= 0 ? "📈" : "📉"} Change 24h: ${market.priceChange24h >= 0 ? "+" : ""}${market.priceChange24h.toFixed(2)}%`
      : "",
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
    socials.twitter || socials.telegram || socials.website || market.pairUrl ? `🔗 *Links*` : "",
    socials.twitter ? `[𝕏 Twitter](${socials.twitter})` : "",
    socials.telegram ? `[✈️ Telegram](${socials.telegram})` : "",
    socials.website ? `[🌐 Website](${socials.website})` : "",
    market.pairUrl ? `[📊 DexScreener](${market.pairUrl})` : "",
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `🇭🇹 *Komunote crypto ayisyen*`,
    `👉 [Rantre nan @ayiticoin](${COMMUNITY_URL})`,
    `🛠️ Tool by [Dev Thierry](${TOOL_URL})`,
  ];

  return lines.filter((l) => l !== "").join("\n");
}

async function sendMessage(
  chatId: number,
  text: string,
  options: Record<string, unknown> = {}
) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
      ...options,
    }),
  });
}

async function answerCallback(callbackQueryId: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId }),
  });
}

function isContractAddress(text: string): boolean {
  // EVM address: 0x + 40 hex chars
  if (/^0x[a-fA-F0-9]{40}$/.test(text)) return true;
  // Solana address: base58, 32-44 chars
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(text)) return true;
  return false;
}

export async function POST(request: Request) {
  try {
    const update = await request.json();

    // Handle button clicks
    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId: number = cb.message.chat.id;
      await answerCallback(cb.id);

      if (cb.data === "ask_address") {
        await sendMessage(
          chatId,
          `📋 *Paste adrès kontrat token ou vle analyze a:*\n\nEgzanp:\n\`0x6982508145454ce325ddbe47a25d4ec3d2311933\`\n\n_Supòte: ETH · BSC · Base · Solana · Polygon · Arbitrum_`,
        );
      }
      return Response.json({ ok: true });
    }

    // Handle messages
    const message = update?.message ?? update?.channel_post;
    if (!message?.text) return Response.json({ ok: true });

    const chatId: number = message.chat.id;
    const text: string = message.text.trim();

    // /start
    if (text === "/start" || text.startsWith("/start")) {
      await sendMessage(
        chatId,
        `👋 *Byenveni nan AyitiCoin Rug Checker!*\n\nAnalyze nenpòt token crypto an reyèl tan.\n\n🔍 Jwenn: Market Cap, Liquidite, Dat Kreyasyon, Honeypot, Taxes, Ownership ak plis.\n\n_Sipòte: ETH · BSC · Base · Solana · Polygon · Arbitrum_`,
        { reply_markup: ANALYZE_BUTTON }
      );
      return Response.json({ ok: true });
    }

    // /help
    if (text === "/help") {
      await sendMessage(
        chatId,
        `ℹ️ *Kijan pou itilize bot la*\n\nKlike bouton "🔍 Analyze yon Token" epi paste adrès kontrat la.\n\nOu ka voye adrès la dirèkteman tou:\n\`0x6982508145454ce325ddbe47a25d4ec3d2311933\``,
        { reply_markup: ANALYZE_BUTTON }
      );
      return Response.json({ ok: true });
    }

    // /rugcheck <address>
    const rugMatch = text.match(/^\/rugcheck(?:@\S+)?\s+(\S+)/i);
    const addressFromCommand = rugMatch?.[1];

    // Auto-detect contract address pasted directly
    const addressFromPaste = isContractAddress(text) ? text : null;

    const address = addressFromCommand ?? addressFromPaste;
    if (!address) return Response.json({ ok: true });

    await sendMessage(chatId, `⏳ Analyse \`${address}\` ap chaje...`);

    const data = await analyzeToken(address);

    if (!data.found) {
      await sendMessage(
        chatId,
        `❌ Token pa jwenn pou adrès \`${address}\`\n\nVerifye adrès la epi eseye ankò.`,
        { reply_markup: ANALYZE_BUTTON }
      );
      return Response.json({ ok: true });
    }

    const msg = buildMessage(data);
    await sendMessage(chatId, msg, { reply_markup: ANALYZE_BUTTON });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Telegram bot error:", err);
    return Response.json({ ok: true });
  }
}
