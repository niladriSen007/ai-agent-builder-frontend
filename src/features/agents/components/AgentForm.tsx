import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { Agent, AgentInput } from "../types";

type AgentFormProps = {
  agent?: Agent;
  isPending: boolean;
  onSubmit: (values: AgentInput) => Promise<void>;
};

const AgentForm = ({ agent, isPending, onSubmit }: AgentFormProps) => {
  const form = useForm({
    defaultValues: {
      name: agent?.name ?? "",
      knowledgeBase: agent?.knowledgeBase ?? "",
      instructions: agent?.instructions ?? "",
      tools: agent?.tools.join("\n") ?? "",
      isActive: agent?.isActive ?? true,
    },
    onSubmit: async ({ value }) => {
      await onSubmit({
        name: value.name.trim(),
        knowledgeBase: value.knowledgeBase.trim(),
        instructions: value.instructions.trim(),
        tools: value.tools
          .split("\n")
          .map((tool) => tool.trim())
          .filter(Boolean),
        isActive: value.isActive,
      });
    },
  });

  return (
    <Card className="border-white/[0.08] bg-gradient-to-br from-[#111827]/95 to-[#09090b]/95 text-[#f3f1f5] ring-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.trim() ? undefined : "Name is required.",
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-[#e7e2e9]" htmlFor={field.name}>
                  Name
                </Label>
                <Input
                  autoComplete="off"
                  id={field.name}
                  className="h-10 border-white/10 bg-black/30 text-[#f3f1f5] placeholder:text-[#77717d] focus-visible:border-blue-300/40 focus-visible:ring-blue-300/15"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Support Assistant"
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="knowledgeBase"
            validators={{
              onChange: ({ value }) =>
                value.trim() ? undefined : "Knowledge base is required.",
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-[#e7e2e9]" htmlFor={field.name}>
                  Knowledge base
                </Label>
                <Textarea
                  id={field.name}
                  className="min-h-28 border-white/10 bg-black/30 text-[#f3f1f5] placeholder:text-[#77717d] focus-visible:border-blue-300/40 focus-visible:ring-blue-300/15"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Describe the information this agent should use."
                  rows={4}
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="instructions"
            validators={{
              onChange: ({ value }) =>
                value.trim() ? undefined : "Instructions are required.",
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label className="text-[#e7e2e9]" htmlFor={field.name}>
                  Instructions
                </Label>
                <Textarea
                  id={field.name}
                  className="min-h-28 border-white/10 bg-black/30 text-[#f3f1f5] placeholder:text-[#77717d] focus-visible:border-blue-300/40 focus-visible:ring-blue-300/15"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Tell the agent how to respond."
                  rows={4}
                  value={field.state.value}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive" role="alert">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="tools">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-[#e7e2e9]" htmlFor={field.name}>
                  Tools
                </Label>
                <Textarea
                  id={field.name}
                  className="min-h-20 border-white/10 bg-black/30 text-[#f3f1f5] placeholder:text-[#77717d] focus-visible:border-blue-300/40 focus-visible:ring-blue-300/15"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder={"search_knowledge_base\nanother_tool"}
                  rows={3}
                  value={field.state.value}
                />
                <p className="text-sm text-[#85818a]">
                  Enter one tool name per line. Leave empty to use no tools.
                </p>
              </div>
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.08] bg-black/20 p-4">
                <div className="space-y-1">
                  <Label className="text-[#e7e2e9]" htmlFor={field.name}>
                    Active
                  </Label>
                  <p className="text-sm text-[#85818a]">
                    Allow this agent to be used in the app.
                  </p>
                </div>
                <Switch
                  checked={field.state.value}
                  id={field.name}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.isSubmitting, state.isDirty]}
          >
            {([isSubmitting, isDirty]) => (
              <div className="flex justify-end">
                <Button
                  className="cursor-pointer bg-blue-600 duration-300 hover:bg-blue-700"
                  disabled={isPending || isSubmitting || (!!agent && !isDirty)}
                  type="submit"
                >
                  {isPending || isSubmitting
                    ? "Saving..."
                    : agent
                      ? "Save changes"
                      : "Create agent"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentForm;
