import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { Agent, AgentInput } from "../types";

const availableTools = [
  {
    _id: "calculator",
    toolName: "Calculator",
    toolDescription: "Perform mathematical calculations",
  },
  {
    _id: "web-search",
    toolName: "Web Search",
    toolDescription: "Search for information on the web",
  },
  {
    _id: "read-emails",
    toolName: "Read Emails",
    toolDescription: "Read and summarize emails",
  },
  {
    _id: "send-emails",
    toolName: "Send Emails",
    toolDescription: "Draft and send emails",
  },
];

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
      tools: agent?.tools ?? [],
      isActive: agent?.isActive ?? true,
    },
    onSubmit: async ({ value }) => {
      await onSubmit({
        name: value.name.trim(),
        knowledgeBase: value.knowledgeBase.trim(),
        instructions: value.instructions.trim(),
        tools: value.tools,
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
              <fieldset className="space-y-2">
                <div className="space-y-1">
                  <legend className="text-sm font-medium text-[#e7e2e9]">
                    Tools
                  </legend>
                  <p className="text-sm text-[#85818a]">
                    Select the capabilities available to your agent.
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
                  {availableTools.map((tool, index) => {
                    const checkboxId = `${field.name}-${tool._id}`;
                    const isSelected = field.state.value.includes(tool.toolName);

                    return (
                      <label
                        className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-white/[0.04] ${
                          index > 0 ? "border-t border-white/[0.06]" : ""
                        }`}
                        htmlFor={checkboxId}
                        key={tool._id}
                      >
                        <span className="space-y-1">
                          <span className="block font-medium text-[#e7e2e9]">
                            {tool.toolName}
                          </span>
                          <span className="block text-sm text-[#85818a]">
                            {tool.toolDescription}
                          </span>
                        </span>
                        <Checkbox
                          aria-label={`Enable ${tool.toolName}`}
                          checked={isSelected}
                          id={checkboxId}
                          onCheckedChange={(checked) => {
                            field.handleChange(
                              checked
                                ? [...field.state.value, tool.toolName]
                                : field.state.value.filter(
                                    (selectedTool) =>
                                      selectedTool !== tool.toolName,
                                  ),
                            );
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
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
