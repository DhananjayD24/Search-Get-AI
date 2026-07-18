import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-950">
          <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-white"><Sparkles size={16} /></span>
          Search & Get AI
        </Link>

        <Link
          href="/chat"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          Try it free <ArrowUpRight size={15} />
        </Link>
      </div>
    </nav>
  );
}
