"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosClient";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Building2,
  Zap,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  List,
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
}

function JobDetailContent() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    githubLink: "",
    linkedinLink: "",
    resumeLink: "",
    coverLetter: "",
    projectExplanation: "",
    techStack: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.job);
          setIsApplied(data.isApplied || false);
        } else {
          setError(data.message || "Failed to fetch job");
        }
      } catch {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);

    try {
      const techStackArray = formData.techStack
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const res = await axiosClient.post("/api/applications", {
        jobId,
        githubLink: formData.githubLink,
        linkedinLink: formData.linkedinLink,
        resumeLink: formData.resumeLink,
        coverLetter: formData.coverLetter,
        projectExplanation: formData.projectExplanation,
        techStack: techStackArray,
      });
      const data = res.data;

      if (data.success) {
        setApplySuccess(true);
        setIsApplied(true);
        setShowForm(false);
      } else {
        if (data.message === "Already applied to this job") {
          setIsApplied(true);
        }
        setError(data.message || "Failed to submit application");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Network error. Please check your connection.";
      if (message === "Already applied to this job") setIsApplied(true);
      setError(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBFB]">
        <nav className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <Link href="/jobs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-[#2D3436]" />
              <span className="text-[#2D3436] font-semibold text-sm">Back to Jobs</span>
            </Link>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#E2E8F0] rounded w-3/4" />
            <div className="h-4 bg-[#E2E8F0] rounded w-1/2" />
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#F9FBFB]">
        <nav className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <Link href="/jobs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-[#2D3436]" />
              <span className="text-[#2D3436] font-semibold text-sm">Back to Jobs</span>
            </Link>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error || "Job not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBFB]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/jobs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-[#2D3436]" />
            <span className="text-[#2D3436] font-semibold text-sm">Back to Jobs</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#2D3436] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[#2D3436] font-extrabold text-base">
              Onboard<span className="text-[#B2CEC7]">DEV</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#2D3436] tracking-tight mb-2">
            {job.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#2D3436]/50 mb-4">
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
            <div className="flex items-center gap-1.5">
              <span className="font-medium">Experience:</span>
              <span>{job.experience}</span>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {isApplied && (
          <div className="bg-[#B2CEC7]/20 border border-[#B2CEC7] text-[#2D3436] text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-[#B2CEC7]" />
            You have already applied to this position
          </div>
        )}

        {applySuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
            <CheckCircle className="w-4 h-4" />
            Application submitted successfully!
          </div>
        )}

        {/* Main Grid */}
        <div className="grid gap-6">
          {/* Job Description */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg font-bold text-[#2D3436] mb-3">Description</h2>
            <p className="text-[#2D3436]/70 text-sm leading-relaxed mb-6">
              {job.description}
            </p>

            <h3 className="text-sm font-bold text-[#2D3436] mb-2 uppercase tracking-wider">
              Responsibilities
            </h3>
            <ul className="space-y-1.5 mb-6">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#2D3436]/70">
                  <List className="w-4 h-4 text-[#B2CEC7] flex-shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-[#2D3436] mb-2 uppercase tracking-wider">
              Requirements
            </h3>
            <ul className="space-y-1.5 mb-6">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#2D3436]/70">
                  <List className="w-4 h-4 text-[#B2CEC7] flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-[#2D3436] mb-2 uppercase tracking-wider">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] text-xs font-medium px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg font-bold text-[#2D3436] mb-2">Assessment</h2>
            <p className="text-sm text-[#2D3436]/70 mb-2">
              {job.assessmentDescription}
            </p>
            <p className="text-xs text-[#2D3436]/40">
              Due: {new Date(job.assessmentDueDate).toLocaleDateString()}
            </p>
          </div>

          {/* Apply Button / Form */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg font-bold text-[#2D3436] mb-4">Apply for this Position</h2>

            {job.status === "closed" ? (
              <div className="bg-[#E2E8F0] text-[#2D3436]/50 text-sm px-4 py-3 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-4 h-4" />
                This position is no longer accepting applications
              </div>
            ) : isApplied ? (
              <div className="bg-[#B2CEC7]/20 border border-[#B2CEC7] text-[#2D3436] text-sm px-4 py-3 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-[#B2CEC7]" />
                Application submitted
              </div>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username"
                    value={formData.githubLink}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, githubLink: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedinLink}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, linkedinLink: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Resume/Portfolio URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://your-portfolio.com"
                    value={formData.resumeLink}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, resumeLink: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you're a great fit..."
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Project Explanation
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe a relevant project you've worked on..."
                    value={formData.projectExplanation}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, projectExplanation: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D3436] mb-1.5 uppercase tracking-wider">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="React, TypeScript, Node.js..."
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, techStack: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F9FBFB] text-[#2D3436] text-sm placeholder:text-[#2D3436]/30 focus:outline-none focus:ring-2 focus:ring-[#B2CEC7] focus:border-[#B2CEC7] transition-all"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-[#F9FBFB] border border-[#E2E8F0] text-[#2D3436] font-semibold text-sm py-3 rounded-xl hover:bg-[#E2E8F0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applying}
                    className="flex-1 bg-[#2D3436] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#2D3436]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {applying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-[#2D3436] text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-[#2D3436]/90 transition-colors"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FBFB]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#E2E8F0] rounded w-3/4" />
            <div className="h-4 bg-[#E2E8F0] rounded w-1/2" />
          </div>
        </div>
      </div>
    }>
      <JobDetailContent />
    </Suspense>
  );
}
