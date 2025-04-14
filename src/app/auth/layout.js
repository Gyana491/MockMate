"use client";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AuthProvider } from "@/lib/hooks/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({ children }) {
  return (
    
    <AuthProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className}`}
      >
        {children}
      </div>
    </AuthProvider>
  );
}
