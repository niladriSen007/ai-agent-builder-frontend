import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAgent, useUpdateAgent } from "@/features/agents/hooks/useAgents";
import AgentForm from "@/features/agents/components/AgentForm";
import AgentPageShell from "./AgentPageShell";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AgentEditPage = () => {
  const navigate = useNavigate();
  const { agentId = "" } = useParams();
  const { data: agent, error, isError, isPending, refetch } = useAgent(agentId);
  const updateAgent = useUpdateAgent();

  return (
    <AgentPageShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Button
          className="w-fit text-[#c8c3cc] transition-colors hover:bg-white/[0.06] hover:text-white"
          onClick={() => navigate("/agents")}
          type="button"
          variant="ghost"
        >
          <ArrowLeft />
          Back to agents
        </Button>
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Edit agent</h1>
          <p className="text-[#96909c]">
            Update this agent's knowledge, instructions, tools, or status.
          </p>
        </header>

        {isPending && (
          <div
            aria-label="Loading agent"
            className="flex items-center gap-2 py-10 text-[#a09ca5]"
            role="status"
          >
            <LoaderCircle className="animate-spin" />
            Loading agent...
          </div>
        )}

        {isError && (
          <Card className="border-white/[0.08] bg-[#0b0b0e]/90 text-[#f3f1f5] ring-white/[0.08]">
            <CardContent className="flex flex-col items-start gap-4 py-6">
              <p className="text-sm text-destructive" role="alert">
                {error instanceof Error
                  ? error.message
                  : "This agent could not be loaded."}
              </p>
              <Button
                onClick={() => void refetch()}
                type="button"
                variant="outline"
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {!isPending && !isError && agent && (
          <AgentForm
            agent={agent}
            isPending={updateAgent.isPending}
            onSubmit={async (values) => {
              await updateAgent.mutateAsync({ agentId, updates: values });
              navigate("/agents");
            }}
          />
        )}
      </div>
    </AgentPageShell>
  );
};

export default AgentEditPage;
