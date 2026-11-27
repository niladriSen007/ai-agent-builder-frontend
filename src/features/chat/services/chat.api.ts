import { POST } from "@/lib/apiMethods";

type ChatRequest = {
  userMessage: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatHistoryResponse = {
  messages: unknown[];
};

const isChatMessage = (message: unknown): message is ChatMessage => {
  if (
    typeof message !== "object" ||
    message === null ||
    !("id" in message) ||
    !("role" in message) ||
    !("content" in message)
  ) {
    return false;
  }

  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string"
  );
};

const parseMessages = (response: ChatHistoryResponse | null): ChatMessage[] => {
  if (!response || !Array.isArray(response.messages)) {
    throw new Error("Chat response did not include valid messages.");
  }

  const messages: ChatMessage[] = [];
  for (const message of response.messages) {
    if (!isChatMessage(message)) {
      throw new Error("Chat response did not include valid messages.");
    }
    messages.push(message);
  }

  return messages;
};

export const sendChatMessage = async (
  userMessage: string,
): Promise<ChatMessage[]> => {
  const response = await POST<ChatHistoryResponse, ChatRequest>(
    "/api/v1/chat/ai",
    { userMessage },
  );
  return parseMessages(response);
};