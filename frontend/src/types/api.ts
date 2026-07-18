export interface UploadResponse {
   message: string;
}
  
 export interface ChatRequest {
   question: string;
}
  
export interface ChatResponse {
   answer: string;
   pages: number[];
}

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    pages?: number[];
  }
