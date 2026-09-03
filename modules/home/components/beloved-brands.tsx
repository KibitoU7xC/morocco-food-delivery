'use client';

import React, { useState, useEffect } from 'react';
import { getBelovedBrands } from '../home.api';
import { RestaurantBrand } from '../home.types';

export default function BelovedBrands() {
  const [brands, setBrands] = useState<RestaurantBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<RestaurantBrand | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadBrands() {
      try {
        const data = await getBelovedBrands();
        if (isMounted) {
          setBrands(data);
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    }
    loadBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    'All',
    'Burgers',
    'Bakery',
    'Crispy Chicken',
    'Market',
    'Pizza',
    'Authentic Moroccan',
    'Japanese',
    'Ice Cream',
    'Discount Mart',
  ];

  const filteredBrands =
    activeCategory === 'All'
      ? brands
      : brands.filter(
        (b) =>
          b.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          activeCategory.toLowerCase().includes(b.category.toLowerCase())
      );

  return (
    <section id="beloved-brands" className="w-full py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5906e7]">
            Local &amp; Global Favorites
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19181f] mt-1">
            Beloved brands in your area
          </h2>
        </div>
        <p className="text-sm text-[#54525d] font-medium">
          Over 500 verified kitchens and stores available right now.
        </p>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${activeCategory === cat
              ? 'bg-[#5906e7] text-white shadow-xs scale-102'
              : 'bg-white text-[#54525d] hover:text-[#19181f] border border-[#e6e2ea] hover:border-[#5906e7]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brands Grid (Matching Screenshot: 2 columns on mobile, 3 on tablet, 5 on desktop) */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-3" />
              <div className="h-4 w-20 bg-gray-200 rounded-sm mb-1.5" />
              <div className="h-3 w-16 bg-gray-100 rounded-sm" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className="group flex flex-col items-center text-center transition-all cursor-pointer select-none"
            >
              {/* Circular Avatar */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-[#f7f5fa] flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:shadow-md transition-all duration-300 shadow-2xs border border-[#e6e2ea]/60">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Brand Name */}
              <span className="mt-3 text-sm font-bold text-[#19181f] group-hover:text-[#d99700] transition-colors">
                {brand.name}
              </span>

              {/* Cuisine & Delivery Time */}
              <span className="text-xs text-[#54525d] font-medium mt-0.5">
                {brand.category} • {brand.delivery_time}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Quick-View Modal for Brand */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-[#e4e1ea] relative text-center animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedBrand(null)}
              className="absolute top-4 right-4 text-[#9e9aa8] hover:text-[#19181f] w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            {/* Brand Logo & Name */}
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 p-1 bg-[#f7f5fa] border border-[#e6e2ea]">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h3 className="text-xl font-extrabold text-[#19181f]">{selectedBrand.name}</h3>
            <p className="text-xs text-[#54525d] mt-1 font-medium leading-relaxed">
              {selectedBrand.description}
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-2xl bg-[#f7f5fa] border border-[#e6e2ea]/70">
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
              className="w-full py-3 px-5 rounded-2xl bg-[#5906e7] hover:bg-[#4502b8] text-white text-sm font-bold shadow-md shadow-[#5906e7]/25 transition cursor-pointer"
            >
              View Menu &amp; Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
