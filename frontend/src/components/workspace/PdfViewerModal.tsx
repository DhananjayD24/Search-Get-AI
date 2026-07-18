"use client";

import { useEffect, useMemo } from "react";

interface PdfViewerModalProps { onClose: () => void; file: File; }

export default function PdfViewerModal({ onClose, file }: PdfViewerModalProps) {
  const pdfUrl = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(pdfUrl), [pdfUrl]);
  return <div className="fixed inset-0 z-50 bg-slate-950/50 p-4 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true" aria-label="PDF viewer">
    <section className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4 md:p-5"><h2 className="truncate text-lg font-bold text-slate-900">{file.name}</h2><button onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-2xl text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Close PDF viewer">&times;</button></div>
      <div className="min-h-0 flex-1 bg-slate-100">{pdfUrl && <iframe className="h-full min-h-[70vh] w-full" src={pdfUrl} title={`Preview of ${file.name}`} />}</div>
    </section>
  </div>;
}
