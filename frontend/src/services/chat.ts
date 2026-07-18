import api, { getApiErrorMessage } from "./api";
import { ChatRequest, ChatResponse } from "@/types/api";

export async function askQuestion(
  question: string
): Promise<ChatResponse> {
  const body: ChatRequest = {
    question,
  };

  try {
    const response = await api.post<ChatResponse>("/chat", body);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "I could not get an answer. Please try again."));
  }
}
