import type { Message } from "@/types/api";

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return <article className={`max-w-[88%] rounded-2xl px-4 py-3 ${isUser ? "ml-auto bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-800"}`}><p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-60">{isUser ? "You" : "Search & Get AI"}</p><p className="whitespace-pre-wrap leading-6">{message.content}</p>{!isUser && message.pages && message.pages.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{message.pages.map((page) => <span key={page} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Page {page}</span>)}</div>}</article>;
}
