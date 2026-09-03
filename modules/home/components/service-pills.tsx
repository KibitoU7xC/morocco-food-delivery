'use client';

import React from 'react';

export default function ServicePills() {
  const services = [
    {
      id: 'food',
      title: 'Food Delivery',
      subtitle: '1,200+ Menus',
      bgIcon: 'bg-amber-50 group-hover:bg-[#f5b301] text-amber-600 group-hover:text-white',
      borderHover: 'hover:border-[#f5b301]/70',
      titleHover: 'group-hover:text-[#c48700]',
      href: '#beloved-brands',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'grocery',
      title: 'Groceries',
      subtitle: '15 min to door',
      bgIcon: 'bg-emerald-50 group-hover:bg-[#006d43] text-[#006d43] group-hover:text-white',
      borderHover: 'hover:border-emerald-400',
      titleHover: 'group-hover:text-[#006d43]',
      href: '#explore-categories',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: 'courier',
      title: 'Express Courier',
      subtitle: 'Keys, packages',
      bgIcon: 'bg-purple-50 group-hover:bg-[#5906e7] text-[#5906e7] group-hover:text-white',
      borderHover: 'hover:border-purple-400',
      titleHover: 'group-hover:text-[#5906e7]',
      href: '#explore-categories',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      subtitle: '24/7 Parapharmacy',
      bgIcon: 'bg-rose-50 group-hover:bg-rose-600 text-rose-600 group-hover:text-white',
      borderHover: 'hover:border-rose-400',
      titleHover: 'group-hover:text-rose-600',
      href: '#explore-categories',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      id: 'shops',
      title: 'Shops & Gifts',
      subtitle: 'Flowers & Tech',
      bgIcon: 'bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white',
      borderHover: 'hover:border-sky-400',
      titleHover: 'group-hover:text-sky-600',
      href: '#explore-categories',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full -mt-8 sm:-mt-10 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {services.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`group bg-white rounded-2xl p-4 border border-[#e4e1ea]/80 shadow-md hover:shadow-lg ${item.borderHover} transition-all duration-200 flex items-center gap-3 cursor-pointer`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${item.bgIcon}`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-sm font-bold text-[#1b1b21] truncate transition-colors ${item.titleHover}`}
              >
                {item.title}
              </span>
              <span className="text-[11px] text-[#504533] truncate font-medium">
                {item.subtitle}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
