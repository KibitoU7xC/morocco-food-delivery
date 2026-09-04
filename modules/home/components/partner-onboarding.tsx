'use client';

import React from 'react';
import { OrganicShapeBottomLeft, OrganicShapeBottomRight } from './organic-shapes';

export default function PartnerOnboarding() {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#FAF8FC] border-t border-[#e4e1ea]/60 overflow-hidden">
      {/* Organic Yellow Curves (Bottom Left & Bottom Right) - clearly visible behind cards */}
      <OrganicShapeBottomLeft className="opacity-75 sm:opacity-85" />
      <OrganicShapeBottomRight className="opacity-80 sm:opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5906e7]">
            Collaborate &amp; Grow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19181f] mt-1">
            Let&apos;s grow together
          </h2>
          <p className="text-xs sm:text-sm text-[#54525d] mt-2 font-medium">
            Empowering couriers, restaurants, and independent retailers across Morocco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Rider */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-emerald-100 p-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_7C536tcI0rSUxCIWrMdV4_HNY5duOLC1_hQGGtLM7FD-M8CAd1EDlS9A97pV98ykpfmKCj_1ypuF80Fqb_hBoEtxzEeqzDBtVx2_ACwoiq826TooUQjk1bbAg5Us9hnsblsDLQovYXadsYSWHO4CyTeRoQgAceOCKDuKfg4_YYSB5SIp1kU4GBkNRMlVaZFWL2EG-d-OiHMHw-qVmfYH5vIFqPHxJCn8_ZPo_TdOAHNaOrXckxF4"
                  alt="Courier rider smiling"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#19181f] mb-1.5 sm:mb-2">Become a Rider</h3>
              <p className="text-xs sm:text-sm text-[#54525d] leading-relaxed mb-5 sm:mb-6">
                Complete schedule freedom, weekly direct deposits, and accident insurance on every single trip.
              </p>
            </div>
            <a
              href="/register"
              className="w-full py-2.5 rounded-full bg-[#006d43] hover:bg-emerald-800 text-white text-xs font-bold transition-colors text-center shadow-xs cursor-pointer active:scale-95"
            >
              Register as Rider
            </a>
          </div>

          {/* Card 2: Merchant */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-amber-100 p-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvgSUFSZ9E3ZjBlVdFhi5NSRjaclN5Ic9zLubolBIzVmeR1cRvoc7ugxSszbFAkMX9YD3R_rK7BkPeUXx8XjbcOJEe48bpp4fo05l2llaH1c8Ufqc4Sm9OPjkMzK6CpeawHbtalI2J4ghbvDn__la4MNGIT5roabE8P_9KBgMPw3jQFwmu1PGl01MmjmPtZj7BmATA6VFig_yObAqZLeRwnNdlZSxKJsLXx98qofiEZAAt1KCydNSg"
                  alt="Restaurant chef in kitchen"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#19181f] mb-1.5 sm:mb-2">Partner your Business</h3>
              <p className="text-xs sm:text-sm text-[#54525d] leading-relaxed mb-5 sm:mb-6">
                Reach 150,000+ local customers in Casablanca, Rabat, and Marrakech with high conversion.
              </p>
            </div>
            <a
              href="/register"
              className="w-full py-2.5 rounded-full bg-[#5906e7] hover:bg-[#4502b8] text-white text-xs font-bold transition-colors text-center shadow-xs cursor-pointer active:scale-95"
            >
              Register Store
            </a>
          </div>

          {/* Card 3: Careers */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e4e1ea]/80 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-purple-100 p-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFpn8-MBwcJhSHOJAmx_klFU5K2hv5qoJqhYwmIRABhpXOOrlJ_G661pvjBrQg3Buz-KrjuqWjtKIbzj6XXmChPQFwjH3I88FerZj1N0HtIpmnI9OAwzLD6VzrDQJN8oSDQ4oiMa6gffTm_tWY11ew2G3SkNnJcv2q_ZjtHxd2RQPrhKv99lZeWuCXb6JFN2p5XJYWF30e76U_8BmnweeWXb2KrHQ6-ej_VudWydr64vu8kDPHhnI"
                  alt="Tech office team"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#19181f] mb-1.5 sm:mb-2">Careers at Orders.ma</h3>
              <p className="text-xs sm:text-sm text-[#54525d] leading-relaxed mb-5 sm:mb-6">
                Join engineering, product, and operations teams shaping the future of North African commerce.
              </p>
            </div>
            <a
              href="#"
              className="w-full py-2.5 rounded-full bg-[#19181f] hover:bg-black text-white text-xs font-bold transition-colors text-center shadow-xs cursor-pointer active:scale-95"
            >
              View Open Roles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
