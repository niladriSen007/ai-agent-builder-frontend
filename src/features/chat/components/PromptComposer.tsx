import { ArrowUp, ImagePlus, MoreHorizontal, Search, AudioLines } from "lucide-react";
import { useState, type FormEvent } from "react";

type PromptComposerProps = {
  onSubmit: (prompt: string) => void;
};

const PromptComposer = ({ onSubmit }: PromptComposerProps) => {
  const [prompt, setPrompt] = useState("");
  const [activeTool, setActiveTool] = useState<"search" | "image" | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;
    onSubmit(trimmedPrompt);
    setPrompt("");
  };

  return (
    <form className="prompt-composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="assistant-prompt">Ask anything</label>
      <textarea
        id="assistant-prompt"
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
            disabled={!prompt.trim()}
            type="submit"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptComposer;
