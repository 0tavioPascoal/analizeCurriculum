import type { Metadata } from "next";
import { Syne, Lato } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Analisador de Currículo",
  description: "Envie seu currículo para análise inteligente por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-100">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}