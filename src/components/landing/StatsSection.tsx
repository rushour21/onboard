const stats = [
  { value: "500+", label: "Companies Hiring" },
  { value: "12K+", label: "Candidates Placed" },
  { value: "94%", label: "Offer Acceptance Rate" },
  { value: "3×", label: "Faster than Traditional Hiring" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#2D3436] relative overflow-hidden">
      {/* Decorative accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #B2CEC7, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #D6D1F5, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-6">
              <p
                className="text-5xl md:text-6xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #B2CEC7, #D6D1F5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </p>
              <p className="text-white/50 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
