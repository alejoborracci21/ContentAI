import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContenAI - Genera blogs en segundos con IA",
  description:
    "Crea contenido SEO-friendly, atractivo y único en un clic con inteligencia artificial",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${geistSans.variable} ${geistMono.variable} `}>
        {children}
      </body>
    </html>
  );
}
