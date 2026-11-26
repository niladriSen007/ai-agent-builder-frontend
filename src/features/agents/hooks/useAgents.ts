import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createAgent,
  getAgent,
  getAgents,
  updateAgent,
} from "../services/agents.api";
import type { AgentUpdate } from "../types";

const agentKeys = {
  all: ["agents"] as const,
  detail: (agentId: string) => ["agents", agentId] as const,
};

export const useAgents = () =>
  useQuery({
    queryKey: agentKeys.all,
    queryFn: getAgents,
  });

export const useAgent = (agentId: string) =>
  useQuery({
    queryKey: agentKeys.detail(agentId),
    queryFn: () => getAgent(agentId),
    enabled: agentId.length > 0,
  });

export const useCreateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAgent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: agentKeys.all });
    },
  });
};

export const useUpdateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      updates,
    }: {
      agentId: string;
      updates: AgentUpdate;
    }) => updateAgent(agentId, updates),
    onSuccess: async (agent) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: agentKeys.all }),
        queryClient.invalidateQueries({
          queryKey: agentKeys.detail(agent._id),
        }),
      ]);
    },
  });
};
