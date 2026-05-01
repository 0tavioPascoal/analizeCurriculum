"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";

// Imports internos
import { InfoSection } from "@/app/_components/info-section";
import { GlassInput } from "@/app/_components/glass-input";
import { FileUpload } from "@/app/_components/file-upload";
import { sendResume } from "@/app/actions/sendResume";
import { curriculumSchema, type CurriculumData } from "@/app/interface/ICurriculum";

export default function ResumeFormContainer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CurriculumData>({
    resolver: zodResolver(curriculumSchema),
    defaultValues: { 
      nome: "", 
      cargo: "",
      email: "" 
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CurriculumData) => {
    if (!file) {
      toast.error("Anexe o currículo em PDF.");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("cargo", data.cargo);
    formData.append("email", data.email);
    formData.append("file", file);

    try {
      await sendResume(formData);
      toast.success("Dados enviados com sucesso, sua avaliação chegará no seu e-mail!");
      reset();
      setFile(null);
    } catch (error) {
      toast.error("Erro no processamento dos dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0A0A0B] text-slate-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />

      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
          <InfoSection />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-7 xl:col-span-8 bg-white/2 backdrop-blur-3xl border border-white/10 rounded-[40px] p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <GlassInput label="Quem é você?" name="nome" placeholder="Seu nome" control={control} error={errors.nome?.message} />
              <GlassInput label="O que você busca?" name="cargo" placeholder="Cargo pretendido" control={control} error={errors.cargo?.message} />
              <div className="md:col-span-2">
                <GlassInput label="E-mail" name="email" placeholder="seu@email.com" control={control} error={errors.email?.message} />
              </div>
            </div>

            <FileUpload file={file} setFile={setFile} />

            <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">
                {isValid && file ? "Status: Pronto" : "Status: Pendente"}
              </span>

              <button
                type="submit"
                disabled={!isValid || !file || loading}
                className="group relative h-14 px-8 bg-white text-[#0A0A0B] rounded-xl font-black text-[10px] uppercase tracking-[2px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "Sincronizando..." : "Iniciar Análise"} <ArrowUpRight size={16} />
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}