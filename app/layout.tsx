import React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/features/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mehul Arora — Full Stack Developer",
  description:
    "Full Stack Developer specializing in backend engineering, scalability, and modern web applications. B.Tech First Year, Faridabad, India.",
  keywords: ["Mehul Arora", "Full Stack Developer", "MERN", "Next.js", "Backend Engineer"],
  authors: [{ name: "Mehul Arora" }],
  openGraph: {
    title: "Mehul Arora — Full Stack Developer",
    description: "Full Stack Developer specializing in backend engineering, scalability, and modern web applications.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable, geistMono.variable)}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
