'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';

export function StoreBanner() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "relative p-6 sm:p-14 rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden space-y-5",
        isLight
          ? "bg-white border-stone-200 text-slate-900 shadow-stone-200/60"
          : "bg-[#0C111C] border-white/10 text-white"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span
          className={cn(
            "text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold",
            isLight ? "text-amber-700" : "text-amber-300"
          )}
        >
          The Maison Catalog
        </span>
      </div>

      <div className="space-y-2 max-w-3xl">
        <h1
          className={cn(
            "text-3xl sm:text-5xl font-serif font-light tracking-tight leading-tight",
            isLight ? "text-slate-900" : "text-white"
          )}
        >
          MAISON{' '}
          <span className={cn("italic font-normal", isLight ? "text-amber-700" : "text-amber-300")}>
            {BRAND_NAME}
          </span>
        </h1>
        <p
          className={cn(
            "text-xs sm:text-sm leading-relaxed font-light",
            isLight ? "text-slate-600" : "text-gray-300"
          )}
        >
          Italian tailoring mastery, floral Grasse extraits, and horological craftsmanship united in one mixed catalog.
        </p>
      </div>

      {/* Symmetrical 2x2 Grid on Mobile -> Row on Desktop */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-1">
        <Link
          href="/store"
          className="px-4 sm:px-5 py-2.5 rounded-xl sm:rounded bg-amber-400 text-black text-[11px] sm:text-xs uppercase tracking-wider font-semibold hover:bg-amber-300 transition-colors shadow text-center"
        >
          All Items
        </Link>
        <Link
          href="/clothings"
          className={cn(
            "px-4 sm:px-5 py-2.5 rounded-xl sm:rounded border text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all text-center",
            isLight
              ? "bg-stone-100 hover:bg-stone-200 text-slate-900 border-stone-300"
              : "bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-amber-400"
          )}
        >
          Clothings
        </Link>
        <Link
          href="/perfume"
          className={cn(
            "px-4 sm:px-5 py-2.5 rounded-xl sm:rounded border text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all text-center",
            isLight
              ? "bg-stone-100 hover:bg-stone-200 text-slate-900 border-stone-300"
              : "bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-amber-400"
          )}
        >
          Perfume
        </Link>
        <Link
          href="/watches"
          className={cn(
            "px-4 sm:px-5 py-2.5 rounded-xl sm:rounded border text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all text-center",
            isLight
              ? "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900"
              : "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300"
          )}
        >
          Watches
        </Link>
      </div>
    </div>
  );
}
