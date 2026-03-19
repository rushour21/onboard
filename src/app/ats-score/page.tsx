"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, RefreshCw, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function ATSAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your resume (PDF).");
      return;
    }
    if (jd.length < 100) {
      setError("Please provide a longer job description (at least 100 characters).");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jd", jd);

    try {
      const res = await axios.post("/api/resume-analyze", formData);
      setResult(res.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError((err as Error).message || "Failed to analyze resume.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto transition-all duration-500 ${result ? 'max-w-7xl' : 'max-w-4xl'}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-[#2D3436] tracking-tight mb-4">
              ATS Resume Analyzer
            </h1>
            <p className="text-lg text-[#2D3436]/70">
              Upload your resume and the job description to get instant feedback, score, and suggestions.
            </p>
          </div>

          <div className={`grid gap-8 items-start ${result ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Resume (PDF)
                  </label>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#E2E8F0] rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-[#B2CEC7] mb-2" />
                      <p className="mb-2 text-sm text-[#2D3436]/70 font-medium">
                        {file ? file.name : "Click to upload your resume (PDF)"}
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Job Description
                  </label>
                  <textarea
                    rows={6}
                    className="w-full p-4 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#B2CEC7] focus:border-transparent outline-none transition-all resize-none font-medium text-[#2D3436]"
                    placeholder="Paste the job requirements here..."
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                  />
                  <p className="text-xs text-[#2D3436]/50 mt-2 font-medium">
                    Minimum 100 characters for optimal analysis.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2D3436] text-white font-bold py-4 rounded-xl hover:bg-[#2D3436]/90 transition-all shadow-md flex justify-center items-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-[#B2CEC7]" />
                      Get ATS Score
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {result && (
            <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden p-8 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 lg:sticky lg:top-28">
              <div className="text-center border-b border-[#E2E8F0] pb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-[#B2CEC7] bg-white mb-4 relative shadow-inner">
                  <span className="text-4xl font-extrabold text-[#2D3436]">
                    {result.score}%
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#2D3436]">ATS Fit Score</h2>
                <p className="text-[#2D3436]/70 mt-2 font-medium max-w-lg mx-auto">
                  This score indicates how well your resume matches the target job description based on keywords and skills.
                </p>
              </div>



              <div className="space-y-6 pt-4">
                {result.suggestions?.missingSkills?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#B2CEC7]" /> Missing Skills to Add
                    </h3>
                    <ul className="space-y-2">
                      {result.suggestions.missingSkills.map((skill: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-[#E2E8F0]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B2CEC7] mt-2 flex-shrink-0" />
                          <span className="text-sm text-[#2D3436] font-medium leading-relaxed">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions?.improvements?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#D6D1F5]" /> General Improvements
                    </h3>
                    <ul className="space-y-2">
                      {result.suggestions.improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-[#E2E8F0]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D6D1F5] mt-2 flex-shrink-0" />
                          <span className="text-sm text-[#2D3436] font-medium leading-relaxed">{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.suggestions?.rewrittenPoints?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-[#2D3436]" /> Rewritten Points Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {result.suggestions.rewrittenPoints.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-[#E2E8F0]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2D3436] mt-2 flex-shrink-0" />
                          <span className="text-sm text-[#2D3436] font-medium leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}
