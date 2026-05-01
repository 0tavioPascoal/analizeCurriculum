"use client";
import { motion } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck, Users } from "lucide-react";

export function InfoSection() {
  return (
    <div className="lg:col-span-5 space-y-8 pt-8">
      <motion.div 
        initial={{ opacity: 0, x: -30 }} 
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
      >
        <Sparkles size={14} className="text-teal-400" />
        <span className="text-[10px] uppercase tracking-[2px] font-bold text-teal-400">OM Redes Neurais</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]"
      >
        Sua carreira <br /> 
        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
          codificada.
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-slate-400 text-lg max-w-md font-light leading-relaxed"
      >
        Integramos sua experiência profissional em nossa rede neural para encontrar o match perfeito com as vagas do amanhã.
      </motion.p>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <InfoCard icon={<Cpu size={20} />} title="Processing" desc="IA de Alto Desempenho" color="text-teal-400" />
        <InfoCard icon={<ShieldCheck size={20} />} title="Encryption" desc="Privacidade Total" color="text-blue-400" />
      </div>

      {/* Seção de Criadores */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="pt-4 border-t border-white/5"
      >
        <div className="flex items-center text-slate-500 mb-2">
          <Users size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Desenvolvido por</span>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Otávio Pascoal • Matheus Freitas
        </p>
      </motion.div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfoCard({ icon, title, desc, color }: any) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
      <p className="text-sm text-slate-200">{desc}</p>
    </div>
  );
}