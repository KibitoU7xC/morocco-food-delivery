'use client';

import React from 'react';

export default function AppPromo() {
  return (
    <section className="w-full py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" id="download-app">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#5906e7] text-xs font-bold border border-purple-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Mobile First Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19181f] tracking-tight">
            Track your rider live, straight to your hands
          </h2>

          <p className="text-base text-[#54525d] leading-relaxed">
            Download the Orders.ma app for iOS or Android for an effortless ordering journey with live map tracking, real-time rider chat, and exclusive in-app offers.
          </p>

          <ul className="space-y-3 pt-2">
            <li className="flex items-center gap-3 text-sm text-[#19181f] font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Live GPS rider tracking with accurate to-the-minute ETA</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#19181f] font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>
                <strong>50% OFF up to 40 MAD</strong> on your first 3 mobile orders
              </span>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#19181f] font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>One-tap reorders &amp; instant contactless Moroccan payment</span>
            </li>
          </ul>

          {/* App Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="#"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-0.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-none opacity-80">Download on the</span>
                <span className="text-xs font-bold leading-tight">App Store</span>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.41 2.41 0 0 1-.61-.318V2.132c.18-.127.387-.234.609-.318zm11.232 11.232l2.36 2.36-12.016 6.89 9.656-9.25zm0-2.092L5.185 1.7l12.016 6.89-2.36 2.36zM18.8 12l2.7 1.55c.6.35.6 1.15 0 1.5L18.8 12z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-none opacity-80">Get it on</span>
                <span className="text-xs font-bold leading-tight">Google Play</span>
              </div>
            </a>

            {/* QR Scan Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f7f5fa] border border-[#e4e1ea]">
              <svg className="w-8 h-8 text-[#19181f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm-1 9h2v2h-2v-2zm3-3h2v2h-2v-2zm-3 5h2v2h-2v-2zm5-2h2v2h-2v-2zm-2 3h2v2h-2v-2zm2 2h2v2h-2v-2zM5 5h2v2H5V5zm0 10h2v2H5v-2zm12-10h2v2h-2V5z" />
              </svg>
              <span className="text-[11px] text-[#54525d] font-medium leading-tight text-left">
                Scan with camera <br />
                <strong className="text-[#19181f]">to install instant</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Isometric Mockup Duo */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-md h-[400px] bg-gradient-to-tr from-amber-50 via-purple-50 to-emerald-50 rounded-3xl p-6 flex items-center justify-center border border-[#e4e1ea]/60">
            {/* Mock Phone 1 (Back) */}
            <div className="absolute -right-2 top-8 w-52 sm:w-60 bg-white rounded-3xl p-3 shadow-xl border border-[#e4e1ea] transform rotate-6 opacity-90">
              <div className="h-2.5 w-12 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="w-full h-32 rounded-xl overflow-hidden mb-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-dSuJ0zWg37A10CpHQJztbP5Ei0olxzz60cSblL5at-KM232qqH_3cePLNhS7YgAddvbuy1oLPUy2hk4lo04WQlAm8TtBBMZVNNtkyl8t_tv-dnlZ2A51AOHVsrYDc8WY8fiLrgWpHR0u5GGUnOQ_lnrkGRThSigYTXQJCMx2j1DgDTXhl-0tYHPis0hz8Qp1VOhcigWn8QyiGSxIJMX73QPEp5SZ1X9gYbwl_TbjqRn4KyBqv3r"
                  alt="Courier rider navigation route"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <span className="text-[11px] font-bold text-[#19181f] block">Rider Yassine is nearby!</span>
                <span className="text-[10px] text-[#006d43] font-semibold">4 mins away</span>
              </div>
            </div>

            {/* Mock Phone 2 (Front) */}
            <div className="relative z-10 w-56 sm:w-64 bg-white rounded-3xl p-3 shadow-2xl border border-[#e4e1ea] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="h-2.5 w-12 bg-gray-200 rounded-full mx-auto mb-2.5" />
              <div className="w-full h-36 rounded-xl overflow-hidden relative mb-2.5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWT0L0C8fw_jE9FW40rZdJmeebk7Qj2MzEwqouo8F9zYBEyQy4nhWdAFs2kJayJZufBVjGYTU1izs2pIYb913Dbt1bL8D1eEk_GY755z4XMwjQecM2oohuFUXOBH_7nIwN1ps33xDAVmGAZD6WydUvqfHriTZ3YLAFAmy6E6yw2OEWEDkcrbBZXTmJhZ4wm2uw8thkuNIKZa6C5KZEH5e0shwqML-MDT5gy82TNi-r0I2p69q25HU3"
                  alt="App food deal"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#5906e7] text-white text-[10px] font-bold">
                  50% OFF
                </span>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl flex items-center justify-between border border-amber-200">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#d99700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-xs font-bold text-[#19181f]">2 items</span>
                </div>
                <span className="text-xs font-extrabold text-[#19181f]">145 MAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
