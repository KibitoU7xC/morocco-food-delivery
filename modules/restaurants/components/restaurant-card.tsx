'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RestaurantItem } from '../restaurants.types';

interface RestaurantCardProps {
  restaurant: RestaurantItem;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${restaurant.slug || restaurant.id}`}
      className="restaurant-card cursor-pointer group flex flex-col transition-transform duration-200 hover:scale-[0.98]"
    >
      {/* Media Container with Dark Gradient Overlay and Promo text */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xs bg-gray-100">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {/* Gradient and Promo Badge */}
        {restaurant.promoBadge && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-3">
            <span className="text-white font-extrabold text-[15px] sm:text-[17px] tracking-tight uppercase drop-shadow-xs">
              {restaurant.promoBadge}
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="pt-3 px-1 flex flex-col">
        <h2 className="font-bold text-[17px] sm:text-[18px] text-gray-900 leading-snug group-hover:text-amber-600 transition-colors truncate">
          {restaurant.name}
        </h2>

        {/* Star Rating & Time */}
        <div className="flex items-center gap-1.5 mt-0.5 text-[14px] sm:text-[15px] font-bold text-gray-800">
          <span className="w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center text-[10px] shrink-0">
            ★
          </span>
          <span>{restaurant.rating.toFixed(1)}</span>
          <span className="text-gray-400 font-normal">•</span>
          <span className="truncate">{restaurant.deliveryTime}</span>
        </div>

        {/* Cuisines */}
        <p className="text-[13px] sm:text-[14px] text-gray-500 truncate mt-0.5">
          {restaurant.cuisines}
        </p>

        {/* Location / District */}
        <p className="text-[13px] sm:text-[14px] text-gray-500 truncate">
          {restaurant.district}
        </p>
      </div>
    </Link>
  );
}
