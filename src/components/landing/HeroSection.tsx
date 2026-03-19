import Link from "next/link";
import { ChevronRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-16">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, #D6D1F5 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, #B2CEC7 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B2CEC7] animate-pulse" />
            <span className="text-xs font-semibold text-[#2D3436] uppercase tracking-widest">
              The Future of Technical Hiring
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#2D3436] mb-6 leading-[1.05]">
            Hire Talent Based on{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #B2CEC7 0%, #D6D1F5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills
            </span>
            ,{" "}
            <br className="hidden md:block" />
            Not Résumés.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-[#2D3436]/60 mb-12 leading-relaxed max-w-2xl mx-auto">
            OnboardDEV connects engineering teams with candidates through
            real-world, project-based assessments — so you always know exactly
            what you&apos;re hiring.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link
              href="/sign-up"
              className="group flex items-center justify-center gap-2 bg-[#2D3436] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#2D3436]/90 transition-all duration-200 w-full sm:w-auto"
            >
              Start as a Candidate
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sign-up?role=company"
              className="flex items-center justify-center gap-2 bg-white text-[#2D3436] font-bold text-base px-8 py-4 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#B2CEC7] transition-all duration-200 w-full sm:w-auto"
            >
              Post a Job
              <span className="text-xs font-medium bg-[#D6D1F5] text-[#2D3436] px-2 py-0.5 rounded-full">
                Free
              </span>
            </Link>
            <Link
              href="/ats-score"
              className="flex items-center justify-center gap-2 bg-[#B2CEC7]/20 text-[#2D3436] font-bold text-base px-8 py-4 rounded-2xl border border-[#B2CEC7]/50 shadow-sm hover:bg-[#B2CEC7]/40 hover:shadow-md transition-all duration-200 w-full sm:w-auto mt-2 sm:mt-0"
            >
              Check ATS Score
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D3436] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D3436]"></span>
              </span>
            </Link>
          </div>

          {/* Social Proof */}
          <p className="mt-10 text-sm text-[#2D3436]/40 font-medium">
            Trusted by{" "}
            <span className="text-[#2D3436]/70 font-semibold">500+</span>{" "}
            companies and{" "}
            <span className="text-[#2D3436]/70 font-semibold">12,000+</span>{" "}
            candidates worldwide
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#features"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#2D3436]/30 hover:text-[#2D3436]/60 transition-colors"
        aria-label="Scroll to features"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
