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
