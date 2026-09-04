'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CuisineCategory } from '../restaurants.types';

interface CuisineCarouselProps {
  categories: CuisineCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export default function CuisineCarousel({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CuisineCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mb-10 pb-8 border-b border-gray-200" data-purpose="food-categories">
      {/* Top Header with Title and Scroll Arrows */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-extrabold text-[#1c1c24] tracking-tight">
            What&apos;s on your mind?
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Select a category to filter both live dishes and restaurant menus below
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95"
            aria-label="Previous categories"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95"
            aria-label="Next categories"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Circular Cuisine Avatars Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-5 sm:gap-7 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* "All Foods" pill avatar */}
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className="flex flex-col items-center group shrink-0 cursor-pointer select-none focus:outline-none"
        >
          <div
            className={`relative w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden flex flex-col items-center justify-center transition-all duration-200 ${
              selectedCategoryId === null
                ? 'border-[3px] border-[#F5B301] shadow-md scale-105'
                : 'border-[2px] border-gray-200/80 hover:border-amber-300 group-hover:scale-105 shadow-2xs'
            } bg-gradient-to-br from-[#FBBF24] via-[#F5B301] to-[#D97706] text-white`}
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mt-0.5 drop-shadow-xs">
              ALL
            </span>
          </div>
          <span
            className={`mt-2.5 text-xs md:text-[13px] font-bold transition-colors text-center truncate max-w-[85px] sm:max-w-[100px] ${
              selectedCategoryId === null ? 'text-amber-600 font-extrabold' : 'text-gray-800 group-hover:text-amber-600'
            }`}
          >
            All Food
          </span>
        </button>

        {/* API Category Circles */}
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.categoryId;

          return (
            <CuisineCategoryItem
              key={cat.id || cat.name}
              cat={cat}
              isSelected={isSelected}
              onSelect={() => onSelectCategory(isSelected ? null : cat.categoryId)}
            />
          );
        })}
      </div>
    </section>
  );
}

function CuisineCategoryItem({
  cat,
  isSelected,
  onSelect,
}: {
  cat: CuisineCategory;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imgSrc, setImgSrc] = React.useState(cat.image);

  React.useEffect(() => {
    setImgSrc(cat.image);
  }, [cat.image]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center group shrink-0 cursor-pointer select-none focus:outline-none"
    >
      {/* Perfectly fitting circular container with single direct flush border */}
      <div
        className={`relative w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden bg-amber-50/50 transition-all duration-200 ${
          isSelected
            ? 'border-[3px] border-[#F5B301] shadow-md scale-105'
            : 'border-[2px] border-gray-200/80 hover:border-amber-300 group-hover:scale-105 shadow-2xs'
        }`}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={cat.name}
            fill
            priority
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            unoptimized
            onError={() => setImgSrc('')}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-amber-600 font-black text-xl">
            <span>🍽️</span>
          </div>
        )}
      </div>
      <span
        className={`mt-2.5 text-xs md:text-[13px] font-bold transition-colors text-center truncate max-w-[85px] sm:max-w-[100px] ${
          isSelected ? 'text-amber-600 font-extrabold' : 'text-gray-800 group-hover:text-amber-600'
        }`}
      >
        {cat.name}
      </span>
    </button>
  );
}
