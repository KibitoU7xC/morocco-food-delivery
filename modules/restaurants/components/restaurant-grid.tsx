'use client';

import React from 'react';
import RestaurantCard from './restaurant-card';
import { RestaurantItem } from '../restaurants.types';

interface RestaurantGridProps {
  restaurants: RestaurantItem[];
  isLoading: boolean;
  onResetFilters: () => void;
}

export default function RestaurantGrid({
  restaurants,
  isLoading,
  onResetFilters,
}: RestaurantGridProps) {
  if (isLoading) {
    return (
      <section
        aria-label="Loading Restaurants"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col animate-pulse">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200" />
            <div className="pt-3 px-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded-md w-3/4" />
              <div className="h-4 bg-gray-200 rounded-md w-1/2" />
              <div className="h-3.5 bg-gray-100 rounded-md w-2/3" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-gray-50/70 rounded-3xl border border-dashed border-gray-300">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4 shadow-xs">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#1c1c24]">
          No restaurants found
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mt-1.5 leading-relaxed">
          We couldn&apos;t find any restaurant matching your current search or active filters. Try searching for a different dish, cuisine, or clearing your filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-5 px-5 py-2.5 rounded-full bg-[#1c1c24] hover:bg-black text-white text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Available Restaurants"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10"
      data-purpose="restaurant-grid"
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  );
}
