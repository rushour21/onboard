"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Loader2, UserRound, Building2 } from "lucide-react";
import { axiosClient } from "@/lib/axiosClient";

type Role = "candidate" | "company";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body: Record<string, string> = {
      name: form.name,
      email: form.email,
      password: form.password,
      role,
    };
    if (role === "company") body.organization = form.organization;

    try {
      const res = await axiosClient.post("/api/sign-up", body);
      const data = res.data;

      // Redirect based on role
      if (data.role === "company") {
        router.push("/dashboard/company");
      } else {
        router.push("/jobs");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFB] px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10 group w-fit mx-auto">
          <div className="w-9 h-9 rounded-xl bg-[#2D3436] flex items-center justify-center group-hover:bg-[#B2CEC7] transition-colors duration-300">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[#2D3436] font-extrabold text-xl tracking-tight">
            Onboard<span className="text-[#B2CEC7]">DEV</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-[#2D3436] tracking-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-sm text-[#2D3436]/50">
              Join OnboardDEV and get hired on your skills
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex gap-2 bg-[#F9FBFB] rounded-2xl p-1.5 mb-7 border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                role === "candidate"
                  ? "bg-[#2D3436] text-white shadow-sm"
                  : "text-[#2D3436]/50 hover:text-[#2D3436]"
              }`}
            >
              <UserRound className="w-4 h-4" />
              I&apos;m a Candidate
            </button>
            <button
              type="button"
              onClick={() => setRole("company")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                role === "company"
                  ? "bg-[#2D3436] text-white shadow-sm"
                  : "text-[#2D3436]/50 hover:text-[#2D3436]"
              }`}
            >
              <Building2 className="w-4 h-4" />
              I&apos;m a Company
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                placeholder="your name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
              />
            </div>

            {/* Organization — only for company */}
            {role === "company" && (
              <div>
                <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                  Organization Name
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  placeholder="Acme Corp"
                  value={form.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D3436]/40 hover:text-[#2D3436] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#2D3436] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#2D3436]/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-[#2D3436]/50 mt-6">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="font-semibold text-[#2D3436] hover:text-[#B2CEC7] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Terms note */}
        <p className="text-center text-xs text-[#2D3436]/30 mt-5">
          By creating an account, you agree to our{" "}
          <a href="#" className="underline hover:text-[#2D3436]/60">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-[#2D3436]/60">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
