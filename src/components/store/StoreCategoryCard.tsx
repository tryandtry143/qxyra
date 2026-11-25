'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface StoreCategoryCardProps {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  subcategories: { name: string; href: string }[];
  itemCount?: number;
}

export function StoreCategoryCard({
  title,
  subtitle,
  href,
  image,
  subcategories,
  itemCount,
}: StoreCategoryCardProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn(
      "relative group overflow-hidden rounded-3xl border shadow-xl transition-all duration-500",
      isLight 
        ? "bg-white border-stone-200 shadow-stone-200/50" 
        : "bg-[#0B101A] border-white/10 hover:border-amber-400/40"
    )}>
      {/* Editorial Image Hero Area */}
      <div className="luxury-media-card relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="absolute top-4 right-4 z-10">
          {itemCount != null && (
            <span className="text-[11px] font-mono bg-black/70 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full backdrop-blur-md font-semibold">
              {itemCount} Haute Pieces
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold block">
            Maison Department
          </span>
          <Link href={href}>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white hover:text-amber-300 transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 max-w-lg font-light">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Subcategory Navigation Drawer */}
      <div className={cn(
        "p-6 border-t space-y-3 transition-colors",
        isLight ? "bg-stone-50 border-stone-200" : "bg-[#070A0F] border-white/10"
      )}>
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-mono font-semibold block",
          isLight ? "text-stone-500" : "text-gray-400"
        )}>
          Explore Subcategories:
        </span>
        <div className="flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border text-xs transition-all flex items-center gap-1.5 font-medium",
                isLight 
                  ? "bg-white hover:bg-amber-50 border-stone-200 hover:border-amber-400 text-stone-800 shadow-sm" 
                  : "bg-black/50 hover:bg-black/80 border-white/10 hover:border-amber-400 text-gray-300 hover:text-white"
              )}
            >
              <span>{sub.name}</span>
              <span className={isLight ? "text-amber-600 text-[10px]" : "text-amber-400 text-[10px]"}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
