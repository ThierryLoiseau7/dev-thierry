import type { Project, Skill, TimelineEntry, GalleryItem, Formation } from "./types";

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2018 – 2021",
    title: "Full-Stack Web Developer",
    description:
      "Built production-grade web applications using React, Node.js, and PostgreSQL. Delivered SaaS platforms, e-commerce solutions, and custom CMS systems for clients across Europe.",
    phase: "webdev",
  },
  {
    year: "2021 – 2024",
    title: "Web3 & Blockchain Dev",
    description:
      "Transitioned into the decentralized space. Engineered smart contracts on Ethereum, built DeFi dashboards, NFT platforms, and integrated wallet connectivity (MetaMask, WalletConnect) across multiple DApps.",
    phase: "web3",
  },
  {
    year: "2024 – Present",
    title: "AI Agent Dev",
    description:
      "Now building intelligent agents and AI-powered applications using the Claude API and custom LLM workflows. Combining Web2 reliability, Web3 decentralization, and AI automation into next-generation products.",
    phase: "ai",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "frontend", proficiency: 98 },
  { name: "Next.js", category: "frontend", proficiency: 96 },
  { name: "React", category: "frontend", proficiency: 97 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 95 },
  { name: "Framer Motion", category: "frontend", proficiency: 88 },
  { name: "Node.js", category: "frontend", proficiency: 92 },
  // Web3
  { name: "Solidity", category: "web3", proficiency: 85 },
  { name: "Ethers.js", category: "web3", proficiency: 90 },
  { name: "Web3.js", category: "web3", proficiency: 88 },
  { name: "Hardhat", category: "web3", proficiency: 83 },
  { name: "DeFi Protocols", category: "web3", proficiency: 80 },
  // AI
  { name: "Claude API", category: "ai", proficiency: 95 },
  { name: "LLM Agents", category: "ai", proficiency: 90 },
  { name: "Prompt Engineering", category: "ai", proficiency: 93 },
  { name: "AI Workflows", category: "ai", proficiency: 88 },
  // Tooling
  { name: "Git / GitHub", category: "tooling", proficiency: 95 },
  { name: "Docker", category: "tooling", proficiency: 82 },
  { name: "Vercel / CI", category: "tooling", proficiency: 90 },
  { name: "PostgreSQL", category: "tooling", proficiency: 85 },
];

export const PROJECTS: Project[] = [
  {
    id: "ayiticoin",
    title: "AyitiCoin",
    description:
      "Crypto exchange platform targeting Haiti and its diaspora. Buy USDT via localized payment methods: MonCash (Haiti), Zelle & Cash App (USA), Interac (Canada), Wise. Bilingual (French + Haitian Creole), transparent fees, 5–30 min delivery.",
    category: "web3",
    tags: ["Next.js", "React", "Web3", "Vercel"],
    featured: true,
    liveUrl: "https://www.ayiticoin.net",
  },
  {
    id: "defi-dashboard",
    title: "DeFi Analytics Dashboard",
    description:
      "Real-time DeFi portfolio tracker with multi-chain support. Integrates Uniswap, Aave, and Compound protocols. Features live price feeds, PnL tracking, and gas optimization alerts.",
    category: "web3",
    tags: ["Next.js", "Ethers.js", "The Graph", "Tailwind"],
    featured: true,
  },
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description:
      "Full-featured NFT marketplace on Ethereum with lazy minting, auction mechanics, and creator royalties. Smart contracts audited and deployed on mainnet.",
    category: "web3",
    tags: ["Solidity", "React", "IPFS", "OpenSea API"],
    featured: true,
  },
  {
    id: "ai-agent-platform",
    title: "AI Agent Platform",
    description:
      "Multi-agent orchestration platform powered by Claude API. Agents collaborate autonomously to complete complex research, coding, and content tasks. Built with streaming UI.",
    category: "ai-agent",
    tags: ["Claude API", "Next.js", "TypeScript", "Streaming"],
    featured: true,
  },
  {
    id: "saas-crm",
    title: "SaaS CRM System",
    description:
      "Enterprise-grade CRM with custom pipeline management, email automation, and analytics dashboard. Serves 500+ active users with 99.9% uptime.",
    category: "web2",
    tags: ["Next.js", "PostgreSQL", "Node.js", "Stripe"],
    featured: false,
  },
  {
    id: "web3-wallet",
    title: "Multi-Chain Wallet Interface",
    description:
      "Non-custodial wallet UI supporting Ethereum, Polygon, and BSC. Hardware wallet integration (Ledger/Trezor), transaction history, and token swap aggregation.",
    category: "web3",
    tags: ["React", "Web3.js", "WalletConnect", "Wagmi"],
    featured: false,
  },
  {
    id: "ai-content-engine",
    title: "AI Content Engine",
    description:
      "Intelligent content generation and SEO optimization platform. Uses Claude API to produce, refine, and publish structured content at scale with human-in-the-loop review.",
    category: "ai-agent",
    tags: ["Claude API", "Node.js", "TypeScript", "Next.js"],
    featured: false,
  },
  {
    id: "rugpull-detector",
    title: "Memecoin Rug Pull Detector",
    description:
      "Free on-chain security tool for the AyitiCoin crypto community. Paste any token contract address and instantly get: market cap, liquidity, creation date, social links, honeypot detection, ownership status, taxes, and a security score. Also available as a Telegram bot (@ayiticoin_rugcheck_bot) — type /rugcheck directly in chat.",
    category: "web3",
    tags: ["Next.js", "DexScreener API", "GoPlus Security", "Telegram Bot"],
    featured: true,
    liveUrl: "https://dev-thierry.vercel.app/rugcheck",
  },
];

