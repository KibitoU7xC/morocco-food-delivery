'use client';

import React from 'react';
import Link from 'next/link';

export default function RestaurantServicesNav() {
  const services = [
    {
      id: 'food',
      title: 'Food Delivery',
      subtitle: '1,200+ Menus',
      href: '/restaurants',
      isActive: true,
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#ea580c]',
      icon: (
        <svg className="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'grocery',
      title: 'Groceries',
      subtitle: '15 min to door',
      href: '/grocery',
      isActive: false,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#059669]',
      icon: (
        <svg className="w-5 h-5 text-[#059669]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: 'courier',
      title: 'Express Courier',
      subtitle: 'Keys, packages',
      href: '/courier',
      isActive: false,
      iconBg: 'bg-purple-50',
      iconColor: 'text-[#7c3aed]',
      icon: (
        <svg className="w-5 h-5 text-[#7c3aed]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      subtitle: '24/7 Parapharmacy',
      href: '/pharmacy',
      isActive: false,
      iconBg: 'bg-rose-50',
      iconColor: 'text-[#e11d48]',
      icon: (
        <svg className="w-5 h-5 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      id: 'shops',
      title: 'Shops & Gifts',
      subtitle: 'Flowers & Tech',
      href: '/merchants',
      isActive: false,
      iconBg: 'bg-sky-50',
      iconColor: 'text-[#0284c7]',
      icon: (
        <svg className="w-5 h-5 text-[#0284c7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#FBBF24] via-[#F5B301] to-[#E5A100] border-b border-[#d99800] px-3 sm:px-8 py-3.5 relative shadow-xs">
      <div className="max-w-7xl mx-auto">
        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {services.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className={`rounded-2xl p-3 px-4 shadow-xs flex items-center gap-3 hover:shadow-md cursor-pointer transition-all duration-200 group ${
                s.id === 'shops' ? 'col-span-2 sm:col-span-1' : ''
              } ${
                s.isActive
                  ? 'bg-white border-2 border-[#1b1b21] shadow-md ring-2 ring-black/10 scale-[1.02]'
                  : 'bg-white/95 hover:bg-white border border-white/80'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                {s.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-[13px] sm:text-[14px] font-bold leading-tight truncate transition-colors ${
                    s.isActive
                      ? 'text-[#1b1b21]'
                      : 'text-gray-900 group-hover:text-amber-700'
                  }`}
                >
                  {s.title}
                </span>
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 truncate">
                  {s.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
