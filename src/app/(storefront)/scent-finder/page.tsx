'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME } from '@/lib/constants';

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    match: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What atmosphere speaks to your soul?",
    subtitle: "Select the setting where you feel most magnetic.",
    options: [
      {
        label: "A Midnight Speakeasy & Grand Opera",
        description: "Dark woods, flickering candlelight, velvet curtains, and aged spirits.",
        match: "nocturne",
      },
      {
        label: "A Sunlit Mediterranean Terrace at Golden Hour",
        description: "Warm amber dusk, coastal citrus groves, and sweet toasted resins.",
        match: "amber",
      },
      {
        label: "A Private Art Salon in Florence",
        description: "Powder-soft suede, rare parchment, iris blooms, and quiet intellectual sensuality.",
        match: "iris",
      },
    ],
  },
  {
    id: 2,
    question: "What sillage projection do you desire?",
    subtitle: "How would you like your fragrance to announce your presence?",
    options: [
      {
        label: "Regal & Commanding (24+ Hours)",
        description: "An indelible signature that lingers on cashmere long after you have departed.",
        match: "nocturne",
      },
      {
        label: "Warm & Enveloping (12 - 16 Hours)",
        description: "An intimate aura of amber and tonka that draws people inexorably closer.",
        match: "amber",
      },
      {
        label: "Sophisticated & Tactile (8 - 12 Hours)",
        description: "A refined skin scent of suede and orris butter that whispers elegance.",
        match: "iris",
      },
    ],
  },
  {
    id: 3,
    question: "Which sensory note family captivates you?",
    subtitle: "Your innate aromatic preference.",
    options: [
      {
        label: "Smoky Oud, Damask Rose & Frankincense",
        description: "Noble resins and sacred wood with intoxicating depth.",
        match: "nocturne",
      },
      {
        label: "Sunlit Bergamot, Tonka Bean & Bourbon Amber",
        description: "Luminous warmth with a balsamic, honeyed finish.",
        match: "amber",
      },
      {
        label: "Crimson Saffron, White Suede & Florentine Orris",
        description: "Tactile, buttery floral leather of unmatched rarity.",
        match: "iris",
      },
    ],
  },
];

const resultsData: Record<string, {
  name: string;
  concentration: string;
  price: string;
  slug: string;
  image: string;
  description: string;
  notes: string[];
}> = {
  nocturne: {
    name: "Nocturne Oud Extrait de Parfum",
    concentration: "38% Pure Extrait • 100ml",
    price: "$340",
    slug: "nocturne-oud-extrait",
    image: "/images/perfume_pdp.jpg",
    description: "Your match is the crowning masterpiece of Maison QXYRA. 20-year naturally aged wild Cambodian Agarwood combined with Bulgarian Damask Rose and sacred smoked saffron.",
    notes: ["Calabrian Bergamot", "Smoked Saffron", "Bulgarian Rose", "Cambodian Oud", "Bourbon Amber"],
  },
  amber: {
    name: "Ambér Impérial Eau De Parfum",
    concentration: "28% Intense EDP • 100ml",
    price: "$280",
    slug: "amber-imperial",
    image: "/images/perfume_pdp.jpg",
    description: "Your match is a radiant sun-drenched golden elixir. Luminous candied bergamot and tonka bean enveloped in fossilized golden amber and bourbon vanilla.",
    notes: ["Italian Mandarin", "Cardamom", "Tonka Bean", "Benzoin Siam", "Fossilized Amber"],
  },
  iris: {
    name: "Velvet Iris & Smoked Saffron",
    concentration: "32% Extrait de Parfum • 100ml",
    price: "$295",
    slug: "velvet-iris-saffron",
    image: "/images/perfume_pdp.jpg",
    description: "Your match is a tactile ode to Florentine elegance. 3-year aged Orris Butter layered over white suede, dark cocoa nibs, and crimson saffron threads.",
    notes: ["Crimson Saffron", "Florentine Orris", "Violet Leaf", "White Suede", "Smoky Birch"],
  },
};

export default function ScentFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ nocturne: 0, amber: 0, iris: 0 });
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleSelectOption = (match: string) => {
    const updated = { ...scores, [match]: scores[match] + 1 };
    setScores(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top match
      const highest = Object.keys(updated).reduce((a, b) => updated[a] > updated[b] ? a : b);
      setResultKey(highest);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ nocturne: 0, amber: 0, iris: 0 });
    setResultKey(null);
  };

  const result = resultKey ? resultsData[resultKey] : null;

  return (
    <div className="min-h-screen bg-[#070A0F] text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
              Maison {BRAND_NAME} Consultation
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
            The Interactive <span className="italic text-amber-300">Olfactory Concierge</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-lg mx-auto">
            Answer three evocative questions to reveal the bespoke botanical formulation harmonizing with your aura.
          </p>
        </div>

        {/* Quiz Flow or Result */}
        {!result ? (
          <div className="rounded-2xl border border-white/10 bg-[#0B101A] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-amber-400 transition-all duration-300" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />

            <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest pb-6 mb-6 border-b border-white/10">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span className="text-amber-400 font-mono font-medium">Step {currentStep + 1} / 3</span>
            </div>

            <div className="space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
                {questions[currentStep].question}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light">
                {questions[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.match)}
                  className="w-full text-left p-5 sm:p-6 rounded-xl bg-[#0F1624] border border-white/5 hover:border-amber-400/50 hover:bg-[#131C2E] transition-all group flex flex-col space-y-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </span>
                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select →
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-500/30 bg-[#0B101A] p-6 sm:p-12 shadow-2xl text-center space-y-8 animate-in fade-in zoom-in-95">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-widest font-semibold">
              Your Olfactory Signature
            </div>

            <div className="relative w-48 h-64 sm:w-60 sm:h-72 mx-auto rounded-xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src={result.image}
                alt={result.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
                {result.name}
              </h2>
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                {result.concentration} • {result.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed pt-2">
                {result.description}
              </p>
            </div>

            {/* Scent notes pill list */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
              {result.notes.map((n, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 font-light"
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href={`/store/${result.slug}`}
                className="px-8 py-3.5 bg-amber-400 text-black text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-amber-300 transition-all shadow-xl shadow-amber-500/20"
              >
                Acquire Flacon with Free Engraving
              </Link>
              <button
                onClick={resetQuiz}
                className="px-6 py-3.5 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium rounded hover:border-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Retake Consultation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