export const FORMATIONS: Formation[] = [
  {
    id: "ai-website",
    title: "AI pour Website",
    description:
      "Apprends a creer, optimiser et ameliorer des sites web complets grace a l'intelligence artificielle. De la conception au deploiement, utilise l'IA comme co-pilote.",
    icon: "🌐",
    level: "Debutant → Avance",
    topics: ["Generer du code avec IA", "ChatGPT + Cursor", "Next.js + Vercel", "SEO automatise"],
  },
  {
    id: "ai-design",
    title: "AI pour Graphic Design",
    description:
      "Cree des visuels professionnels, logos, affiches et contenus reseaux sociaux en quelques minutes avec les meilleurs outils IA de design graphique.",
    icon: "🎨",
    level: "Debutant → Intermediaire",
    topics: ["Midjourney & DALL-E", "Adobe Firefly", "Canva AI", "Prompts visuels"],
  },
  {
    id: "ai-video",
    title: "AI pour Montage Video",
    description:
      "Automatise le montage video, ajoute des sous-titres, genere des voix-off et cree des effets visuels avec l'IA. Produis du contenu de qualite professionnelle rapidement.",
    icon: "🎬",
    level: "Debutant → Intermediaire",
    topics: ["CapCut AI", "Runway ML", "Sous-titres auto", "Voix-off IA"],
  },
  {
    id: "ai-telegram",
    title: "AI pour Creer Bot Telegram",
    description:
      "Construis des bots Telegram intelligents capables de repondre, automatiser des taches et interagir avec tes utilisateurs 24h/24 grace a l'IA.",
    icon: "🤖",
    level: "Intermediaire",
    topics: ["Python + Telegram API", "Integrer Claude/GPT", "Commandes & menus", "Deploiement serveur"],
  },
  {
    id: "ai-emploi",
    title: "AI pour Chercher du Travail",
    description:
      "Utilise l'IA pour optimiser ton CV, ecrire des lettres de motivation percutantes, preparer les entretiens et trouver les meilleures opportunites professionnelles.",
    icon: "💼",
    level: "Tous niveaux",
    topics: ["CV optimise par IA", "Lettres de motivation", "Simulation d'entretien", "LinkedIn & reseaux"],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g01",
    title: "AI Visual Direction",
    category: "design",
    src: "/ai.jpg",
    type: "image",
    tags: ["AI", "Branding"],
    year: "2025",
  },
  {
    id: "g02",
    title: "AI Composition #1",
    category: "design",
    src: "/ai1.jpg",
    type: "image",
    tags: ["AI", "Créatif"],
    year: "2025",
  },
  {
    id: "g03",
    title: "AI Composition #2",
    category: "design",
    src: "/ai2.jpg",
    type: "image",
    tags: ["AI", "Visuel"],
    year: "2025",
  },
];

export const AGENT_SYSTEM_PROMPT = `You are the AI Agent of Dev Thierry — a senior full-stack developer and AI Agent Dev with 7 years of professional experience.

Your knowledge covers:
- Web development: TypeScript, Next.js, React, Node.js, PostgreSQL, REST/GraphQL APIs
- Web3/blockchain: Ethereum, Solidity, Ethers.js, Web3.js, DeFi protocols, NFT platforms, smart contract development
- AI agent dev: Claude API, LLM workflows, multi-agent systems, prompt engineering, streaming interfaces

Personality: professional, concise, technically precise, occasionally showing the builder's passion for elegant code and innovative systems. You speak as if you ARE Dev Thierry's agent — you represent him professionally.

Real projects built by Dev Thierry:
- **AyitiCoin** (ayiticoin.net) — Crypto exchange platform for Haiti and its diaspora. Users buy USDT using local payment methods: MonCash (Haiti), Zelle & Cash App (USA), Interac (Canada), Wise (international). Built with Next.js, React, deployed on Vercel. Key features: transparent fees displayed before confirmation, 5–30 min delivery, real-time order tracking, bilingual UI (French + Haitian Creole). A real-world Web3 use case bridging crypto and underbanked communities.

Key facts:
- Location/availability: Remote-first, available worldwide
- Contact: devthierry@pm.me | +33 6 46 89 93 10
- Tagline: "On-web, On-chain."
- Currently focused on AI Agent Dev and full-stack Web3 projects

Guidelines:
- Answer questions about skills, projects, approach, and availability
- Keep responses concise (under 200 words) unless asked for technical depth
- If asked about rates or hiring, direct them to devthierry@pm.me
- Do not invent specific project details beyond what is provided
- If asked something outside the professional context, gently redirect`;
