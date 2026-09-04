import React from 'react';
import RestaurantHeader from '@/modules/restaurants/components/restaurant-header';
import RestaurantFooter from '@/modules/restaurants/components/restaurant-footer';
import RestaurantDetailView from '@/modules/restaurants/components/restaurant-detail-view';
import {
  getRestaurantDetails,
  getRestaurantMenu,
} from '@/modules/restaurants/restaurants.api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const restaurant = await getRestaurantDetails(id);
  const menuItems = restaurant
    ? await getRestaurantMenu(restaurant.id, restaurant.name)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] font-sans text-[#282c3f] antialiased">
      {/* 1. Main Restaurant Header */}
      <RestaurantHeader />

      {/* 2. Main Restaurant Inner Content */}
      <main className="flex-grow">
        {restaurant ? (
          <RestaurantDetailView
            restaurant={restaurant}
            initialMenu={menuItems}
          />
        ) : (
          <div className="max-w-[860px] mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl mb-4">
              🏪
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              The restaurant you requested is currently unavailable or does not exist.
            </p>
            <a
              href="/restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5B301] hover:bg-[#e0a300] text-gray-900 font-extrabold rounded-2xl shadow-md text-sm transition-all"
            >
              ← Back to Restaurants
            </a>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <RestaurantFooter />
    </div>
  );
}
