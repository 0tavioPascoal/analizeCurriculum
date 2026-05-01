"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Trash2 } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export function FileUpload({ file, setFile }: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const FIXED_HEIGHT = "h-[120px]"; 

  return (
    <div className="flex flex-col gap-4 mt-4">
      <label className="text-[10px] uppercase tracking-[3px] font-black text-white ml-1 mb-1">
        Anexar Currículo
      </label>
      
      <div className={`${FIXED_HEIGHT} w-full relative`}>
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => fileInputRef.current?.click()}
              className={`group w-full ${FIXED_HEIGHT} border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center cursor-pointer transition-all hover:bg-white/5 hover:border-teal-500/50`}
            >
              <div className="flex flex-row items-center gap-4 transition-transform group-hover:scale-105">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Plus size={20} className="text-teal-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-300">Upload PDF</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Máximo 10MB</span>
                </div>
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                className="hidden" 
                accept=".pdf" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className={`w-full ${FIXED_HEIGHT} px-6 bg-teal-500/10 border border-teal-500/20 rounded-3xl flex items-center gap-5`}
            >
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20 shrink-0">
                <FileText size={24} className="text-[#0A0A0B]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-teal-400 truncate tracking-tight">
                  {file.name}
                </p>
                <p className="text-[9px] text-teal-500/50 uppercase font-black tracking-[2px] mt-0.5">
                  Pronto para análise
                </p>
              </div>

              <button 
                type="button" 
                onClick={() => setFile(null)}
                className="group w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all shrink-0"
                title="Remover arquivo"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}