'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SortOption } from '../restaurants.types';

interface RestaurantFiltersProps {
  totalCount: number;
  foodCount: number;
  district: string;
  selectedCategoryName: string | null;
  viewMode: 'all' | 'dishes' | 'restaurants';
  onViewModeChange: (mode: 'all' | 'dishes' | 'restaurants') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  fastDelivery: boolean;
  onToggleFastDelivery: () => void;
  rating4Plus: boolean;
  onToggleRating4Plus: () => void;
  pureVeg: boolean;
  onTogglePureVeg: () => void;
  halalOnly: boolean;
  onToggleHalalOnly: () => void;
  offersOnly: boolean;
  onToggleOffersOnly: () => void;
  under50MAD: boolean;
  onToggleUnder50MAD: () => void;
  onClearAllFilters: () => void;
  activeFilterCount: number;
}

export default function RestaurantFilters({
  totalCount,
  foodCount,
  district,
  selectedCategoryName,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  fastDelivery,
  onToggleFastDelivery,
  rating4Plus,
  onToggleRating4Plus,
  pureVeg,
  onTogglePureVeg,
  halalOnly,
  onToggleHalalOnly,
  offersOnly,
  onToggleOffersOnly,
  under50MAD,
  onToggleUnder50MAD,
  onClearAllFilters,
  activeFilterCount,
}: RestaurantFiltersProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Relevance (Default)', value: 'relevance' },
    { label: 'Delivery Time', value: 'delivery_time' },
    { label: 'Rating: High to Low', value: 'rating' },
    { label: 'Cost: Low to High', value: 'cost_low' },
    { label: 'Cost: High to Low', value: 'cost_high' },
  ];

  const getSortDisplayLabel = (opt: SortOption) => {
    switch (opt) {
      case 'cost_low':
        return 'Cost: Low to High';
      case 'cost_high':
        return 'Cost: High to Low';
      case 'delivery_time':
        return 'Delivery Time';
      case 'rating':
        return 'Rating';
      default:
        return 'Relevance';
    }
  };

  return (
    <section className="mb-8" data-purpose="listing-header">
      {/* Title and View Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-[22px] sm:text-[24px] md:text-[25px] font-extrabold text-[#1c1c24] tracking-tight">
            {selectedCategoryName
              ? `${selectedCategoryName} delivery in ${district.split(',')[0]}`
              : `Food & Restaurants in ${district.split(',')[0]}`}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing <strong className="text-gray-900 font-bold">{foodCount}</strong> {foodCount === 1 ? 'dish' : 'dishes'} and{' '}
            <strong className="text-gray-900 font-bold">{totalCount}</strong> restaurant {totalCount === 1 ? 'partner' : 'partners'} from live API
          </p>
        </div>

        {/* View Mode Toggle: All / Dishes / Restaurants */}
        <div className="inline-flex p-1 bg-gray-100 rounded-xl shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Items ({foodCount + totalCount})
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('dishes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'dishes'
                ? 'bg-white text-amber-700 shadow-2xs'
                : 'text-gray-600 hover:text-amber-700'
            }`}
          >
            Dishes ({foodCount})
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('restaurants')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'restaurants'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Restaurants ({totalCount})
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 mt-4 text-sm font-medium text-gray-700">
        {/* Sort By Dropdown Pill */}
        <div className="relative inline-block" ref={sortRef}>
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-colors cursor-pointer ${
              sortBy !== 'relevance'
                ? 'border-[#F5B301] bg-amber-50 text-amber-800 font-bold ring-1 ring-[#F5B301]'
                : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span>Sort By</span>
            <span className="text-xs text-amber-600 font-bold">
              • {getSortDisplayLabel(sortBy)}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${
                sortOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sortOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSortChange(opt.value);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs md:text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    sortBy === opt.value
                      ? 'font-bold text-amber-600 bg-amber-50/70'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && (
                    <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fast Delivery Pill */}
        <button
          type="button"
          onClick={onToggleFastDelivery}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            fastDelivery
              ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>Fast Delivery (&lt;25 mins)</span>
          {fastDelivery && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Pure Veg Pill */}
        <button
          type="button"
          onClick={onTogglePureVeg}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            pureVeg
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${pureVeg ? 'bg-white' : 'bg-emerald-600'}`} />
          <span>Pure Veg</span>
          {pureVeg && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Ratings 4.0+ Pill */}
        <button
          type="button"
          onClick={onToggleRating4Plus}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            rating4Plus
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>★ Ratings 4.0+</span>
          {rating4Plus && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Offers Pill */}
        <button
          type="button"
          onClick={onToggleOffersOnly}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            offersOnly
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>🏷️ Offers</span>
          {offersOnly && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Less than 50 MAD Pill */}
        <button
          type="button"
          onClick={onToggleUnder50MAD}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            under50MAD
              ? 'bg-purple-600 text-white border-purple-600 shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>Under 50 MAD</span>
          {under50MAD && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* 100% Halal Pill */}
        <button
          type="button"
          onClick={onToggleHalalOnly}
          className={`px-3.5 py-2 rounded-full border shadow-xs text-xs md:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            halalOnly
              ? 'bg-teal-700 text-white border-teal-700 shadow-xs font-bold'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>100% Halal</span>
          {halalOnly && <span className="text-[10px] ml-0.5">✕</span>}
        </button>

        {/* Clear All Filters button if any are active */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAllFilters}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer flex items-center gap-1 shadow-2xs"
          >
            <span>Reset filters ({activeFilterCount})</span>
            <span>✕</span>
          </button>
        )}
      </div>
    </section>
  );
}
