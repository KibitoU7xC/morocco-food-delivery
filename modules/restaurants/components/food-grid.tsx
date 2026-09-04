'use client';

import React from 'react';
import FoodCard from './food-card';
import { FoodProductItem } from '../restaurants.types';

interface FoodGridProps {
  foods: FoodProductItem[];
  isLoading: boolean;
  onResetFilters: () => void;
  selectedCategoryName?: string | null;
  onAddedToCart?: (food: FoodProductItem) => void;
}

export default function FoodGrid({
  foods,
  isLoading,
  onResetFilters,
  selectedCategoryName,
  onAddedToCart,
}: FoodGridProps) {
  if (isLoading) {
    return (
      <section
        aria-label="Loading food items"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 space-y-3 animate-pulse">
            <div className="w-full aspect-[4/3] rounded-xl bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            <div className="h-3 bg-gray-100 rounded-md w-1/2" />
            <div className="pt-2 flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded-md w-16" />
              <div className="h-8 bg-gray-200 rounded-xl w-20" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="w-full py-12 px-4 flex flex-col items-center justify-center text-center bg-amber-50/40 rounded-3xl border border-dashed border-amber-200 mb-12">
        <div className="w-14 h-14 rounded-full bg-amber-100/70 flex items-center justify-center text-amber-600 mb-3 shadow-2xs">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#1c1c24]">
          {selectedCategoryName
            ? `No food items found in "${selectedCategoryName}"`
            : 'No food items found'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mt-1 leading-relaxed">
          There are currently no active dishes available under this category in the API database. Try switching categories or clearing your active filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 rounded-full bg-[#1c1c24] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          View All Food Dishes
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Available Food Dishes"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
      data-purpose="food-dishes-grid"
    >
      {foods.map((food, index) => (
        <FoodCard
          key={food.id}
          food={food}
          onAddedToCart={onAddedToCart}
          priority={index < 2}
        />
      ))}
    </section>
  );
}
