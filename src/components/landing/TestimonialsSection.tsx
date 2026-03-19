const testimonials = [
  {
    quote:
      "OnboardDEV transformed how we hire engineers. We stopped wasting time on candidates who look great on paper but can't ship — and started finding the ones who can actually do the work.",
    name: "Priya Sharma",
    role: "VP of Engineering",
    company: "ScaleAI Systems",
    initials: "PS",
    accent: "#B2CEC7",
  },
  {
    quote:
      "As a self-taught developer, my resume never did me justice. OnboardDEV let me show what I could actually build. I landed my first engineering role within three weeks.",
    name: "Marcus Webb",
    role: "Software Engineer",
    company: "NovaDev",
    initials: "MW",
    accent: "#D6D1F5",
  },
  {
    quote:
      "The quality of candidates we see is night and day compared to traditional job boards. Everyone who applies has already demonstrated they can handle the work.",
    name: "Ananya Krishnan",
    role: "Head of Talent",
    company: "Fusionworks",
    initials: "AK",
    accent: "#B2CEC7",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 bg-[#F9FBFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#B2CEC7] mb-3">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#2D3436] tracking-tight">
            Loved by teams &amp; talent alike.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group bg-white rounded-3xl p-8 border border-[#E2E8F0] hover:border-[#B2CEC7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Quote mark */}
              <span
                className="text-6xl font-black leading-none mb-4 select-none"
                style={{ color: t.accent }}
              >
                &ldquo;
              </span>

              <p className="text-[#2D3436]/70 text-sm leading-relaxed flex-1 italic">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E2E8F0]">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#2D3436] text-sm font-black flex-shrink-0"
                  style={{ background: t.accent }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#2D3436] font-bold text-sm">{t.name}</p>
                  <p className="text-[#2D3436]/45 text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
