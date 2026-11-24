'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { BRAND_NAME } from '@/lib/constants';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: string;
}

const logoHeights = {
  sm: 26,
  md: 34,
  lg: 42,
};

export function Logo({
  className = '',
  size = 'md',
  showText = false,
  theme: explicitTheme,
}: LogoProps) {
  const { theme: contextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = explicitTheme || (mounted ? contextTheme : 'dark');
  const isLight = activeTheme === 'light';
  const heightPx = logoHeights[size];
  const widthPx = Math.round(heightPx * 3.35); // Native 727x217 ratio

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3 select-none group transition-opacity hover:opacity-90 py-1 ${className}`}
      aria-label={`${BRAND_NAME} Home`}
    >
      {/* Official QXYRA Brandmark Image with transparent background */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src={isLight ? "/images/qxyra_logo_navy.png" : "/images/qxyra_logo_white.png"}
          alt={`${BRAND_NAME} Luxury House`}
          width={widthPx}
          height={heightPx}
          priority
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {showText && (
        <div className="hidden 2xl:flex flex-col border-l border-white/15 pl-3 leading-none justify-center">
          <span className="text-[9px] tracking-[0.25em] font-medium text-amber-400 uppercase">
            HAUTE PARFUMERIE
          </span>
          <span className="text-[8px] tracking-[0.18em] font-light text-gray-400 uppercase mt-0.5">
            & BESPOKE FASHION
          </span>
        </div>
      )}
    </Link>
  );
}
