export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "web2" | "web3" | "ai-agent";
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: "frontend" | "web3" | "ai" | "tooling";
  proficiency: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  phase: "webdev" | "web3" | "ai";
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  topics: string[];
  category?: "ia" | "webdev" | "web3";
  modules?: number;
  duration?: string;
  isNew?: boolean;
}

export interface MembershipPlan {
  id: "gratuit" | "pass" | "pro";
  name: string;
  priceMonthly: number | null;
  billedAnnually: number | null;
  tagline: string;
  highlight: boolean;
  features: Array<{ text: string; included: boolean }>;
  cta: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "design" | "video";
  src: string;
  type: "image" | "video";
  thumbnail?: string;
  tags?: string[];
  client?: string;
  year?: string;
}
