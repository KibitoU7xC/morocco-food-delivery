'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { OrganicShapeTopRight, OrganicShapeTopLeft } from './organic-shapes';

const Burger3D = dynamic(() => import('./burger-3d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center bg-[#f7f5fa] rounded-2xl">
      <div className="w-10 h-10 rounded-full border-4 border-[#5906e7]/20 border-t-[#5906e7] animate-spin mb-3" />
      <span className="text-xs font-bold text-[#19181f]">Loading 3D Burger...</span>
      <span className="text-[10px] text-[#54525d] mt-0.5">Initializing Spline WebGL</span>
    </div>
  ),
});

export default function HeroSection() {
  const [address, setAddress] = useState('Maârif, Casablanca');
  const [isLocated, setIsLocated] = useState(false);

  const handleNearMe = () => {
    setIsLocated(true);
    setAddress('Near your GPS location (Casablanca)');
    setTimeout(() => setIsLocated(false), 3000);
  };

  const handleFindFood = () => {
    const el = document.getElementById('beloved-brands') || document.getElementById('explore-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-4 pb-16 lg:pt-8 lg:pb-24 bg-[#fbf8ff] overflow-hidden">
      {/* Organic Yellow Curves (Top Right & Top Left) - clearly visible behind content */}
      <OrganicShapeTopRight className="opacity-85 sm:opacity-90" />
      <OrganicShapeTopLeft className="opacity-40 sm:opacity-50" />

      {/* Subtle ambient decorative glow spheres */}
      <div className="pointer-events-none absolute -top-24 right-0 w-[480px] h-[480px] bg-amber-200/20 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-40 left-[-100px] w-[360px] h-[360px] bg-[#5906e7]/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Content: 2-column balanced grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Address Pill, Micro-perks */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            {/* Live status badge with clean white pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs text-xs font-semibold text-[#1b1b21] border border-[#e4e1ea]/60">
              <span className="w-2 h-2 rounded-full bg-[#006d43] animate-ping" />
              <span className="font-bold text-[#1b1b21]">Live in 8 Moroccan Cities</span>
              <span className="text-[#504533] font-normal">• 15–30 min avg</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.12] font-extrabold tracking-tight text-[#1b1b21]">
                Anything you crave, <br className="hidden sm:inline" />
                <span className="text-[#1b1b21]">delivered in minutes.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#1b1b21]/85 font-medium max-w-lg leading-relaxed">
                Order delicious meals from your favorite restaurants, fresh market groceries, or request quick couriers across Morocco.
              </p>
            </div>

            {/* Sleek Tactile Search Bar Pill */}
            <div className="w-full max-w-xl bg-white p-1.5 sm:p-2 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.08)] flex items-center gap-1.5 sm:gap-2 border border-[#e4e1ea]/60">
              <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-4">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5b301] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <input
                  id="hero-address-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter street or neighborhood (e.g. Gauthier, Agdal...)"
                  className="w-full min-w-0 bg-transparent text-xs sm:text-base font-semibold text-[#1b1b21] placeholder-[#9e9aa8] outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleNearMe}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#5906e7] hover:text-[#4502b8] px-2 py-1 transition-colors cursor-pointer shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-[#5906e7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m14.14 0l-1.41-1.41M6.34 6.34L4.93 4.93M12 16a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <span>{isLocated ? '✓ Located' : 'Near me'}</span>
              </button>

              <button
                type="button"
                onClick={handleFindFood}
                className="px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#5906e7] hover:bg-[#4502b8] text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 active:scale-95 cursor-pointer"
              >
                <span>Find food</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Micro perks line */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs text-[#1b1b21] font-semibold pt-1">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#006d43]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free delivery on 1st order
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#006d43]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cash or card on arrival
              </span>
            </div>
          </div>

          {/* Right Column: Free-Floating 3D Realistic Burger */}
          <div className="lg:col-span-6 relative z-20 flex items-center justify-center">
            {/* Subtle soft ambient glow behind the burger */}
            <div className="pointer-events-none absolute w-72 sm:w-[420px] h-72 sm:h-[420px] bg-gradient-to-tr from-amber-400/20 via-orange-400/15 to-[#5906e7]/10 rounded-full blur-3xl -z-10 translate-x-0 sm:translate-x-3 lg:translate-x-6" />

            <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[580px] max-w-[620px] flex items-center justify-center translate-x-0 sm:translate-x-3 lg:translate-x-6">
              {/* 3D Realistic Burger WebGL Canvas */}
              <Burger3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
