'use client';

import React from 'react';
import { OrganicShapeMiddleRight } from './organic-shapes';

export default function EcosystemCards() {
  return (
    <section className="relative w-full py-16 bg-[#FAF8FC] border-t border-[#e4e1ea]/60 overflow-hidden" id="explore-categories">
      {/* Organic Yellow Curve (Middle Right) - clearly visible behind cards */}
      <OrganicShapeMiddleRight className="opacity-80 sm:opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5906e7]">
            All-in-one ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19181f] mt-1">
            Anything delivered to your doorstep
          </h2>
          <p className="text-sm text-[#54525d] mt-2">
            Everything you adore about your city, transported in minutes with transparent tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Restaurants */}
          <div className="bg-white rounded-3xl p-7 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#f5b301] flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#19181f] mb-2">City's finest restaurants</h3>
              <p className="text-sm text-[#54525d] leading-relaxed mb-6">
                From artisanal tagines and wood-fired pizzas to smash burgers and fresh sashimi. Discover hot meals prepared on demand.
              </p>
            </div>
            <a
              href="#beloved-brands"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#b37a00] hover:text-[#8f6200] group"
            >
              <span>Order meals now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Card 2: Courier */}
          <div className="bg-white rounded-3xl p-7 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#5906e7] flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#19181f] mb-2">Instant courier service</h3>
              <p className="text-sm text-[#54525d] leading-relaxed mb-6">
                Left your keys behind or need urgent contracts delivered across town? A dedicated rider picks up and delivers in 20 minutes.
              </p>
            </div>
            <a
              href="#beloved-brands"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5906e7] hover:text-[#4502b8] group"
            >
              <span>Send a package</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Card 3: Grocery & Pharmacy */}
          <div className="bg-white rounded-3xl p-7 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#006d43] flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#19181f] mb-2">Groceries &amp; Pharmacy</h3>
              <p className="text-sm text-[#54525d] leading-relaxed mb-6">
                Crisp market produce, daily household essentials, baby care, and over-the-counter medicine whenever you need them.
              </p>
            </div>
            <a
              href="#beloved-brands"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006d43] hover:text-emerald-800 group"
            >
              <span>Browse supermarkets</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
