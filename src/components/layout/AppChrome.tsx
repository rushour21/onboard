"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isJobs = pathname?.startsWith("/jobs");
  const hideLandingChrome = isDashboard || isJobs;

  return (
    <>
      {!hideLandingChrome && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideLandingChrome && <Footer />}
    </>
  );
}

