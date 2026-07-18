"use client";

import Link from "next/link";
import { useState } from "react";
import UploadSection from "@/components/workspace/UploadSection";
import PdfViewerModal from "@/components/workspace/PdfViewerModal";
import ChatSection from "@/components/workspace/ChatSection";

export default function ChatPage() {
  const [showPdf, setShowPdf] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPdfReady, setIsPdfReady] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:px-6">
        <header>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">← Back to home</Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Your PDF workspace</h1>
          <p className="mt-1 text-slate-600">Upload a document, preview it, and ask questions about it.</p>
        </header>
        <UploadSection onUploaded={setUploadedFile} onViewPdf={() => setShowPdf(true)} onUploadStateChange={setIsPdfReady} />
        {showPdf && uploadedFile && <PdfViewerModal onClose={() => setShowPdf(false)} file={uploadedFile} />}
        <ChatSection isPdfReady={isPdfReady} />
      </div>
    </main>
  );
}
