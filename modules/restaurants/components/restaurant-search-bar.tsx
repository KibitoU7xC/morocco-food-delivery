'use client';

import React from 'react';

interface RestaurantSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export default function RestaurantSearchBar({
  value,
  onChange,
  onClear,
}: RestaurantSearchBarProps) {
  return (
    <div className="bg-white py-4 border-b border-gray-100">
      <div className="max-w-[860px] mx-auto px-4">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for restaurants and food"
            className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 bg-white text-gray-800 text-[14px] sm:text-[15px] placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs transition"
          />
          {value ? (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute right-3.5 text-gray-400 hover:text-gray-700 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              aria-label="Search"
              className="absolute right-3.5 text-gray-500 hover:text-gray-700 pointer-events-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
