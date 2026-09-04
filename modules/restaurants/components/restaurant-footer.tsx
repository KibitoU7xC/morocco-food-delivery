'use client';

import React from 'react';
import Link from 'next/link';

export default function RestaurantFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-10 mt-16" data-purpose="site-footer">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#F5B301] flex items-center justify-center text-gray-900 font-black text-xs">
            O
          </div>
          <span className="font-semibold text-gray-800 text-sm">Orders Morocco (Orders.ma)</span>
          <span className="hidden sm:inline">© 2026 Orders Technologies SARL. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Partner with Us
          </Link>
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Rabat
          </Link>
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Casablanca
          </Link>
          <Link className="hover:text-gray-900 transition-colors" href="#">
            Marrakech
          </Link>
        </div>
      </div>
    </footer>
  );
}
