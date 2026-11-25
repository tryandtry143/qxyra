'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency, CURRENCIES } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';

interface CurrencySelectorProps {
  variant?: 'compact' | 'full' | 'pill';
  showRateBadge?: boolean;
  className?: string;
}

export function CurrencySelector({
  variant = 'compact',
  showRateBadge = true,
  className = '',
}: CurrencySelectorProps) {
  const { 
    currency, 
    setCurrency, 
    exchangeRate, 
    rates,
    isLoading, 
    lastUpdated, 
    detectedCountry,
    refreshRate 
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = mounted && theme === 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selected: Currency) => {
    setCurrency(selected);
    setIsOpen(false);
  };

  const currentMeta = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`} ref={dropdownRef}>
      {/* Live Market Rate Indicator (optional badge) */}
      {showRateBadge && (
        <div 
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono"
          title={`Live Forex Rate: 1 USD = ${currentMeta.symbol}${exchangeRate.toFixed(2)}. Auto-detected visitor region: ${detectedCountry || 'Active'}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-400 font-sans">Forex:</span>
          <span className="font-semibold text-emerald-300">
            1 USD = {currentMeta.symbol}{exchangeRate.toFixed(2)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              refreshRate();
            }}
            disabled={isLoading}
            className="ml-1 text-gray-400 hover:text-white transition-colors p-0.5 cursor-pointer"
            title="Refresh Live Exchange Rate"
          >
            <span className={`inline-block text-[10px] ${isLoading ? 'animate-spin' : ''}`}>🔄</span>
          </button>
        </div>
      )}

      {/* Currency Switcher Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border text-[10px] sm:text-xs font-medium transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
          isLight
            ? 'bg-white hover:bg-stone-100 border-stone-200 text-slate-800 shadow-xs'
            : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
        }`}
        title="Switch Display Currency (Auto-detected by visitor country)"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-xs sm:text-sm leading-none">{currentMeta.flag}</span>
        <span className="font-semibold tracking-wide">
          {currency} <span className="hidden sm:inline">({currentMeta.symbol.trim()})</span>
        </span>
        <span className="text-[8px] sm:text-[10px] opacity-60 transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-60 sm:w-64 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in duration-150 border ${
            isLight
              ? 'bg-white/98 border-stone-200 text-slate-900'
              : 'bg-[#121620]/98 border-white/15 text-white'
          }`}
        >
          <div className={`px-3 py-1.5 border-b text-[10px] uppercase tracking-wider font-semibold flex items-center justify-between ${
            isLight ? 'border-stone-100 text-slate-500' : 'border-gray-800/80 text-gray-400'
          }`}>
            <span>Select Currency</span>
            <span className="text-emerald-500 font-mono text-[9px]">Live Rates</span>
          </div>

          <div className="p-1.5 space-y-1 max-h-72 overflow-y-auto">
            {(Object.keys(CURRENCIES) as Currency[]).map((code) => {
              const item = CURRENCIES[code];
              const isSelected = currency === code;
              const rateVal = rates[code] || 1;

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-black font-semibold'
                      : isLight
                        ? 'text-slate-700 hover:bg-stone-100 hover:text-black'
                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <div className="font-medium">{code} - {item.symbol.trim()}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-black/75' : isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                  {code !== 'USD' && (
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-black font-semibold' : 'text-gray-500'}`}>
                      {rateVal.toFixed(1)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={`px-3 pt-2 pb-1 border-t text-[10px] flex items-center justify-between ${
            isLight ? 'border-stone-100 text-slate-500' : 'border-gray-800/80 text-gray-500'
          }`}>
            <span>Visitor Auto-Detect:</span>
            <span className="text-amber-500 font-medium">{detectedCountry || 'Active'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
