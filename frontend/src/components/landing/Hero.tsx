import Link from "next/link";
import { ArrowRight, FileText, MessageSquareText, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white px-5 pb-18 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
      <div className="absolute inset-x-0 top-8 -z-0 mx-auto h-72 max-w-3xl rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm"><Sparkles size={14} /> AI-powered document search</div>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Your PDFs, ready for a real conversation.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Upload a document, ask questions naturally, and get clear answers with the page references to back them up.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/chat" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">Start chatting <ArrowRight size={18} /></Link>
          <a href="#features" className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 sm:w-auto">See how it works</a>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm"><FileText className="text-indigo-600" size={20} /><p className="mt-3 text-sm font-semibold text-slate-900">Upload a PDF</p></div>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm"><MessageSquareText className="text-indigo-600" size={20} /><p className="mt-3 text-sm font-semibold text-slate-900">Ask anything</p></div>
          <div className="col-span-2 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:col-span-1"><Sparkles className="text-indigo-600" size={20} /><p className="mt-3 text-sm font-semibold text-slate-900">Get sourced answers</p></div>
        </div>
      </div>
    </section>
  );
}
