import Link from "next/link";
import { Zap, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D3436] text-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#B2CEC7] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#2D3436]" strokeWidth={2.5} />
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                Skill<span className="text-[#B2CEC7]">Hire</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Bridging the gap between companies and candidates through practical, project-based technical assessments.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="GitHub" className="text-white/40 hover:text-[#B2CEC7] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/40 hover:text-[#B2CEC7] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-white/40 hover:text-[#B2CEC7] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Candidates</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sign-up" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Companies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sign-up?role=company" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {currentYear} SkillHire. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
