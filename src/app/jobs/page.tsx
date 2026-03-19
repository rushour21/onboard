"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Briefcase, DollarSign, Building2, Zap, Loader2, ExternalLink, User } from "lucide-react";
import { axiosClient } from "@/lib/axiosClient";

interface Job {
  _id: string;
  title: string;
  organization: string;
  location: string;
  jobType: string;
  salary: string;
  postedBy: string;
}

type MeResponse = {
  success: boolean;
  user: {
    name: string;
    email: string;
    role: "candidate" | "company";
    organization?: string;
  };
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [me, setMe] = useState<MeResponse["user"] | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [meRes, jobsRes] = await Promise.all([
          axiosClient.get<MeResponse>("/api/me"),
          axiosClient.get<{ success: boolean; jobs: Job[]; message?: string }>("/api/jobs"),
        ]);

        if (meRes.data?.success) setMe(meRes.data.user);
        if (jobsRes.data?.success) setJobs(jobsRes.data.jobs || []);
        else setError(jobsRes.data?.message || "Failed to fetch jobs");
      } catch {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBFB]">
        <nav className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#2D3436] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[#2D3436] font-extrabold text-lg">
                Onboard<span className="text-[#B2CEC7]">DEV</span>
              </span>
            </Link>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBFB]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2D3436] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[#2D3436] font-extrabold text-lg">
              Onboard<span className="text-[#B2CEC7]">DEV</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {me ? (
              <button
                type="button"
                onClick={() =>
                  router.push(me.role === "company" ? "/dashboard/company" : "/dashboard/candidate")
                }
                className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] flex items-center justify-center hover:border-[#B2CEC7] hover:bg-[#B2CEC7]/10 transition-all"
                aria-label="Open dashboard"
                title="Dashboard"
              >
                <User className="w-5 h-5 text-[#2D3436]" />
              </button>
            ) : (
              <>
                <Link href="/log-in" className="text-sm font-semibold text-[#2D3436] hover:text-[#B2CEC7] transition-colors">
                  Log In
                </Link>
                <Link href="/sign-up" className="bg-[#2D3436] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#2D3436]/90 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#2D3436] tracking-tight mb-2">
            Available Jobs
          </h1>
          <p className="text-sm text-[#2D3436]/50">
            Browse open positions and find your next opportunity
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
            <p className="text-[#2D3436]/50 text-sm">No jobs available at the moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#B2CEC7] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2D3436] mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#2D3436]/50 mb-2">
                      <Building2 className="w-4 h-4" />
                      <span>{job.organization}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-[#2D3436]/50">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/jobs/${job._id}`}
                    className="flex items-center gap-2 bg-[#2D3436] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#2D3436]/90 transition-colors flex-shrink-0"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
