import { FileSearch, Gauge, MessageCircleQuestion, Quote } from "lucide-react";

export default function Features() {
    const features = [
      {
        title: "Upload PDFs",
        description: "Upload any PDF document securely.",
        icon: FileSearch,
      },
      {
        title: "AI Chat",
        description: "Ask questions in natural language.",
        icon: MessageCircleQuestion,
      },
      {
        title: "Page References",
        description: "Every answer includes supporting page numbers.",
        icon: Quote,
      },
      {
        title: "Fast Retrieval",
        description: "Semantic search powered by vector embeddings.",
        icon: Gauge,
      },
    ];
  
    return (
      <section id="features" className="border-y border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Built for clarity</p>
          <h2 className="mt-3 mb-10 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Everything you need to understand a document faster.</h2>
  
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="mb-5 grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white"><feature.icon size={21} /></div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
  
                <p className="leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
