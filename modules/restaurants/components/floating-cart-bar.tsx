'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { syncCartState } from '../restaurants.api';

interface FloatingCartBarProps {
  className?: string;
}

export default function FloatingCartBar({ className = '' }: FloatingCartBarProps) {
  const [cartState, setCartState] = useState<{ count: number; total: number }>({
    count: 0,
    total: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Fetch initial live cart from database
    syncCartState().then((state) => {
      if (isMounted) {
        setCartState({ count: state.count, total: state.total });
        setIsLoaded(true);
      }
    });

    // Real-time synchronization on cart changes
    const handleCartUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number; total?: number }>;
      if (customEvent.detail) {
        const count = typeof customEvent.detail.count === 'number' ? customEvent.detail.count : 0;
        const total = typeof customEvent.detail.total === 'number' ? customEvent.detail.total : 0;

        if (isMounted) {
          setCartState({ count, total });
        }

        // If total wasn't provided or 0 but count > 0, re-sync from backend
        if (typeof customEvent.detail.total !== 'number' && count > 0) {
          syncCartState().then((fresh) => {
            if (isMounted) {
              setCartState({ count: fresh.count, total: fresh.total });
            }
          });
        }
      }
    };

    window.addEventListener('cart_updated', handleCartUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('cart_updated', handleCartUpdated);
    };
  }, []);

  // Hidden when empty or initial load not done
  if (!isLoaded || cartState.count <= 0) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-gray-200/90 px-4 sm:px-8 py-3 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-300 ${className}`}
      role="region"
      aria-label="Cart summary"
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">
        <div>
          <div className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide">
            {cartState.count} {cartState.count === 1 ? 'ITEM' : 'ITEMS'} IN CART
          </div>
          <div className="text-base sm:text-lg font-black text-[#1c1c24] tracking-tight">
            {cartState.total.toFixed(0)} MAD
          </div>
        </div>

        <Link
          href="/checkout"
          className="flex items-center gap-2 bg-[#F5B301] hover:bg-[#e0a300] active:scale-98 text-gray-900 font-extrabold px-6 sm:px-7 py-2.5 rounded-full shadow-md text-xs sm:text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:scale-102"
          id="floating-view-cart-btn"
        >
          <span>View Cart</span>
          <span className="text-base font-bold leading-none">→</span>
        </Link>
      </div>
    </div>
  );
}
