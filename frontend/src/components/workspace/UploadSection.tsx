"use client";

import { useState } from "react";
import { CheckCircle2, Eye, LoaderCircle, UploadCloud } from "lucide-react";
import { uploadPDF } from "@/services/pdf";

interface UploadSectionProps {
  onViewPdf: () => void;
  onUploaded: (file: File) => void;
  onUploadStateChange: (isReady: boolean) => void;
}

export default function UploadSection({ onViewPdf, onUploaded, onUploadStateChange }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setUploaded(false);
    setError(null);
    onUploadStateChange(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    try {
      await uploadPDF(selectedFile);
      setUploaded(true);
      onUploaded(selectedFile);
      onUploadStateChange(true);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError instanceof Error ? requestError.message : "Upload failed. Make sure the backend is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileSize = selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Upload a PDF</h2>
      <p className="mt-1 text-sm text-slate-500">Choose the document you want to explore.</p>

      <div className="mt-5">
        <input id="pdf-upload" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} className="sr-only" />
        <label htmlFor="pdf-upload" className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-indigo-400 hover:bg-indigo-50/40">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-indigo-600 shadow-sm transition group-hover:scale-105"><UploadCloud size={22} /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-800">{selectedFile ? selectedFile.name : "Choose a PDF to upload"}</span><span className="mt-0.5 block text-xs text-slate-500">{selectedFile ? `${fileSize} · Click to replace` : "Select a file from your device"}</span></span>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={handleUpload} disabled={!selectedFile || loading} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-slate-900">
          {loading ? <LoaderCircle className="animate-spin" size={17} /> : <UploadCloud size={17} />}
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>

      {uploaded && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 p-4"><p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700"><CheckCircle2 size={18} />PDF uploaded successfully</p><button onClick={onViewPdf} className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-sm"><Eye size={16} />View PDF</button></div>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </section>
  );
}
