"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { askQuestion } from "@/services/chat";
import type { Message } from "@/types/api";
import ChatMessage from "./ChatMessage";

interface ChatSectionProps {
  isPdfReady: boolean;
}

export default function ChatSection({
  isPdfReady,
}: ChatSectionProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const text = question.trim();

    if (!text || loading || !isPdfReady) return;

    setMessages((items) => [
      ...items,
      {
        id: generateId(),
        role: "user",
        content: text,
      },
    ]);

    setQuestion("");
    setError(null);
    setLoading(true);

    try {
      const response = await askQuestion(text);

      setMessages((items) => [
        ...items,
        {
          id: generateId(),
          role: "assistant",
          content: response.answer,
          pages: response.pages,
        },
      ]);
    } catch (requestError) {
      console.error(requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : "I could not get an answer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    isPdfReady &&
    Boolean(question.trim()) &&
    !loading;

  return (
    <section className="flex min-h-[500px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Ask your PDF
      </h2>

      <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            {isPdfReady
              ? "Your PDF is ready. Ask a question below."
              : "Upload a PDF to unlock the chat."}
          </p>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <p className="text-sm text-slate-500">
            Searching your PDF...
          </p>
        )}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex gap-3 border-t border-slate-100 pt-5"
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={!isPdfReady || loading}
          className="flex-1 rounded-lg border border-slate-300 p-3 outline-none focus:border-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder={
            isPdfReady
              ? "Ask anything about the PDF..."
              : "Upload a PDF first"
          }
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
          {loading ? "Asking..." : "Send"}
        </button>
      </form>
    </section>
  );
}