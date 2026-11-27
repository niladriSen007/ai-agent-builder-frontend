import { ArrowLeft, Bot, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PromptComposer from "./PromptComposer";
import { sendChatMessage, type ChatMessage } from "../services/chat.api";
import "./home.css";

type ChatNavigationState = {
  initialPrompt?: unknown;
};

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPrompt = (location.state as ChatNavigationState | null)
    ?.initialPrompt;
  const handledLocationKey = useRef<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(
    () => typeof initialPrompt === "string" && Boolean(initialPrompt.trim()),
  );
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (
      typeof initialPrompt !== "string" ||
      !initialPrompt.trim() ||
      handledLocationKey.current === location.key
    ) {
      return;
    }

    handledLocationKey.current = location.key;
    navigate("/chat", { replace: true, state: null });
    setIsSending(true);
    setError("");

    void (async () => {
      try {
        setMessages(await sendChatMessage(initialPrompt));
      } catch (sendError: unknown) {
        setError(
          sendError instanceof Error
            ? sendError.message
            : "Unable to send your message.",
        );
      } finally {
        setIsLoading(false);
        setIsSending(false);
      }
    })();
  }, [initialPrompt, location.key, navigate]);

  const handleSubmit = async (prompt: string) => {
    setIsSending(true);
    setError("");
    try {
      setMessages(await sendChatMessage(prompt));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main aria-busy={isLoading || isSending} className="chat-page">
      <header className="chat-page-header">
        <button
          aria-label="Back to home"
          className="chat-back-button"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="chat-page-title">
          <span aria-hidden="true" className="chat-title-icon">
            <Sparkles size={16} />
          </span>
          <h1>AI Chat</h1>
        </div>
      </header>

      <section
        aria-label="Conversation"
        aria-live="polite"
        className="chat-messages"
      >
        {isLoading && <p className="chat-status">Loading conversation…</p>}
        {!isLoading && messages.length === 0 && !error && (
          <p className="chat-status">
            Start a conversation by sending a message.
          </p>
        )}
        {messages.map((message) => (
          <article
            className={`chat-message chat-message-${message.role}`}
            key={message.id}
          >
            {message.role === "assistant" && (
              <span aria-hidden="true" className="chat-assistant-icon">
                <Bot size={17} />
              </span>
            )}
            <div className="chat-message-content">
              {message.content.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={`${message.id}-${index}`}>
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={`${message.id}-${index}`}>{part}</span>
                ),
              )}
            </div>
          </article>
        ))}
        {isSending && !isLoading && (
          <p aria-live="polite" className="chat-status" role="status">
            Thinking…
          </p>
        )}
        {error && (
          <p aria-live="assertive" className="chat-error" role="alert">
            {error}
          </p>
        )}
        <div ref={messagesEndRef} />
      </section>

      <div className="chat-composer-dock">
        <div className="chat-composer-inner">
          <PromptComposer onSubmit={handleSubmit} />
          <p className="chat-disclaimer">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
