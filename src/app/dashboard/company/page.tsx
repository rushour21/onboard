"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosClient";
import {
  Zap,
  Loader2,
  Building2,
  Briefcase,
  Users,
  LogOut,
  Plus,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  skills: string[];
  organization: string;
  assessmentDescription: string;
  assessmentDueDate: string;
  status: "open" | "closed";
  createdAt: string;
}

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
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

interface MeResponse {
  success: boolean;
  user: UserProfile;
  message?: string;
}

interface JobsResponse {
  success: boolean;
  jobs: Job[];
  message?: string;
}

interface CompanyApplicationsResponse {
  success: boolean;
  applications: Application[];
  message?: string;
}

type Tab = "jobs" | "applications" | "create";

export default function CompanyDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  // Create job form state
  const [creatingJob, setCreatingJob] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    skills: "",
    assessmentDescription: "",
    assessmentDueDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, jobsRes, appsRes] = await Promise.all([
          axiosClient.get<MeResponse>("/api/me"),
          axiosClient.get<JobsResponse>("/api/jobs/company"),
          axiosClient.get<CompanyApplicationsResponse>("/api/applications/company"),
        ]);

        if (meRes.data?.success) setUser(meRes.data.user);
        if (jobsRes.data?.success) setJobs(jobsRes.data.jobs || []);
        if (appsRes.data?.success) setApplications(appsRes.data.applications || []);

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

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingJob(true);

    try {
      const jobData = {
        title: jobForm.title,
        description: jobForm.description,
        requirements: jobForm.requirements.split("\n").filter((r) => r.trim()),
        responsibilities: jobForm.responsibilities.split("\n").filter((r) => r.trim()),
        location: jobForm.location,
        salary: jobForm.salary,
        jobType: jobForm.jobType,
        experience: jobForm.experience,
        skills: jobForm.skills.split(",").map((s) => s.trim()).filter((s) => s),
        organization: user?.organization || "Unknown",
        assessmentDescription: jobForm.assessmentDescription,
        assessmentDueDate: new Date(jobForm.assessmentDueDate).toISOString(),
      };

      const res = await axiosClient.post("/api/jobs", jobData);
      const data = res.data;

      if (data.success) {
        setJobs((prev) => [...prev, data.job]);
        setActiveTab("jobs");
        setJobForm({
          title: "",
          description: "",
          requirements: "",
          responsibilities: "",
          location: "",
          salary: "",
          jobType: "",
          experience: "",
          skills: "",
          assessmentDescription: "",
          assessmentDueDate: "",
        });
      } else {
        setError(data.message || "Failed to create job");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setCreatingJob(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await axiosClient.delete("/api/jobs", { data: { jobId } });
      const data = res.data;

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
      } else {
        setError(data.message || "Failed to delete job");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: "accepted" | "rejected") => {
    try {
      const res = await axiosClient.patch("/api/applications/status", { applicationId, status });
      const data = res.data;

      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        setError(data.message || "Failed to update status");
      }
    } catch {
      setError("Network error. Please check your connection.");
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
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[#2D3436]">
                {user?.organization || user?.name || "Company"}
              </h1>
              <p className="text-sm text-[#2D3436]/50">
                {user?.email || "company@example.com"}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#B2CEC7]/20 border border-[#B2CEC7] text-[#2D3436] text-xs font-semibold px-3 py-1.5 rounded-lg">
                Company
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "jobs"
                ? "bg-[#2D3436] text-white"
                : "bg-white border border-[#E2E8F0] text-[#2D3436] hover:border-[#B2CEC7]"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Posted Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "applications"
                ? "bg-[#2D3436] text-white"
                : "bg-white border border-[#E2E8F0] text-[#2D3436] hover:border-[#B2CEC7]"
            }`}
          >
            <Users className="w-4 h-4" />
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "create"
                ? "bg-[#2D3436] text-white"
                : "bg-white border border-[#E2E8F0] text-[#2D3436] hover:border-[#B2CEC7]"
            }`}
          >
            <Plus className="w-4 h-4" />
            Create Job
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">
                Posted Jobs
              </h2>
              <p className="text-sm text-[#2D3436]/50">
                Manage your job postings
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                <Briefcase className="w-12 h-12 text-[#E2E8F0] mx-auto mb-4" />
                <p className="text-[#2D3436]/50 text-sm mb-4">
                  You haven&apos;t posted any jobs yet
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="inline-block bg-[#2D3436] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#2D3436]/90 transition-colors"
                >
                  Post a Job
                </button>
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
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#2D3436]">
                            {job.title}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              job.status === "open"
                                ? "bg-green-50 border border-green-200 text-green-700"
                                : "bg-red-50 border border-red-200 text-red-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-[#2D3436]/50 mb-3">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.jobType}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.slice(0, 6).map((skill, i) => (
                            <span
                              key={i}
                              className="bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] text-xs px-2 py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[#2D3436]/40">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/jobs/${job._id}`}
                          className="flex items-center gap-2 bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] text-sm font-medium px-4 py-2 rounded-xl hover:border-[#B2CEC7] hover:bg-[#B2CEC7]/10 transition-all"
                        >
                          View
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">
                Job Applications
              </h2>
              <p className="text-sm text-[#2D3436]/50">
                Review and manage candidate applications
              </p>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                <Users className="w-12 h-12 text-[#E2E8F0] mx-auto mb-4" />
                <p className="text-[#2D3436]/50 text-sm">
                  No applications yet
                </p>
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
                            {app.userId.name}
                          </h3>
                          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#F9FBFB] border border-[#E2E8F0]">
                            {getStatusIcon(app.status)}
                            {getStatusLabel(app.status)}
                          </span>
                        </div>
                        <p className="text-sm text-[#2D3436]/50 mb-2">
                          {app.userId.email}
                        </p>
                        <p className="text-sm font-medium text-[#2D3436] mb-1">
                          Applied for: {app.jobId.title}
                        </p>
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
                        {app.coverLetter && (
                          <p className="text-sm text-[#2D3436]/70 italic mb-3">
                            &ldquo;{app.coverLetter}&rdquo;
                          </p>
                        )}
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
                          {app.resumeLink && (
                            <a
                              href={app.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-[#2D3436]"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Portfolio
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {app.status === "applied" || app.status === "under_review" ? (
                          <>
                            <button
                              onClick={() => handleUpdateApplicationStatus(app._id, "accepted")}
                              className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-green-100 transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateApplicationStatus(app._id, "rejected")}
                              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-red-100 transition-all"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-[#2D3436]/40">
                            Status: {app.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Job Tab */}
        {activeTab === "create" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#2D3436] tracking-tight mb-2">
                Create New Job
              </h2>
              <p className="text-sm text-[#2D3436]/50">
                Post a new job opening
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                      Job Title
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) =>
                        setJobForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Senior Software Engineer"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) =>
                        setJobForm((prev) => ({ ...prev, location: e.target.value }))
                      }
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={jobForm.description}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Describe the role..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                      Job Type
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.jobType}
                      onChange={(e) =>
                        setJobForm((prev) => ({ ...prev, jobType: e.target.value }))
                      }
                      placeholder="Full-time"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.salary}
                      onChange={(e) =>
                        setJobForm((prev) => ({ ...prev, salary: e.target.value }))
                      }
                      placeholder="$100,000 - $150,000"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.experience}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, experience: e.target.value }))
                    }
                    placeholder="3-5 years"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.skills}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, skills: e.target.value }))
                    }
                    placeholder="React, TypeScript, Node.js"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Requirements (one per line)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={jobForm.requirements}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, requirements: e.target.value }))
                    }
                    placeholder="Bachelor's degree in Computer Science&#10;3+ years of React experience..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Responsibilities (one per line)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={jobForm.responsibilities}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, responsibilities: e.target.value }))
                    }
                    placeholder="Develop and maintain web applications&#10;Collaborate with cross-functional teams..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Assessment Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={jobForm.assessmentDescription}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, assessmentDescription: e.target.value }))
                    }
                    placeholder="Complete a coding challenge..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Assessment Due Date
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={jobForm.assessmentDueDate}
                    onChange={(e) =>
                      setJobForm((prev) => ({ ...prev, assessmentDueDate: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={creatingJob}
                    className="w-full bg-[#2D3436] text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-[#2D3436]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {creatingJob ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Job...
                      </>
                    ) : (
                      "Create Job Posting"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
