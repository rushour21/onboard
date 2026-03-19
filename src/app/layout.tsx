import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppChrome from "@/components/layout/AppChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillHire — Hire Based on Skills, Not Resumes",
  description:
    "SkillHire bridges the gap between companies and candidates through practical, project-based technical assessments. Find talent that can actually do the job.",
  keywords: ["hiring", "jobs", "assessments", "skills", "technical hiring"],
  openGraph: {
    title: "SkillHire",
    description: "Project-based hiring for modern engineering teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
