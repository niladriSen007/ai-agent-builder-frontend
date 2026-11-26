import { GET, PATCH, POST } from "@/lib/apiMethods";
import type { Agent, AgentInput, AgentSummary, AgentUpdate } from "../types";

const API_PREFIX = "/api/v1/agents";

export const getAgents = () => GET<AgentSummary[]>(API_PREFIX);

export const getAgent = (agentId: string) =>
  GET<Agent>(`${API_PREFIX}/${encodeURIComponent(agentId)}`);

export const createAgent = (agent: AgentInput) =>
  POST<Agent, AgentInput>(API_PREFIX, agent);

export const updateAgent = (agentId: string, updates: AgentUpdate) =>
  PATCH<Agent, AgentUpdate>(
    `${API_PREFIX}/${encodeURIComponent(agentId)}`,
    updates,
  );
