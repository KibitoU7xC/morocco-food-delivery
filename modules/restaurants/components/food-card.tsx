'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FoodProductItem } from '../restaurants.types';
import { addFoodToCart } from '../restaurants.api';

interface FoodCardProps {
  food: FoodProductItem;
  onAddedToCart?: (food: FoodProductItem) => void;
  priority?: boolean;
}

export default function FoodCard({ food, onAddedToCart, priority }: FoodCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);
    try {
      const res = await addFoodToCart(food.id, 1);
      if (res.success) {
        setIsAdded(true);
        if (onAddedToCart) onAddedToCart(food);
        setTimeout(() => setIsAdded(false), 2200);
      }
    } catch {
      // ignore
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="food-card bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Food Image Container */}
      <div className="relative w-full aspect-[4/3] bg-amber-50/50 overflow-hidden">
        <Image
          src={food.image}
          alt={food.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />

        {/* Dietary Indicator Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs flex items-center gap-1.5">
          <div
            className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center ${
              food.isVeg ? 'border-emerald-600' : 'border-red-600'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                food.isVeg ? 'bg-emerald-600' : 'bg-red-600'
              }`}
            />
          </div>
          <span className="text-[11px] font-bold text-gray-800">
            {food.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Prep Time Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{food.prepTime} mins</span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Restaurant & Category Header */}
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-1">
            <a
              href={`/restaurants/${food.restaurantId}`}
              className="font-semibold text-amber-700 hover:text-amber-800 hover:underline truncate max-w-[140px]"
            >
              {food.restaurantName}
            </a>
            <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium shrink-0">
              {food.categoryName}
            </span>
          </div>

          {/* Dish Name */}
          <h3 className="text-[16px] sm:text-[17px] font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
            {food.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-gray-400">Price</span>
            <span className="text-[16px] font-extrabold text-[#1c1c24]">
              {food.formattedPrice}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'bg-amber-500 hover:bg-amber-600 text-white border border-amber-500'
            }`}
          >
            {isAdding ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : isAdded ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                <span className="text-sm leading-none font-extrabold">+</span>
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
