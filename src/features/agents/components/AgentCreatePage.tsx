import { Button } from "@/components/ui/button";
import { useCreateAgent } from "@/features/agents/hooks/useAgents";
import AgentForm from "@/features/agents/components/AgentForm";
import AgentPageShell from "./AgentPageShell";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentCreatePage = () => {
  const navigate = useNavigate();
  const createAgent = useCreateAgent();

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
          <h1 className="text-3xl font-semibold tracking-tight">
            Create an agent
          </h1>
          <p className="text-[#96909c]">
            Set up your agent's knowledge, instructions, and tools.
          </p>
        </header>
        <AgentForm
          isPending={createAgent.isPending}
          onSubmit={async (values) => {
            await createAgent.mutateAsync(values);
            navigate("/agents");
          }}
        />
      </div>
    </AgentPageShell>
  );
};

export default AgentCreatePage;
