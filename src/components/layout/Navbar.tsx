"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#2D3436] flex items-center justify-center group-hover:bg-[#B2CEC7] transition-colors duration-300">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[#2D3436] font-extrabold text-xl tracking-tight">
              Onboard<span className="text-[#B2CEC7]" style={{ WebkitTextStroke: "0.5px #2D3436" }}>DEV</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-[#2D3436]/70 hover:text-[#2D3436] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#2D3436]/70 hover:text-[#2D3436] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-[#2D3436]/70 hover:text-[#2D3436] transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/ats-score"
              className="group relative text-sm font-bold text-[#2D3436] transition-colors flex items-center gap-1"
            >
              ATS Score <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#B2CEC7]/30 text-[9px] text-[#2D3436] group-hover:bg-[#B2CEC7] transition-colors">✨</span>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/log-in"
              className="text-sm font-semibold text-[#2D3436] hover:text-[#2D3436]/70 transition-colors px-3 py-2"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-bold bg-[#2D3436] text-white px-5 py-2.5 rounded-xl hover:bg-[#B2CEC7] hover:text-[#2D3436] transition-all duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#2D3436] hover:bg-[#E2E8F0] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-6 flex flex-col gap-4 shadow-lg">
          <Link href="#features" className="text-sm font-medium text-[#2D3436]/80 hover:text-[#2D3436]" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#2D3436]/80 hover:text-[#2D3436]" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="#testimonials" className="text-sm font-medium text-[#2D3436]/80 hover:text-[#2D3436]" onClick={() => setMenuOpen(false)}>Testimonials</Link>
          <Link href="/ats-score" className="text-sm font-bold text-[#2D3436] hover:text-[#2D3436] flex items-center justify-between" onClick={() => setMenuOpen(false)}>
            ATS Score <span className="text-[10px] bg-[#B2CEC7] px-2 py-0.5 rounded-full">NEW</span>
          </Link>
          <hr className="border-[#E2E8F0]" />
          <Link href="/log-in" className="text-sm font-semibold text-center text-[#2D3436] py-2.5 border border-[#E2E8F0] rounded-xl" onClick={() => setMenuOpen(false)}>Log In</Link>
          <Link href="/sign-up" className="text-sm font-bold text-center bg-[#2D3436] text-white py-2.5 rounded-xl" onClick={() => setMenuOpen(false)}>Get Started</Link>
        </div>
      )}
    </header>
  );
}
