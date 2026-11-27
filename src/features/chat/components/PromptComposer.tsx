import { ArrowUp, ImagePlus, MoreHorizontal, Search, AudioLines } from "lucide-react";
import { useState, type FormEvent } from "react";

type PromptComposerProps = {
  onSubmit: (prompt: string) => Promise<void>;
};

const PromptComposer = ({ onSubmit }: PromptComposerProps) => {
  const [prompt, setPrompt] = useState("");
  const [activeTool, setActiveTool] = useState<"search" | "image" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit(trimmedPrompt);
      setPrompt("");
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      aria-busy={isSubmitting}
      className="prompt-composer"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <label className="sr-only" htmlFor="assistant-prompt">Ask anything</label>
      <textarea
        id="assistant-prompt"
        disabled={isSubmitting}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="Ask anything ..."
        rows={3}
        value={prompt}
      />
      {submitError && (
        <p aria-live="assertive" className="prompt-error" role="alert">
          {submitError}
        </p>
      )}
      <div className="composer-toolbar">
        <div className="composer-tools">
          <button
            aria-pressed={activeTool === "search"}
            className={`composer-tool${activeTool === "search" ? " is-selected" : ""}`}
            onClick={() => setActiveTool(activeTool === "search" ? null : "search")}
            type="button"
          >
            <Search size={15} />
            Search
          </button>
          <button
            aria-pressed={activeTool === "image"}
            className={`composer-tool${activeTool === "image" ? " is-selected" : ""}`}
            onClick={() => setActiveTool(activeTool === "image" ? null : "image")}
            type="button"
          >
            <ImagePlus size={15} />
            Create Image
          </button>
          <button aria-label="More prompt tools" className="composer-more" type="button">
            <MoreHorizontal size={17} />
          </button>
        </div>
        <div className="composer-submit-actions">
          <button aria-label="Voice input" className="voice-button" type="button">
            <AudioLines size={17} />
          </button>
          <button
            aria-label="Send prompt"
            className="send-button"
            disabled={!prompt.trim() || isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <span aria-hidden="true" className="send-spinner" />
            ) : (
              <ArrowUp size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptComposer;
