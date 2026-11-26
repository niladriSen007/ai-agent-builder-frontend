import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAgents } from "@/features/agents/hooks/useAgents";
import AgentPageShell from "./AgentPageShell";
import {
  Bot,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgentsPage = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const { data: agents, error, isError, isPending, refetch } = useAgents();
  const filteredAgents = agents?.filter((agent) => {
    const searchTerm = search.trim().toLowerCase();
    return (
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.knowledgeBase.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <AgentPageShell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Button
              className="-ml-2 mb-1 text-[#c8c3cc] transition-colors hover:bg-white/[0.06] hover:text-white"
              onClick={() => navigate("/")}
              type="button"
              variant="ghost"
            >
              {"<- Back to Home"}
            </Button>
            <p className="text-sm font-medium text-blue-300/80">Workspace</p>
            <h1 className="text-3xl font-semibold tracking-tight">My agents</h1>
            <p className="text-[#96909c]">
              Create and manage your AI agents.
            </p>
          </div>
          <Button onClick={() => navigate("/agents/new")} type="button">
            <Plus />
            Create agent
          </Button>
        </header>

        {!isPending && !isError && agents && agents.length > 0 && (
          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-blue-300/15 bg-blue-400/10 text-blue-200">
                <Bot aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#e7e2e9]">
                  Your workspace
                </p>
                <p className="text-xs text-[#85818a]">
                  {agents.length} {agents.length === 1 ? "agent" : "agents"}{" "}
                  ready to manage
                </p>
              </div>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#85818a]"
              />
              <Input
                aria-label="Search agents"
                className="h-10 border-white/10 bg-black/30 pl-9 pr-10 text-[#f3f1f5] placeholder:text-[#77717d] focus-visible:border-blue-300/40 focus-visible:ring-blue-300/15"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or knowledge..."
                type="search"
                value={search}
              />
              {search && (
                <Button
                  aria-label="Clear agent search"
                  className="absolute top-1/2 right-1.5 size-7 -translate-y-1/2 text-[#96909c] hover:bg-white/[0.08] hover:text-white"
                  onClick={() => setSearch("")}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
        )}

        {isPending && (
          <div
            aria-label="Loading agents"
            className="flex items-center justify-center gap-2 py-16 text-[#a09ca5]"
            role="status"
          >
            <LoaderCircle className="animate-spin" />
            Loading agents...
          </div>
        )}

        {isError && (
          <Card className="border-white/[0.08] bg-[#0b0b0e]/90 text-[#f3f1f5] ring-white/[0.08]">
            <CardContent className="flex flex-col items-start gap-4 py-6">
              <p className="text-sm text-destructive" role="alert">
                {error instanceof Error
                  ? error.message
                  : "Agents could not be loaded."}
              </p>
              <Button
                onClick={() => void refetch()}
                type="button"
                className="border-white/10 bg-white/[0.04] text-[#eeeaf1] hover:bg-white/10"
                variant="outline"
              >
                <RefreshCw />
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {!isPending && !isError && agents?.length === 0 && (
          <Card className="border-white/[0.08] bg-[#0b0b0e]/90 text-[#f3f1f5] ring-white/[0.08]">
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <span className="rounded-full border border-blue-300/15 bg-blue-400/10 p-4 text-blue-200">
                <Bot aria-hidden="true" className="size-7" />
              </span>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">No agents yet</h2>
                <p className="max-w-md text-sm text-[#96909c]">
                  Create your first agent to get started.
                </p>
              </div>
              <Button onClick={() => navigate("/agents/new")} type="button">
                <Plus />
                Create agent
              </Button>
            </CardContent>
          </Card>
        )}

        {!isPending &&
          !isError &&
          agents &&
          agents.length > 0 &&
          filteredAgents?.length === 0 && (
            <Card className="border-white/[0.08] bg-[#0b0b0e]/90 text-[#f3f1f5] ring-white/[0.08]">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="rounded-full border border-white/10 bg-white/[0.04] p-4 text-[#aaa4b0]">
                  <Search aria-hidden="true" className="size-6" />
                </span>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">No matching agents</h2>
                  <p className="text-sm text-[#96909c]">
                    Try another name or knowledge-base search.
                  </p>
                </div>
                <Button
                  className="text-[#e7e2e9]"
                  onClick={() => setSearch("")}
                  type="button"
                  variant="outline"
                >
                  Clear search
                </Button>
              </CardContent>
            </Card>
          )}

        {!isPending &&
          !isError &&
          filteredAgents &&
          filteredAgents.length > 0 && (
          <section aria-label="Agents" className="grid gap-4 md:grid-cols-2">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.agentId}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                <Card className="h-full border-white/[0.08] bg-gradient-to-br from-[#111827]/95 to-[#09090b]/95 text-[#f3f1f5] ring-white/[0.08] transition-[border-color,box-shadow] duration-300 hover:border-blue-300/25 hover:shadow-[0_12px_42px_rgba(37,99,235,0.16)]">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="rounded-lg border border-blue-300/15 bg-gradient-to-br from-blue-400/15 to-sky-400/10 p-2 text-blue-200">
                        <Bot aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0 space-y-1">
                        <CardTitle className="truncate">{agent.name}</CardTitle>
                        <p className="line-clamp-3 text-sm text-[#96909c]">
                          {agent.knowledgeBase}
                        </p>
                      </div>
                    </div>
                    <Button
                      aria-label={`Edit ${agent.name}`}
                      className="text-[#aaa4b0] transition-colors hover:bg-blue-400/10 hover:text-blue-200"
                      onClick={() => navigate(`/agents/${agent.agentId}`)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Pencil />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full border-white/10 bg-white/[0.03] text-[#e8e3eb] transition-colors hover:border-blue-300/25 hover:bg-blue-400/10 hover:text-white"
                      onClick={() => navigate(`/agents/${agent.agentId}`)}
                      type="button"
                      variant="outline"
                    >
                      Manage agent
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>
          )}
      </div>
    </AgentPageShell>
  );
};

export default AgentsPage;
