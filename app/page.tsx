"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { sendResume } from "@/app/actions/sendResume";

const schema = z.object({
  nome: z.string().min(2, "Mínimo 2 caracteres"),
  cargo: z.string().min(2, "Mínimo 2 caracteres"),
});

type FormDataType = z.infer<typeof schema>;

const steps = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Cargo" },
  { id: 3, label: "Documento" },
  { id: 4, label: "Envio" },
];

export default function ResumeForm() {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      cargo: "",
    },
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const nome = form.watch("nome") ?? "";
  const cargo = form.watch("cargo") ?? "";
  const nOk = nome.trim().length >= 2;
  const cOk = cargo.trim().length >= 2;
  const fOk = !!file;
  const filled = [nOk, cOk, fOk].filter(Boolean).length;

  const stepState = (i: number) => {
    if (i === 0) return nOk ? "done" : "idle";
    if (i === 1) return cOk ? "done" : "idle";
    if (i === 2) return fOk ? "done" : "idle";
    return filled === 3 ? "active" : "idle";
  };

  const handleFile = (f: File | null) => {
    if (f?.type === "application/pdf") setFile(f);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white border border-slate-200 overflow-hidden grid grid-cols-[200px_1fr] min-h-[480px]">
        {/* Sidebar */}
        <aside className="border-r border-slate-100 p-8 flex flex-col gap-8">
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-slate-400 mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Plataforma
            </p>
            <h2
              className="text-[17px] font-bold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Analisador
              <br />
              de Currículo
            </h2>
          </div>

          <nav className="flex flex-col gap-1">
            {steps.map((s, i) => {
              const state = stepState(i);
              return (
                <React.Fragment key={s.id}>
                  <div
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg ${state === "active" ? "bg-slate-50" : ""}`}
                  >
                    <div
                      className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 transition-all
                      ${
                        state === "done"
                          ? "bg-teal-600 border-teal-600 text-white"
                          : state === "active"
                            ? "border-slate-800 text-slate-800"
                            : "border-slate-200 text-slate-400"
                      }`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {state === "done" ? "✓" : s.id}
                    </div>
                    <span
                      className={`text-xs font-medium ${state === "done" ? "text-teal-700" : state === "active" ? "text-slate-900" : "text-slate-400"}`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-4 bg-slate-100 ml-[22px]" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <p className="mt-auto text-[11px] text-slate-300 leading-relaxed">
            Seus dados são analisados por IA e mantidos em segurança.
          </p>
        </aside>

        {/* Main */}
        <div className="p-10 flex flex-col">
          <div className="mb-8">
            <p
              className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Candidatura
            </p>
            <h1
              className="text-2xl font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Envie seu currículo
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-light">
              Preencha os dados para análise inteligente
            </p>
          </div>

          <form
            action={async (formData) => {
              if (!file) return;
              formData.set("file", file);
              setLoading(true);
              setProgress(40);
              try {
                setProgress(75);
                await sendResume(formData);
                setProgress(100);
                toast.success("Currículo enviado com sucesso!");
                form.reset();
                setFile(null);
                setTimeout(() => setProgress(0), 600);
              } catch {
                toast.error("Erro ao enviar. Tente novamente.");
                setProgress(0);
              } finally {
                setLoading(false);
              }
            }}
            className="flex flex-col gap-5 flex-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="nome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Nome completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...field}
                      name="nome"
                      className={`border rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all text-slate-900 placeholder-slate-300
                      ${fieldState.invalid ? "border-red-300 ring-2 ring-red-50" : nOk ? "border-teal-400" : "border-slate-200 focus:border-slate-400"}`}
                      placeholder="Seu nome"
                    />
                    {fieldState.error && (
                      <span className="text-[11px] text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="cargo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Cargo pretendido <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...field}
                      name="cargo"
                      className={`border rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all text-slate-900 placeholder-slate-300
                      ${fieldState.invalid ? "border-red-300 ring-2 ring-red-50" : cOk ? "border-teal-400" : "border-slate-200 focus:border-slate-400"}`}
                      placeholder="Ex: Designer UX"
                    />
                    {fieldState.error && (
                      <span className="text-[11px] text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Currículo em PDF <span className="text-red-400">*</span>
              </label>
              {!file ? (
                <div
                  className={`border border-dashed rounded-lg p-5 flex items-center gap-4 cursor-pointer transition-all
                    ${dragging ? "border-slate-400 bg-slate-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFile(e.dataTransfer.files[0]);
                  }}
                >
                  <div className="w-9 h-9 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 2.5A1.5 1.5 0 014.5 1h5.379a1.5 1.5 0 011.06.44l2.122 2.12A1.5 1.5 0 0113.5 4.62V13.5A1.5 1.5 0 0112 15H4.5A1.5 1.5 0 013 13.5v-11z"
                        stroke="#94a3b8"
                        strokeWidth="1"
                      />
                      <path
                        d="M8 5.5v5M6 8.5l2 2 2-2"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">
                      <span className="underline underline-offset-2">
                        Clique para selecionar
                      </span>{" "}
                      ou arraste aqui
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Apenas .pdf · máx. 10 MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              ) : (
                <div className="border border-teal-300 bg-teal-50 rounded-lg px-4 py-3 flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13.5l3.5-3.5 2.5 2.5 4-5"
                      stroke="#0F6E56"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-teal-800 flex-1 truncate">
                    {file.name}
                  </span>
                  <span
                    className="text-xs text-teal-600 bg-teal-100 px-2 py-0.5 rounded font-medium"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    PDF
                  </span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-teal-400 hover:text-teal-700 text-xs ml-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            {progress > 0 && (
              <div className="h-0.5 bg-slate-100 rounded overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-500 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
              <span
                className="text-xs text-slate-300"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {filled} de 3 campos preenchidos
              </span>
              <button
                type="submit"
                disabled={loading || filled < 3}
                className="flex items-center gap-2 bg-slate-900 text-white rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {loading ? "Enviando..." : "Analisar"}
                {!loading && (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
