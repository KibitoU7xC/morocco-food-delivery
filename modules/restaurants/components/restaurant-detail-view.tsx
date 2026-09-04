'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RestaurantItem, FoodProductItem, RestaurantPromoCode } from '../restaurants.types';
import { addFoodToCart, getLiveCartCount } from '../restaurants.api';

interface RestaurantDetailViewProps {
  restaurant: RestaurantItem;
  initialMenu: FoodProductItem[];
}

/**
 * Dish Image Item:
 * Purely renders the backend storage image from API.
 * If null/empty/error, displays an in-house themed SVG food icon without external URLs.
 */
function DishImageItem({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50/60 border border-amber-100/50 p-2 text-center select-none">
        <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow-xs">🍲</span>
        <span className="text-[10px] text-gray-500 font-semibold truncate max-w-[80px]">
          {name}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes="(max-width: 640px) 112px, 144px"
      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
      unoptimized
      onError={() => setError(true)}
    />
  );
}

/**
 * Restaurant Hero Banner:
 * Displays the clicked restaurant's cover image from the backend API.
 * If null or failed, renders a sleek Moroccan dark & amber card with brand typography.
 */
function RestaurantHeroBanner({
  image,
  name,
  cuisines,
  promoBadge,
}: {
  image: string;
  name: string;
  cuisines: string;
  promoBadge?: string;
}) {
  const [error, setError] = useState(false);

  if (!image || error) {
    return (
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm bg-gradient-to-br from-[#1c1c24] via-[#282c3f] to-[#14141a] mb-6 border border-gray-800 flex flex-col items-center justify-center text-white p-6 text-center select-none">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl mb-3 text-amber-400 shadow-inner">
          🏪
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{name}</h2>
        <p className="text-xs sm:text-sm text-amber-400 font-bold mt-1 uppercase tracking-wider">
          {cuisines || 'Food & Dining'}
        </p>
        {promoBadge && (
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <span className="bg-white/95 backdrop-blur-md text-[#1c1c24] px-3.5 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide shadow-md uppercase">
              {promoBadge}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm bg-gray-100 mb-6 border border-gray-100 group">
      <Image
        src={image}
        alt={name}
        fill
        priority
        sizes="(max-width: 860px) 100vw, 860px"
        className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
        unoptimized
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {promoBadge && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <span className="bg-white/95 backdrop-blur-md text-[#1c1c24] px-3.5 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide shadow-md uppercase">
            {promoBadge}
          </span>
        </div>
      )}
    </div>
  );
}

export default function RestaurantDetailView({
  restaurant,
  initialMenu,
}: RestaurantDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [, setLiveCartCount] = useState(0);

  const dealsScrollRef = useRef<HTMLDivElement | null>(null);

  // Sync initial cart count
  useEffect(() => {
    getLiveCartCount().then((cnt) => setLiveCartCount(cnt));

    const handleCartUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      if (customEvent.detail && typeof customEvent.detail.count === 'number') {
        setLiveCartCount(customEvent.detail.count);
      }
    };

    window.addEventListener('cart_updated', handleCartUpdated);
    return () => window.removeEventListener('cart_updated', handleCartUpdated);
  }, []);

  const handleDealsScroll = (dir: 'left' | 'right') => {
    if (dealsScrollRef.current) {
      const amt = dir === 'left' ? -260 : 260;
      dealsScrollRef.current.scrollBy({ left: amt, behavior: 'smooth' });
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategoryCollapse = (catName: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [catName]: !prev[catName] }));
  };

  // Add to cart with real API synchronization
  const handleAddToCart = async (dish: FoodProductItem, delta = 1) => {
    const currentQty = cartQuantities[dish.id] || 0;
    const newQty = Math.max(0, currentQty + delta);

    setCartQuantities((prev) => ({ ...prev, [dish.id]: newQty }));

    if (delta > 0) {
      setCartToast(`${dish.name} added to cart!`);
      setTimeout(() => setCartToast(null), 3000);
    }

    try {
      const res = await addFoodToCart(dish.id, delta > 0 ? delta : 1);
      setLiveCartCount(res.cartCount);
    } catch {
      // Local state is preserved
    }
  };

  // Filtered menu dishes
  const filteredMenu = useMemo(() => {
    return initialMenu.filter((dish) => {
      if (vegOnly && !dish.isVeg) return false;
      if (bestsellerOnly && !dish.isFeatured && !dish.isTrending) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesCat = dish.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [initialMenu, vegOnly, bestsellerOnly, searchQuery]);

  // Group dishes by category
  const categorizedMenu = useMemo(() => {
    const groups: Record<string, FoodProductItem[]> = {};
    for (const dish of filteredMenu) {
      const cat = dish.categoryName || 'Recommended Specialties';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(dish);
    }
    return groups;
  }, [filteredMenu]);

  const categoryNames = useMemo(() => Object.keys(categorizedMenu), [categorizedMenu]);

  const scrollToCategory = (catName: string) => {
    setIsMenuDrawerOpen(false);
    const el = document.getElementById(`category-${catName.replace(/\s+/g, '-').toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart summary for floating bottom pill
  const cartSummary = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const [idStr, qty] of Object.entries(cartQuantities)) {
      if (qty > 0) {
        count += qty;
        const found = initialMenu.find((m) => m.id === Number(idStr));
        if (found) {
          total += found.price * qty;
        }
      }
    }
    return { count, total };
  }, [cartQuantities, initialMenu]);

  const activePromoCodes: RestaurantPromoCode[] = restaurant.promoCodes || [];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#282c3f] font-sans pb-28 antialiased">
      {/* Toast Alert */}
      {cartToast && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#1c1c24] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
            ✓
          </div>
          <span className="text-sm font-semibold">{cartToast}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[860px] w-full mx-auto px-4 sm:px-6 pt-6">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href="/restaurants" className="hover:text-gray-900 transition-colors">
                Casablanca
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
              {restaurant.name}
            </li>
          </ol>
        </nav>

        {/* 2. Restaurant Main Title */}
        <div className="mb-4">
          <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#1c1c24] tracking-tight">
            {restaurant.name}
          </h1>
        </div>

        {/* 3. Hero Restaurant Image Banner (The clicked restaurant's image from backend API) */}
        <RestaurantHeroBanner
          image={restaurant.image}
          name={restaurant.name}
          cuisines={restaurant.cuisines}
          promoBadge={restaurant.promoBadge}
        />

        {/* 4. Restaurant Info Card (Swiggy-style info card below hero image) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200/80 mb-8">
          {/* Top Line: Rating & Cost for Two */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-[15px] font-bold text-gray-900">
            {restaurant.ratingCount && restaurant.ratingCount > 0 ? (
              <>
                <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-xs font-black shadow-2xs">
                  <span>★</span>
                  <span>{restaurant.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600 font-semibold">
                  ({restaurant.ratingCount} {restaurant.ratingCount === 1 ? 'rating' : 'ratings'})
                </span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-amber-600 text-white px-2 py-0.5 rounded-md text-xs font-black shadow-2xs">
                  <span>★</span>
                  <span>New</span>
                </div>
                <span className="text-gray-600 font-semibold">Verified Kitchen Partner</span>
              </>
            )}

            {restaurant.costForTwo > 0 && (
              <>
                <span className="text-gray-300">•</span>
                <span className="font-extrabold text-[#1c1c24]">
                  {restaurant.costForTwo} MAD for two
                </span>
              </>
            )}
          </div>

          {/* Cuisines Category link */}
          <div className="mt-2 text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700">
            <Link href="/restaurants" className="underline underline-offset-2">
              {restaurant.cuisines || 'Food & Dining'}
            </Link>
          </div>

          {/* Timing & Doorstep Delivery */}
          <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span className="font-bold text-emerald-600">Open now</span>
            <span className="text-gray-300">•</span>
            <span>Closes 12:00 am</span>
          </div>

          <hr className="my-3.5 border-gray-100" />

          {/* Location & Delivery Route Details */}
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            {/* Outlet */}
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-800">Outlet</span>
                <span className="text-gray-500 font-medium">
                  {restaurant.district || 'Maârif, Casablanca'}
                </span>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <span>{restaurant.deliveryTime || '20-25 mins'}</span>
                <span className="text-gray-400 font-normal text-xs">• Instant doorstep delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. "Deals for you" Carousel (API-driven active promo codes from GET /api/v1/promocodes) */}
        {activePromoCodes.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-[19px] sm:text-[21px] font-black text-[#1c1c24] tracking-tight">
                Deals for you
              </h2>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDealsScroll('left')}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous deals"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleDealsScroll('right')}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next deals"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={dealsScrollRef}
              className="flex items-center gap-3.5 overflow-x-auto scrollbar-none scroll-smooth pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {activePromoCodes.map((promo) => (
                <div
                  key={promo.id}
                  className="shrink-0 flex items-center gap-3.5 p-3.5 px-4 bg-white border border-gray-200 rounded-2xl shadow-2xs min-w-[230px] sm:min-w-[250px] hover:border-amber-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">
                    🏷️
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-extrabold text-[#1c1c24] leading-tight truncate">
                      {promo.discountType === 'percentage'
                        ? `${promo.discountValue}% OFF`
                        : `${promo.discountValue} MAD OFF`}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 mt-0.5 truncate uppercase">
                      USE {promo.code} {promo.minOrderAmount > 0 ? `| ABOVE ${promo.minOrderAmount} MAD` : '| ON ALL ORDERS'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Section Divider with Search & Veg Filters */}
        <div className="mb-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            {/* Search Dishes inside Restaurant */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder={`Search dishes in ${restaurant.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-9 rounded-2xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-400 shadow-2xs"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2.5">
              {/* Veg Only Toggle */}
              <button
                type="button"
                onClick={() => setVegOnly((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs sm:text-[13px] font-bold transition-all cursor-pointer shadow-2xs ${
                  vegOnly
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="w-3.5 h-3.5 border border-emerald-600 rounded-[3px] flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </span>
                <span>Veg Only</span>
              </button>

              {/* Bestseller Filter */}
              <button
                type="button"
                onClick={() => setBestsellerOnly((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs sm:text-[13px] font-bold transition-all cursor-pointer shadow-2xs ${
                  bestsellerOnly
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>★ Bestseller</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7. Product List: "One after the other" (Categorized Accordion matching Screenshots 2, 3, 4) */}
        {initialMenu.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/80 p-8 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl mb-4">
              🍽️
            </div>
            <h3 className="font-extrabold text-gray-900 text-xl">No Menu Items Listed Yet</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-md mx-auto leading-relaxed">
              {restaurant.name} has not published their menu items in the database yet. Please check back later or explore other partner restaurants.
            </p>
            <Link
              href="/restaurants"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#F5B301] hover:bg-[#e0a300] text-gray-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              ← Explore Other Restaurants
            </Link>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl mb-3">
              🔍
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg">No dishes found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any items matching your active filters or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setVegOnly(false);
                setBestsellerOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {categoryNames.map((catName) => {
              const dishes = categorizedMenu[catName];
              const isCollapsed = collapsedCategories[catName] || false;
              const catSlug = catName.replace(/\s+/g, '-').toLowerCase();

              return (
                <section
                  key={catName}
                  id={`category-${catSlug}`}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden"
                >
                  {/* Category Section Header with collapse toggle */}
                  <button
                    type="button"
                    onClick={() => toggleCategoryCollapse(catName)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 bg-white hover:bg-gray-50/70 transition-colors text-left cursor-pointer border-b border-gray-100"
                  >
                    <div>
                      <h3 className="text-[17px] sm:text-[19px] font-black text-[#1c1c24] tracking-tight">
                        {catName} ({dishes.length})
                      </h3>
                    </div>
                    <span
                      className={`text-gray-500 transition-transform duration-200 font-bold text-lg ${
                        isCollapsed ? 'rotate-180' : ''
                      }`}
                    >
                      ⌵
                    </span>
                  </button>

                  {/* Dishes inside category: Rendered "one after the other" */}
                  {!isCollapsed && (
                    <div className="divide-y divide-gray-100">
                      {dishes.map((dish) => {
                        const qty = cartQuantities[dish.id] || 0;
                        const isExpanded = expandedDescriptions[dish.id] || false;
                        const hasLongDesc = dish.description && dish.description.length > 90;

                        return (
                          <article
                            key={dish.id}
                            className="p-5 sm:p-6 flex items-start justify-between gap-4 sm:gap-6 hover:bg-gray-50/40 transition-colors"
                          >
                            {/* Left Side: Dish Details */}
                            <div className="flex flex-col min-w-0 flex-grow pr-2">
                              {/* Veg / Non-Veg Indicator & Bestseller Badge */}
                              <div className="flex items-center gap-2 mb-1.5">
                                {dish.isVeg ? (
                                  <div
                                    className="w-4 h-4 border-[1.5px] border-emerald-600 rounded-[3px] flex items-center justify-center p-0.5 shrink-0"
                                    title="Pure Veg"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                  </div>
                                ) : (
                                  <div
                                    className="w-4 h-4 border-[1.5px] border-rose-700 rounded-[3px] flex items-center justify-center p-0.5 shrink-0"
                                    title="Non-Veg"
                                  >
                                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-rose-700" />
                                  </div>
                                )}

                                {(dish.isFeatured || dish.isTrending) && (
                                  <span className="text-[11px] font-extrabold text-rose-600 flex items-center gap-1">
                                    <span>★</span>
                                    <span>Bestseller</span>
                                  </span>
                                )}
                              </div>

                              {/* Dish Name */}
                              <h4 className="font-extrabold text-[16px] sm:text-[17px] text-[#1c1c24] leading-snug tracking-tight">
                                {dish.name}
                              </h4>

                              {/* Price */}
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-[14px] sm:text-[15px] font-black text-[#1c1c24]">
                                  {dish.formattedPrice}
                                </span>
                              </div>

                              {/* Prep Time */}
                              <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-gray-500">
                                <span>Prep time: {dish.prepTime} mins</span>
                              </div>

                              {/* Description */}
                              {dish.description && (
                                <div className="mt-2 text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed">
                                  <span>
                                    {isExpanded || !hasLongDesc
                                      ? dish.description
                                      : `${dish.description.slice(0, 90)}...`}
                                  </span>
                                  {hasLongDesc && (
                                    <button
                                      type="button"
                                      onClick={() => toggleDescription(dish.id)}
                                      className="ml-1.5 font-bold text-gray-700 hover:text-black cursor-pointer inline"
                                    >
                                      {isExpanded ? 'less' : 'more'}
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Right Side: Product Image with Overlaid "ADD" Button */}
                            <div className="relative shrink-0 flex flex-col items-center">
                              {/* Square Product Image Container */}
                              <div className="relative w-28 h-28 sm:w-36 sm:h-32 rounded-2xl overflow-hidden shadow-xs bg-gray-100 border border-gray-100">
                                <DishImageItem src={dish.image} name={dish.name} />
                              </div>

                              {/* Overlaid ADD / Quantity Stepper Button */}
                              <div className="relative -mt-4 z-10">
                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => handleAddToCart(dish, 1)}
                                    className="w-24 sm:w-28 h-9 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 text-emerald-700 font-black text-xs sm:text-[13px] uppercase tracking-wider shadow-md hover:bg-emerald-50/50 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                                  >
                                    ADD <span className="ml-1 text-sm font-black">+</span>
                                  </button>
                                ) : (
                                  <div className="w-24 sm:w-28 h-9 rounded-xl bg-emerald-600 text-white font-black text-xs sm:text-[13px] shadow-md flex items-center justify-between px-2.5 transition-all">
                                    <button
                                      type="button"
                                      onClick={() => handleAddToCart(dish, -1)}
                                      className="hover:opacity-80 active:scale-90 text-sm font-black px-1 cursor-pointer"
                                      aria-label="Decrease quantity"
                                    >
                                      −
                                    </button>
                                    <span>{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleAddToCart(dish, 1)}
                                      className="hover:opacity-80 active:scale-90 text-sm font-black px-1 cursor-pointer"
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>

                              <span className="text-[10px] text-gray-400 font-medium mt-1">
                                Customisable
                              </span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. Floating "MENU" Quick-Jump Button (Matching Screenshots bottom right) */}
      {filteredMenu.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsMenuDrawerOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-[#1c1c24] hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl font-black text-xs tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-gray-700"
          >
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span>MENU ({filteredMenu.length})</span>
          </button>

          {/* Floating Menu Category Drawer Popup */}
          {isMenuDrawerOpen && (
            <div className="absolute bottom-14 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 animate-in fade-in slide-in-from-bottom-2 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">
                  Browse Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsMenuDrawerOpen(false)}
                  className="text-gray-400 hover:text-black text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {categoryNames.map((catName) => (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => scrollToCategory(catName)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-amber-600 hover:bg-amber-50/70 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{catName}</span>
                    <span className="text-gray-400 text-[11px] ml-2">
                      {categorizedMenu[catName]?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 9. Floating Cart Bar (When dishes added to cart) */}
      {cartSummary.count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-2xl">
          <div className="max-w-[860px] mx-auto flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {cartSummary.count} {cartSummary.count === 1 ? 'item' : 'items'} in cart
              </div>
              <div className="text-base font-black text-[#1c1c24]">
                {cartSummary.total.toFixed(0)} MAD
              </div>
            </div>
            <Link
              href="/checkout"
              className="flex items-center gap-2 bg-[#F5B301] hover:bg-[#e0a300] text-gray-900 font-extrabold px-6 py-2.5 rounded-2xl shadow-md text-sm transition-all duration-200 hover:scale-102 active:scale-98"
            >
              <span>View Cart</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
