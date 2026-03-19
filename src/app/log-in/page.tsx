"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { axiosClient } from "@/lib/axiosClient";

function LogInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setJustRegistered(true);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosClient.post("/api/log-in", form);
      const data = res.data;

      console.log("data", data)

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
            Welcome back
          </h1>
          <p className="text-sm text-[#2D3436]/50">
            Sign in to continue to OnboardDEV
          </p>
        </div>

        {/* Registered success banner */}
        {justRegistered && (
          <div className="flex items-center gap-3 bg-[#B2CEC7]/20 border border-[#B2CEC7] text-[#2D3436] text-sm px-4 py-3 rounded-xl mb-6">
            <CheckCircle2 className="w-4 h-4 text-[#B2CEC7] flex-shrink-0" />
            Account created! Sign in to get started.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#2D3436] uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-[#2D3436]/40 hover:text-[#2D3436] transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                minLength={6}
                placeholder="Your password"
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
            id="login-submit"
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#2D3436] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#2D3436]/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#2D3436]/30 font-medium">or</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Sign up CTA */}
        <Link
          href="/sign-up"
          className="w-full flex items-center justify-center bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] font-semibold text-sm py-3.5 rounded-xl hover:border-[#B2CEC7] hover:bg-[#D6D1F5]/10 transition-all duration-200"
        >
          Create a new account
        </Link>
      </div>

      {/* Back to landing */}
      <p className="text-center text-xs text-[#2D3436]/30 mt-5">
        <Link href="/" className="hover:text-[#2D3436]/60 transition-colors underline">
          ← Back to OnboardDEV
        </Link>
      </p>
    </div>
  );
}

export default function LogInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFB] px-4 py-16">
      <Suspense fallback={
        <div className="w-full max-w-md animate-pulse">
          <div className="h-10 bg-[#E2E8F0] rounded-2xl mb-8 mx-auto w-32" />
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 h-96" />
        </div>
      }>
        <LogInForm />
      </Suspense>
    </div>
  );
}
