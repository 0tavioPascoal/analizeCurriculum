"use client";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { motion } from "framer-motion";

interface GlassInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>; 
  placeholder: string;
  control: Control<T>; 
  error?: string;
}

export function GlassInput<T extends FieldValues>({ 
  label, 
  name, 
  placeholder, 
  control, 
  error 
}: GlassInputProps<T>) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[3px] font-black text-white ml-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative group">
            <input
              {...field}
              placeholder={placeholder}
              className={`
                w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium outline-none transition-all
                placeholder:text-slate-400 group-hover:border-white/20
                focus:border-teal-500 focus:bg-white/10 focus:ring-4 focus:ring-teal-500/10
                ${error ? "border-red-500/50 bg-red-500/5" : ""}
              `}
            />
            {error && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-1 text-[10px] font-bold text-red-500 uppercase tracking-wider"
              >
                {error}
              </motion.span>
            )}
          </div>
        )}
      />
    </div>
  );
}