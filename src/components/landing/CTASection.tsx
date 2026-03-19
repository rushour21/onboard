import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, #2D3436 0%, #3d4a4c 50%, #2D3436 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #B2CEC7, transparent 70%)",
              filter: "blur(50px)",
            }}
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #D6D1F5, transparent 70%)",
              filter: "blur(50px)",
            }}
            aria-hidden
          />

          {/* Content */}
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-8">
              <Briefcase className="w-8 h-8 text-[#B2CEC7]" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Ready to hire better?
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #B2CEC7, #D6D1F5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Start for free today.
              </span>
            </h2>

            <p className="text-white/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Join thousands of companies and candidates already using OnboardDEV
              for project-based evaluation. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-[#B2CEC7] text-[#2D3436] font-bold text-base px-10 py-4 rounded-2xl shadow-lg hover:bg-[#c4d8d2] hover:shadow-xl transition-all duration-200"
              >
                Join OnboardDEV — It&apos;s Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-up?role=company"
                className="flex items-center gap-2 bg-white/10 text-white font-semibold text-base px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                For Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
