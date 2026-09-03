'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeFooter() {
  return (
    <footer className="w-full bg-white border-t border-[#e4e1ea]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image
                  src="/logo_4096x4096.png"
                  alt="Orders.ma Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold text-[#19181f]">
                Orders<span className="text-[#f5b301]">.ma</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#54525d] leading-relaxed max-w-sm">
              Morocco&apos;s premier high-speed delivery service. Fresh food, supermarkets, medicine, and express couriers delivered straight to your door.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                Available 7/7
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-semibold border border-purple-200">
                24h in Casablanca &amp; Rabat
              </span>
            </div>
          </div>

          {/* Column 2: Deliveries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#19181f]">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#54525d] font-medium">
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#beloved-brands">
                  Restaurants &amp; Diners
                </a>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#beloved-brands">
                  Supermarkets &amp; BIM
                </a>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#explore-categories">
                  Express Courier &amp; Parcels
                </a>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#explore-categories">
                  24/7 Pharmacy
                </a>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#explore-categories">
                  Boutiques &amp; Gifts
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#19181f]">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#54525d] font-medium">
              <li>
                <Link className="hover:text-[#5906e7] transition-colors" href="/register">
                  Become a Courier
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#5906e7] transition-colors" href="/register">
                  Partner your Store
                </Link>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#">
                  Orders for Business
                </a>
              </li>
              <li>
                <Link className="hover:text-[#5906e7] transition-colors" href="/help">
                  Help &amp; Support
                </Link>
              </li>
              <li>
                <a className="hover:text-[#5906e7] transition-colors" href="#">
                  Privacy &amp; Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: App Downloads */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#19181f]">
              Get Orders.ma
            </h4>
            <p className="text-xs text-[#54525d]">Order in seconds via mobile application.</p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-[#19181f]"
                href="#download-app"
              >
                <svg className="w-4 h-4 text-[#19181f]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-0.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
                <span className="text-xs font-bold">App Store</span>
              </a>
              <a
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-[#19181f]"
                href="#download-app"
              >
                <svg className="w-4 h-4 text-[#19181f]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.41 2.41 0 0 1-.61-.318V2.132c.18-.127.387-.234.609-.318zm11.232 11.232l2.36 2.36-12.016 6.89 9.656-9.25zm0-2.092L5.185 1.7l12.016 6.89-2.36 2.36zM18.8 12l2.7 1.55c.6.35.6 1.15 0 1.5L18.8 12z" />
                </svg>
                <span className="text-xs font-bold">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#e4e1ea]/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 relative flex items-center justify-center">
              <Image
                src="/logo_4096x4096.png"
                alt="Orders.ma Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-extrabold text-[#19181f]">Orders au Maroc</span>
          </div>
          <span className="text-xs text-[#54525d]">
            &copy; {new Date().getFullYear()} Orders.ma Technologies SARL. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
