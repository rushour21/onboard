import { Rocket, Users, ShieldCheck, Clock, BarChart2, GitBranch } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconBg, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl p-8 border border-[#E2E8F0] hover:border-[#B2CEC7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 30% 30%, #D6D1F520, transparent 70%)" }}
      />
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 className="relative text-lg font-bold text-[#2D3436] mb-3">{title}</h3>
      <p className="relative text-[#2D3436]/60 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #B2CEC7, #9dbdb6)",
    title: "Real-World Assessments",
    description:
      "Companies post actual engineering challenges — from shipping features to system design. No trick questions, just real work.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #D6D1F5, #c4bdf0)",
    title: "Skill-First Evaluation",
    description:
      "Evaluate candidates on demonstrated ability, not resume keywords. See their code, their thinking, their execution.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #E2E8F0, #d0d8e8)",
    title: "Transparent Feedback",
    description:
      "Every candidate receives structured feedback on their submission. Build a fairer hiring pipeline that respects applicants' time.",
  },
  {
    icon: <Clock className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #B2CEC7, #9dbdb6)",
    title: "Async & Flexible",
    description:
      "Candidates complete assessments on their own schedule. No coding sprints under pressure — just focused, quality work.",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #D6D1F5, #c4bdf0)",
    title: "Real-Time Tracking",
    description:
      "Follow every application from submission to decision in one dashboard. Companies and candidates always know where things stand.",
  },
  {
    icon: <GitBranch className="w-6 h-6 text-[#2D3436]" />,
    iconBg: "linear-gradient(135deg, #E2E8F0, #d0d8e8)",
    title: "GitHub Integration",
    description:
      "Candidates submit via GitHub links or file uploads. Reviewers see clean, versioned work — not garbled email attachments.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-[#F9FBFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-18">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#B2CEC7] mb-3">
            Why OnboardDEV
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#2D3436] mb-5 tracking-tight">
            A smarter way to hire
          </h2>
          <p className="text-[#2D3436]/55 text-lg max-w-xl mx-auto leading-relaxed">
            We eliminate resume bias and replace it with proof — clear, verifiable, real work.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
