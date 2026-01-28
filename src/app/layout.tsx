/**
 * Root Layout
 * Made by AMST → https://ataberkdudu.info
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AMSTBranding from "@/components/AMSTBranding";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seminer Kayıt Sistemi",
  description: "Instagram üzerinden seminer kaydı yapın - Made by AMST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* 
        █████╗ ███╗   ███╗███████╗████████╗
       ██╔══██╗████╗ ████║██╔════╝╚══██╔══╝
       ███████║██╔████╔██║███████╗   ██║
       ██╔══██║██║╚██╔╝██║╚════██║   ██║
       ██║  ██║██║ ╚═╝ ██║███████║   ██║
       ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AMSTBranding />
          {children}
        </Providers>
      </body>
    </html>
  );
}
