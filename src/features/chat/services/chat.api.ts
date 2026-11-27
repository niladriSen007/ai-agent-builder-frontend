import { POST } from "@/lib/apiMethods";

type ChatRequest = {
  userMessage: string;
};

type ChatResponse = {
  message: string;
};

export const sendChatMessage = async (userMessage: string): Promise<string> => {
  const response = await POST<ChatResponse, ChatRequest>("/api/v1/chat/ai", {
    userMessage,
  });

  if (!response || typeof response.message !== "string") {
    throw new Error("Chat response did not include a message.");
  }

  return response.message;
};