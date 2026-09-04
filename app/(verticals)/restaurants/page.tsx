'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RestaurantHeader from '@/modules/restaurants/components/restaurant-header';
import RestaurantServicesNav from '@/modules/restaurants/components/restaurant-services-nav';
import RestaurantSearchBar from '@/modules/restaurants/components/restaurant-search-bar';
import CuisineCarousel from '@/modules/restaurants/components/cuisine-carousel';
import RestaurantFilters from '@/modules/restaurants/components/restaurant-filters';
import RestaurantGrid from '@/modules/restaurants/components/restaurant-grid';
import FoodGrid from '@/modules/restaurants/components/food-grid';
import FloatingCartBar from '@/modules/restaurants/components/floating-cart-bar';
import RestaurantFooter from '@/modules/restaurants/components/restaurant-footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  getRestaurants,
  getFoodProducts,
  getRestaurantCategories,
} from '@/modules/restaurants/restaurants.api';
import {
  RestaurantItem,
  FoodProductItem,
  CuisineCategory,
  SortOption,
} from '@/modules/restaurants/restaurants.types';

export default function RestaurantsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('Casablanca, Maârif');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'dishes' | 'restaurants'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [fastDelivery, setFastDelivery] = useState(false);
  const [rating4Plus, setRating4Plus] = useState(false);
  const [pureVeg, setPureVeg] = useState(false);
  const [halalOnly, setHalalOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [under50MAD, setUnder50MAD] = useState(false);

  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodProductItem[]>([]);
  const [categories, setCategories] = useState<CuisineCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (sortBy !== 'relevance') count++;
    if (fastDelivery) count++;
    if (rating4Plus) count++;
    if (pureVeg) count++;
    if (halalOnly) count++;
    if (offersOnly) count++;
    if (under50MAD) count++;
    if (selectedCategoryId !== null) count++;
    return count;
  }, [sortBy, fastDelivery, rating4Plus, pureVeg, halalOnly, offersOnly, under50MAD, selectedCategoryId]);

  // Selected category object
  const selectedCategory = useMemo(() => {
    if (selectedCategoryId === null) return null;
    return categories.find((c) => c.categoryId === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  // Fetch food categories on mount from API
  useEffect(() => {
    let isMounted = true;
    getRestaurantCategories().then((cats) => {
      if (isMounted && cats.length > 0) {
        setCategories(cats);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch & filter both food products and restaurants
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const clientFilters = {
        search: searchQuery,
        categoryId: selectedCategoryId,
        cuisine: selectedCategory?.name || null,
        sort: sortBy,
        fastDelivery,
        rating4Plus,
        pureVeg,
        halalOnly,
        offersOnly,
        under50MAD,
      };

      const [foodData, restData] = await Promise.all([
        getFoodProducts(
          {
            categoryId: selectedCategoryId,
            search: searchQuery.trim() || undefined,
            sortBy: sortBy === 'cost_low' || sortBy === 'cost_high' ? 'price' : undefined,
            sortOrder: sortBy === 'cost_low' ? 'asc' : sortBy === 'cost_high' ? 'desc' : undefined,
          },
          clientFilters
        ),
        getRestaurants(
          {
            search: searchQuery.trim() || undefined,
          },
          clientFilters
        ),
      ]);

      setFoodItems(foodData);
      setRestaurants(restData);
    } catch (err) {
      console.warn('Failed to load food and restaurant data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    selectedCategoryId,
    selectedCategory,
    sortBy,
    fastDelivery,
    rating4Plus,
    pureVeg,
    halalOnly,
    offersOnly,
    under50MAD,
  ]);

  // Debounced execution for search and filter updates
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 180);
    return () => clearTimeout(timer);
  }, [loadData]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId(null);
    setSortBy('relevance');
    setFastDelivery(false);
    setRating4Plus(false);
    setPureVeg(false);
    setHalalOnly(false);
    setOffersOnly(false);
    setUnder50MAD(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#282c3f] antialiased">
      {/* 1. Main Header with user linking and location selector */}
      <RestaurantHeader
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
      />

      {/* 2. Sub-nav: Multi-Category Services Bar */}
      <RestaurantServicesNav />

      {/* 3. Wide Centered Search Bar */}
      <RestaurantSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* 4. Main Content */}
      <main className="flex-grow max-w-[1240px] w-full mx-auto px-4 pt-6 pb-28">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Restaurants" },
          ]}
          className="mb-6"
        />

        {/* "What's on your mind?" Category Carousel */}
        <CuisineCarousel
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(catId) => setSelectedCategoryId(catId)}
        />

        {/* Listing Title & Filter Controls Bar */}
        <RestaurantFilters
          totalCount={restaurants.length}
          foodCount={foodItems.length}
          district={selectedDistrict}
          selectedCategoryName={selectedCategory?.name || null}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          fastDelivery={fastDelivery}
          onToggleFastDelivery={() => setFastDelivery((prev) => !prev)}
          rating4Plus={rating4Plus}
          onToggleRating4Plus={() => setRating4Plus((prev) => !prev)}
          pureVeg={pureVeg}
          onTogglePureVeg={() => setPureVeg((prev) => !prev)}
          halalOnly={halalOnly}
          onToggleHalalOnly={() => setHalalOnly((prev) => !prev)}
          offersOnly={offersOnly}
          onToggleOffersOnly={() => setOffersOnly((prev) => !prev)}
          under50MAD={under50MAD}
          onToggleUnder50MAD={() => setUnder50MAD((prev) => !prev)}
          onClearAllFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* SECTION 1: FOOD DISHES (When viewMode is 'all' or 'dishes') */}
        {(viewMode === 'all' || viewMode === 'dishes') && (
          <section className="mb-12" aria-label="Food Dishes Section">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[19px] sm:text-[21px] font-extrabold text-[#1c1c24] tracking-tight">
                  {selectedCategory
                    ? `${selectedCategory.name} Dishes`
                    : 'Popular Food Dishes'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Direct menu items fetched from live restaurant partners in Casablanca
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                {foodItems.length} {foodItems.length === 1 ? 'Dish' : 'Dishes'}
              </span>
            </div>

            <FoodGrid
              foods={foodItems}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
              selectedCategoryName={selectedCategory?.name || null}
            />
          </section>
        )}

        {/* SECTION 2: RESTAURANTS (When viewMode is 'all' or 'restaurants') */}
        {(viewMode === 'all' || viewMode === 'restaurants') && (
          <section aria-label="Restaurant Partners Section">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[19px] sm:text-[21px] font-extrabold text-[#1c1c24] tracking-tight">
                  {selectedCategory
                    ? `Restaurants Serving ${selectedCategory.name}`
                    : 'Top Restaurant Partners'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Verified kitchen partners with instant door delivery
                </p>
              </div>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                {restaurants.length} {restaurants.length === 1 ? 'Kitchen' : 'Kitchens'}
              </span>
            </div>

            <RestaurantGrid
              restaurants={restaurants}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
            />
          </section>
        )}
      </main>

      {/* Synchronized Floating Cart Bar (Matches design reference) */}
      <FloatingCartBar />

      {/* 5. Stitch Footer */}
      <RestaurantFooter />
    </div>
  );
}
