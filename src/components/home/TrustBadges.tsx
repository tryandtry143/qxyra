'use client';

export function TrustBadges() {
  const badges = [
    {
      icon: "✨",
      title: "Bespoke Engraving",
      description: "Complimentary laser engraving on all flacons"
    },
    {
      icon: "📦",
      title: "White-Glove Delivery",
      description: "Complimentary worldwide on orders over $250"
    },
    {
      icon: "🛡️",
      title: "100% Noble Authenticity",
      description: "Certified pure extraits distilled in Grasse"
    },
    {
      icon: "⚜️",
      title: "Private Concierge",
      description: "Direct client styling & scent consultation"
    }
  ];

  return (
    <section className="py-14 border-b border-white/10 bg-[#06090F] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-[#0B101A] border border-white/5 hover:border-amber-400/30 transition-colors">
              <span className="text-2xl mb-2">{badge.icon}</span>
              <h3 className="font-serif font-medium text-white text-sm sm:text-base mb-1 tracking-wide">{badge.title}</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
