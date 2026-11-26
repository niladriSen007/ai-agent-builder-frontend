export type AgentSummary = {
  agentId: string;
  name: string;
  knowledgeBase: string;
};

export type Agent = {
  _id: string;
  ownerId: string;
  name: string;
  knowledgeBase: string;
  instructions: string;
  tools: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AgentInput = {
  name: string;
  knowledgeBase: string;
  instructions: string;
  tools?: string[];
  isActive?: boolean;
};

export type AgentUpdate = Partial<AgentInput>;
