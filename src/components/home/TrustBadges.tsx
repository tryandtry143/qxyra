'use client';

export function TrustBadges() {
  const badges = [
    {
      icon: "✦",
      title: "Bespoke Engraving",
      description: "Complimentary laser engraving on flacons"
    },
    {
      icon: "❖",
      title: "White-Glove Delivery",
      description: "Free worldwide on orders over $250"
    },
    {
      icon: "◈",
      title: "Noble Authenticity",
      description: "Pure extraits macerated in Grasse"
    },
    {
      icon: "⚜",
      title: "Private Concierge",
      description: "Direct styling & scent consultation"
    }
  ];

  return (
    <section className="py-10 sm:py-14 border-b border-white/10 bg-[#06090F] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3.5 sm:p-5 rounded-xl bg-[#0B101A] border border-white/5 hover:border-amber-400/30 transition-colors">
              <span className="text-lg sm:text-xl mb-1.5 text-amber-400">{badge.icon}</span>
              <h3 className="font-serif font-medium text-white text-xs sm:text-base mb-1 tracking-wide">{badge.title}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
