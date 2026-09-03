'use client';

import React from 'react';

/**
 * Organic Golden Yellow Shapes
 * Exactly matching the user's reference design with dual-tone warm yellow/amber curvature.
 * Strictly non-interactive (pointer-events-none), set to z-0 so it sits on top of the
 * page background but BEHIND all cards, text, and 3D elements (which have relative z-10 / z-20).
 */

export function OrganicShapeTopRight({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute top-0 right-0 w-[440px] sm:w-[580px] lg:w-[740px] h-[440px] sm:h-[580px] lg:h-[740px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="blob-top-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#F5B301" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
          <linearGradient id="blob-top-right-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Main Organic Golden Yellow Body */}
        <path
          d="M 220,0 C 235,115 180,185 110,265 C 35,345 25,430 90,500 C 160,565 260,585 365,595 L 600,600 L 600,0 Z"
          fill="url(#blob-top-right-grad)"
        />

        {/* Inner Curved Shadow Tone matching reference image */}
        <path
          d="M 340,0 C 355,120 310,200 230,285 C 165,355 155,435 210,505 C 260,550 330,580 430,595 L 600,600 L 600,0 Z"
          fill="url(#blob-top-right-shadow)"
        />
      </svg>
    </div>
  );
}

export function OrganicShapeTopLeft({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute top-0 left-0 w-[400px] sm:w-[540px] lg:w-[680px] h-[400px] sm:h-[540px] lg:h-[680px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform scale-x-[-1]"
      >
        <defs>
          <linearGradient id="blob-top-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#F5B301" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
          <linearGradient id="blob-top-left-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path
          d="M 220,0 C 235,115 180,185 110,265 C 35,345 25,430 90,500 C 160,565 260,585 365,595 L 600,600 L 600,0 Z"
          fill="url(#blob-top-left-grad)"
        />
        <path
          d="M 340,0 C 355,120 310,200 230,285 C 165,355 155,435 210,505 C 260,550 330,580 430,595 L 600,600 L 600,0 Z"
          fill="url(#blob-top-left-shadow)"
        />
      </svg>
    </div>
  );
}

export function OrganicShapeMiddleLeft({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute top-10 -left-10 w-[400px] sm:w-[540px] lg:w-[680px] h-[480px] sm:h-[620px] lg:h-[760px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="blob-mid-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5B301" />
            <stop offset="60%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="blob-mid-left-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path
          d="M 0,60 C 140,40 230,130 210,250 C 190,365 95,415 160,530 C 215,620 140,685 0,700 Z"
          fill="url(#blob-mid-left-grad)"
        />
        <path
          d="M 0,140 C 95,120 160,195 145,290 C 125,390 55,445 95,540 C 135,620 75,665 0,680 Z"
          fill="url(#blob-mid-left-shadow)"
        />
      </svg>
    </div>
  );
}

export function OrganicShapeMiddleRight({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute top-10 -right-10 w-[400px] sm:w-[540px] lg:w-[680px] h-[480px] sm:h-[620px] lg:h-[760px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform scale-x-[-1]"
      >
        <defs>
          <linearGradient id="blob-mid-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5B301" />
            <stop offset="60%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="blob-mid-right-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path
          d="M 0,60 C 140,40 230,130 210,250 C 190,365 95,415 160,530 C 215,620 140,685 0,700 Z"
          fill="url(#blob-mid-right-grad)"
        />
        <path
          d="M 0,140 C 95,120 160,195 145,290 C 125,390 55,445 95,540 C 135,620 75,665 0,680 Z"
          fill="url(#blob-mid-right-shadow)"
        />
      </svg>
    </div>
  );
}

export function OrganicShapeBottomLeft({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute bottom-0 left-0 w-[420px] sm:w-[560px] lg:w-[700px] h-[420px] sm:h-[560px] lg:h-[700px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform scale-y-[-1] scale-x-[-1]"
      >
        <defs>
          <linearGradient id="blob-bot-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#F5B301" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
          <linearGradient id="blob-bot-left-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path
          d="M 220,0 C 235,115 180,185 110,265 C 35,345 25,430 90,500 C 160,565 260,585 365,595 L 600,600 L 600,0 Z"
          fill="url(#blob-bot-left-grad)"
        />
        <path
          d="M 340,0 C 355,120 310,200 230,285 C 165,355 155,435 210,505 C 260,550 330,580 430,595 L 600,600 L 600,0 Z"
          fill="url(#blob-bot-left-shadow)"
        />
      </svg>
    </div>
  );
}

export function OrganicShapeBottomRight({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute bottom-0 right-0 w-[420px] sm:w-[560px] lg:w-[700px] h-[420px] sm:h-[560px] lg:h-[700px] z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform scale-y-[-1]"
      >
        <defs>
          <linearGradient id="blob-bot-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#F5B301" />
            <stop offset="100%" stopColor="#E5A100" />
          </linearGradient>
          <linearGradient id="blob-bot-right-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path
          d="M 220,0 C 235,115 180,185 110,265 C 35,345 25,430 90,500 C 160,565 260,585 365,595 L 600,600 L 600,0 Z"
          fill="url(#blob-bot-right-grad)"
        />
        <path
          d="M 340,0 C 355,120 310,200 230,285 C 165,355 155,435 210,505 C 260,550 330,580 430,595 L 600,600 L 600,0 Z"
          fill="url(#blob-bot-right-shadow)"
        />
      </svg>
    </div>
  );
}
