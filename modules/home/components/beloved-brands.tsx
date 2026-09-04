'use client';

import React, { useState, useEffect } from 'react';
import { getBelovedBrands, getRestaurantCategories } from '../home.api';
import { RestaurantBrand, CategoryOption } from '../home.types';

export default function BelovedBrands() {
  const [brands, setBrands] = useState<RestaurantBrand[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([{ id: null, name: 'All' }]);
  const [activeCategory, setActiveCategory] = useState<CategoryOption>({ id: null, name: 'All' });
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<RestaurantBrand | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Fetch dynamic categories on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const cats = await getRestaurantCategories();
        if (isMounted && cats.length > 0) {
          setCategories(cats);
        }
      } catch (err) {
        console.warn('Failed to load categories:', err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch restaurants dynamically whenever the active category changes
  useEffect(() => {
    let isMounted = true;
    async function loadBrands() {
      setLoading(true);
      try {
        const data = await getBelovedBrands(activeCategory.id, activeCategory.name);
        if (isMounted) {
          setBrands(data);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setBrands([]);
          setLoading(false);
        }
      }
    }
    loadBrands();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="beloved-brands" className="w-full py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5906e7]">
            Local &amp; Global Favorites
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19181f] mt-1">
            Beloved brands in your area
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#54525d] font-medium">
          {loading
            ? 'Finding verified kitchens & stores...'
            : brands.length > 0
              ? `${brands.length} verified ${brands.length === 1 ? 'kitchen or store' : 'kitchens and stores'} available.`
              : 'Discover verified kitchens and stores near you.'}
        </p>
      </div>

      {/* Filter Category Chips - High Contrast & Clearly Visible */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 pt-1 px-0.5 mb-6 sm:mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive =
            activeCategory.id === cat.id && activeCategory.name === cat.name;
          return (
            <button
              key={`${cat.id ?? 'all'}-${cat.name}`}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#5906e7] text-white border-2 border-[#5906e7] shadow-md shadow-[#5906e7]/25 scale-102'
                  : 'bg-white text-[#19181f] border-2 border-[#d5cedd] hover:border-[#5906e7] hover:text-[#5906e7] hover:bg-[#f6f2fd] shadow-xs hover:shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gray-200 mb-3" />
              <div className="h-4 w-20 bg-gray-200 rounded-sm mb-1.5" />
              <div className="h-3 w-16 bg-gray-100 rounded-sm" />
            </div>
          ))}
        </div>
      ) : brands.length === 0 ? (
        /* Empty State Placeholder - No restaurants found */
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center bg-white rounded-2xl sm:rounded-3xl border-2 border-[#e6e2ea] shadow-xs">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#5906e7]/10 text-[#5906e7] flex items-center justify-center mb-4 shadow-inner">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#19181f] mb-1.5">
            No restaurants found
          </h3>
          <p className="text-xs sm:text-sm text-[#54525d] max-w-md mb-6 font-medium leading-relaxed px-2">
            {activeCategory.name !== 'All'
              ? `There are currently no restaurants available in the "${activeCategory.name}" category.`
              : 'There are currently no restaurants available in your area.'}
          </p>
          {activeCategory.name !== 'All' && (
            <button
              type="button"
              onClick={() => setActiveCategory({ id: null, name: 'All' })}
              className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[#5906e7] hover:bg-[#4502b8] text-white transition-all cursor-pointer shadow-md shadow-[#5906e7]/25 hover:shadow-lg active:scale-95"
            >
              View All Restaurants
            </button>
          )}
        </div>
      ) : (
        /* Brands Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {brands.map((brand) => {
            const hasImage = brand.image && !imageErrors[brand.id];
            return (
              <div
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className="group flex flex-col items-center text-center transition-all cursor-pointer select-none p-2 sm:p-3 rounded-2xl hover:bg-white/70 hover:shadow-xs"
              >
                {/* Circular Avatar */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 bg-[#f7f5fa] flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:shadow-md transition-all duration-300 shadow-2xs border-2 border-[#e6e2ea]">
                  {hasImage ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      onError={() => handleImageError(brand.id)}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5906e7] to-[#803bf5] text-white font-extrabold text-lg sm:text-2xl flex items-center justify-center shadow-inner">
                      {brand.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Brand Name */}
                <span className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-bold text-[#19181f] group-hover:text-[#5906e7] transition-colors line-clamp-1">
                  {brand.name}
                </span>

                {/* Cuisine & Delivery Time */}
                <span className="text-[11px] sm:text-xs text-[#54525d] font-medium mt-0.5 line-clamp-1">
                  {brand.category} • {brand.delivery_time}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Quick-View Modal for Brand */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 xs:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-sm w-full shadow-2xl border border-[#e4e1ea] relative text-center animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedBrand(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[#9e9aa8] hover:text-[#19181f] w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            {/* Brand Logo & Name */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 p-1 bg-[#f7f5fa] border-2 border-[#e6e2ea] flex items-center justify-center">
              {selectedBrand.image && !imageErrors[selectedBrand.id] ? (
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5906e7] to-[#803bf5] text-white font-black text-2xl sm:text-3xl flex items-center justify-center">
                  {selectedBrand.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[#19181f]">{selectedBrand.name}</h3>
            <p className="text-xs text-[#54525d] mt-1 font-medium leading-relaxed">
              {selectedBrand.description}
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-2 my-4 sm:my-5 p-2.5 sm:p-3 rounded-2xl bg-[#f7f5fa] border border-[#e6e2ea]/70">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#f5b301] flex items-center justify-center gap-1">
                  ★ {selectedBrand.rating}
                </span>
                <span className="text-[10px] text-[#54525d]">Rating</span>
              </div>
              <div className="flex flex-col border-x border-[#e6e2ea]">
                <span className="text-xs font-bold text-[#19181f]">
                  {selectedBrand.delivery_time}
                </span>
                <span className="text-[10px] text-[#54525d]">Speed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#006d43]">
                  {selectedBrand.delivery_fee === 0 ? 'FREE' : `${selectedBrand.delivery_fee} MAD`}
                </span>
                <span className="text-[10px] text-[#54525d]">Delivery</span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => setSelectedBrand(null)}
              className="w-full py-3 px-5 rounded-2xl bg-[#5906e7] hover:bg-[#4502b8] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5906e7]/25 transition cursor-pointer active:scale-95"
            >
              View Menu &amp; Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
