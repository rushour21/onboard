"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosClient";
import {
  Zap,
  Loader2,
  User,
  Briefcase,
  FileText,
  LogOut,
  MapPin,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    organization: string;
    location: string;
  };
  status: "applied" | "under_review" | "interview" | "accepted" | "rejected";
  githubLink: string;
  linkedinLink: string;
  resumeLink: string;
  coverLetter?: string;
  projectExplanation: string;
  techStack: string[];
  createdAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization?: string;
}

interface JobsResponse {
  success: boolean;
  jobs: Array<{
    _id: string;
    title: string;
    organization: string;
    location: string;
    salary?: string;
    jobType?: string;
  }>;
  message?: string;
}

interface MyApplicationsResponse {
  success: boolean;
  applications: Application[];
  message?: string;
}

interface MeResponse {
  success: boolean;
  user: UserProfile;
  message?: string;
}

export default function CandidateDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<JobsResponse["jobs"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, appsRes, jobsRes] = await Promise.all([
          axiosClient.get<MeResponse>("/api/me"),
          axiosClient.get<MyApplicationsResponse>("/api/applications/my"),
          axiosClient.get<JobsResponse>("/api/jobs"),
        ]);

        if (meRes.data?.success) setUser(meRes.data.user);
        if (appsRes.data?.success) setApplications(appsRes.data.applications || []);
        if (jobsRes.data?.success) setJobs(jobsRes.data.jobs || []);

        setLoading(false);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          router.push("/log-in");
          return;
        }
        setError(err?.response?.data?.message || "Network error. Please check your connection.");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axiosClient.post("/api/log-out");
      router.push("/log-in");
    } catch {
      console.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "under_review":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "interview":
        return <Clock className="w-4 h-4 text-purple-500" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      applied: "Applied",
      under_review: "Under Review",
      interview: "Interview",
      accepted: "Accepted",
      rejected: "Rejected",
    };
    return labels[status] || status;
  };

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
                Skill<span className="text-[#B2CEC7]">Hire</span>
              </span>
            </Link>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-20 bg-[#E2E8F0] rounded-2xl" />
            <div className="h-64 bg-[#E2E8F0] rounded-2xl" />
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
              Skill<span className="text-[#B2CEC7]">Hire</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/jobs"
              className="text-sm font-semibold text-[#2D3436] hover:text-[#B2CEC7] transition-colors"
            >
              Browse Jobs
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-sm font-semibold text-[#2D3436] hover:text-red-600 transition-colors disabled:opacity-60"
            >
              {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2D3436] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[#2D3436]">
                {user?.name || "Candidate"}
              </h1>
              <p className="text-sm text-[#2D3436]/50">
                {user?.email || "candidate@example.com"}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#B2CEC7]/20 border border-[#B2CEC7] text-[#2D3436] text-xs font-semibold px-3 py-1.5 rounded-lg">
                Candidate
              </span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">
            My Applications
          </h2>
          <p className="text-sm text-[#2D3436]/50">
            Track the status of your job applications
          </p>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#2D3436]">Open Jobs</h3>
              
            </div>
            <Link
              href="/jobs"
              className="text-sm font-semibold text-[#2D3436] hover:text-[#B2CEC7] transition-colors"
            >
              View all
            </Link>
          </div>
          {jobs.length === 0 ? (
            <p className="text-sm text-[#2D3436]/50">No open jobs found.</p>
          ) : (
            <div className="grid gap-3">
              {jobs.slice(0, 4).map((job) => (
                <Link
                  key={job._id}
                  href={`/jobs/${job._id}`}
                  className="block rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] px-4 py-3 hover:border-[#B2CEC7] hover:bg-[#B2CEC7]/10 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#2D3436]">{job.title}</p>
                      <p className="text-xs text-[#2D3436]/50">
                        {job.organization} • {job.location}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#2D3436]/40" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
            <Briefcase className="w-12 h-12 text-[#E2E8F0] mx-auto mb-4" />
            <p className="text-[#2D3436]/50 text-sm mb-4">
              You haven&apos;t applied to any jobs yet
            </p>
            <Link
              href="/jobs"
              className="inline-block bg-[#2D3436] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#2D3436]/90 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#B2CEC7] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#2D3436]">
                        {app.jobId.title}
                      </h3>
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#F9FBFB] border border-[#E2E8F0]">
                        {getStatusIcon(app.status)}
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#2D3436]/50 mb-3">
                      <Building2 className="w-4 h-4" />
                      <span>{app.jobId.organization}</span>
                      <span className="mx-1">•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{app.jobId.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.techStack.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] text-xs px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#2D3436]/40">
                      <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                      {app.githubLink && (
                        <a
                          href={app.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#2D3436]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          GitHub
                        </a>
                      )}
                      {app.linkedinLink && (
                        <a
                          href={app.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#2D3436]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/jobs/${app.jobId._id}`}
                    className="flex items-center gap-2 bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] text-sm font-medium px-4 py-2 rounded-xl hover:border-[#B2CEC7] hover:bg-[#B2CEC7]/10 transition-all flex-shrink-0"
                  >
                    View Job
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
