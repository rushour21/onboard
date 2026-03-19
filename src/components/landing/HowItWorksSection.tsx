import { CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Company Posts a Challenge",
    description:
      "Recruiters create a job and attach a practical assessment — a real-world task relevant to the role. No generic trivia.",
    color: "#B2CEC7",
  },
  {
    number: "02",
    title: "Candidate Submits Their Work",
    description:
      "Applicants browse open roles, accept challenges they're excited about, and submit their solution via GitHub or file upload.",
    color: "#D6D1F5",
  },
  {
    number: "03",
    title: "Review & Decision",
    description:
      "Hiring teams review submissions, score them with structured criteria, and move candidates through the pipeline with full transparency.",
    color: "#E2E8F0",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Left — Steps */}
          <div className="lg:w-1/2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#B2CEC7] mb-3">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#2D3436] mb-12 tracking-tight leading-tight">
              From job post to<br /> great hire, simplified.
            </h2>

            <div className="relative flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={step.number} className="relative flex gap-6 group">
                  {/* Vertical line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[19px] top-[44px] w-[2px] h-[calc(100%-44px)] bg-[#E2E8F0]" />
                  )}

                  {/* Number bubble */}
                  <div
                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[#2D3436] text-xs font-black mt-1 shadow-sm transition-transform group-hover:scale-110 duration-200"
                    style={{ background: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pb-12">
                    <h3 className="text-xl font-bold text-[#2D3436] mb-2">{step.title}</h3>
                    <p className="text-[#2D3436]/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mock Job Card */}
          <div className="lg:w-1/2 w-full">
            <div
              className="rounded-3xl p-6 border border-[#E2E8F0]"
              style={{
                background:
                  "linear-gradient(145deg, #D6D1F520 0%, #B2CEC715 50%, #F9FBFB 100%)",
              }}
            >
              {/* Card header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-[#B2CEC7]/30 text-[#2D3436] text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Job ID: #SH-402
                    </span>
                    <h4 className="text-xl font-black text-[#2D3436]">Senior Frontend Engineer</h4>
                    <p className="text-sm text-[#2D3436]/50 mt-1">Next.js · TypeScript · TailwindCSS</p>
                  </div>
                  <span className="text-xs text-[#2D3436]/30 font-mono whitespace-nowrap pt-1">2h ago</span>
                </div>

                <div className="bg-[#F9FBFB] rounded-xl p-4 mb-4 border border-[#E2E8F0]">
                  <p className="text-xs font-bold text-[#2D3436] mb-2 uppercase tracking-wider">Assessment</p>
                  <p className="text-sm text-[#2D3436]/70 leading-relaxed">
                    Design and implement a real-time collaborative code editor with syntax highlighting and multi-room support.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 mb-5">
                  <CheckCircle2 className="w-4 h-4" />
                  Skill-based verification active
                </div>

                <button className="w-full bg-[#2D3436] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2D3436]/90 transition-colors">
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Applicants", value: "47" },
                  { label: "Due in", value: "5 days" },
                  { label: "Salary", value: "$120k+" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-[#E2E8F0]">
                    <p className="text-lg font-black text-[#2D3436]">{s.value}</p>
                    <p className="text-xs text-[#2D3436]/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
