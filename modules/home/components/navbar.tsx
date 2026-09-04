'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginForm from '@/modules/auth/components/login-form';
import { useLanguage } from '@/lib/context/language-context';
import { getLiveCartCount } from '@/modules/restaurants/restaurants.api';

export default function HomeNavbar() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('Casablanca, Maârif');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const updateAuthState = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        const dataStr = localStorage.getItem('customer_data');
        if (token) {
          setUserLoggedIn(true);
          let name = 'Account';
          if (dataStr) {
            try {
              const cust = JSON.parse(dataStr);
              if (cust && cust.name) name = cust.name;
            } catch {
              // ignore
            }
          }
          setCustomerName(name);
        } else {
          setUserLoggedIn(false);
          setCustomerName(null);
        }
      }
    };

    updateAuthState();

    // Initial cart load from storage and backend
    const local = typeof window !== 'undefined' ? Number(localStorage.getItem('cart_count')) || 0 : 0;
    setCartCount(local);
    getLiveCartCount().then((count) => {
      setCartCount(count);
    }).catch(() => {});

    // Listen to real-time cart updates
    const handleCartUpdated = (e: Event) => {
      const customEvt = e as CustomEvent<{ count?: number }>;
      if (typeof customEvt.detail?.count === 'number') {
        setCartCount(customEvt.detail.count);
      } else {
        const cnt = Number(localStorage.getItem('cart_count')) || 0;
        setCartCount(cnt);
      }
    };

    window.addEventListener('storage', updateAuthState);
    window.addEventListener('auth_updated', updateAuthState);
    window.addEventListener('cart_updated', handleCartUpdated);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAuthModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('auth_updated', updateAuthState);
      window.removeEventListener('cart_updated', handleCartUpdated);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const cities = [
    'Casablanca, Maârif',
    'Casablanca, Gauthier',
    'Rabat, Agdal',
    'Rabat, Hay Riad',
    'Marrakech, Guéliz',
    'Tangier, Malabata',
    'Agadir, Centre',
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#fbf8ff]/90 backdrop-blur-xl py-2.5 sm:py-4 px-3 sm:px-8 transition-colors duration-300 border-b border-[#e4e1ea]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Official Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-11 sm:h-16 w-14 sm:w-22 flex items-center">
              <Image
                src="/logo_4096x4096.png"
                alt="Orders au Maroc"
                width={140}
                height={140}
                priority
                className="h-full w-auto object-contain scale-110 sm:scale-130 origin-left group-hover:scale-115 sm:group-hover:scale-135 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Right: Location -> Log In / Sign Up -> EN / FR Switcher (AFTER login button) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* 1. Location Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-xs text-[#1b1b21] text-xs sm:text-sm font-semibold border-2 border-[#d5cedd] hover:border-[#5906e7] transition-all cursor-pointer select-none"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5b301] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-7-6.5-7-11.5a7 7 0 1114 0c0 5-7 11.5-7 11.5z"
                  />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span className="truncate max-w-[65px] xs:max-w-[100px] sm:max-w-none text-[11px] sm:text-xs md:text-sm">{selectedCity}</span>
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6b6675] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 sm:w-56 bg-white rounded-2xl shadow-xl border border-[#e4e1ea] p-1.5 z-50 animate-in fade-in">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedCity === city
                          ? 'bg-[#f5f2fb] text-[#5906e7] font-bold'
                          : 'text-[#1b1b21] hover:bg-[#f5f2fb]'
                        }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. User Profile or Log In Button */}
            {userLoggedIn ? (
              <Link
                href="/profile"
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#f5f2fb] hover:bg-[#eae7ef] text-[#5906e7] text-xs sm:text-sm font-bold border border-[#e4e1ea] transition-colors"
                title="My Profile"
              >
                <svg className="w-4 h-4 text-[#5906e7] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="truncate max-w-[85px] xs:max-w-[110px] sm:max-w-none">👋 {customerName}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 sm:gap-2 px-2.5 xs:px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1b1b21] hover:bg-black text-white text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden sm:inline">Log In / Sign Up</span>
                <span className="sm:hidden">Log In</span>
              </button>
            )}

            {/* 3. Cart Icon with Live Count Badge (Always visible across all sections) */}
            <Link
              href="/checkout"
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all cursor-pointer shrink-0 select-none"
              title={cartCount > 0 ? `${cartCount} items in cart` : 'Cart is empty'}
              id="home-navbar-cart-btn"
            >
              <div className="relative flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-[#1b1b21] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
            </Link>

            {/* 3. EN / FR Language Switcher Pill */}
            <div className="flex items-center bg-[#f5f2fb] p-0.5 sm:p-1 rounded-full border border-[#eae7ef] shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${lang === 'EN'
                    ? 'bg-white text-[#5906e7] shadow-xs'
                    : 'text-[#6b6675] hover:text-[#1b1b21]'
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('FR')}
                className={`px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${lang === 'FR'
                    ? 'bg-white text-[#5906e7] shadow-xs'
                    : 'text-[#6b6675] hover:text-[#1b1b21]'
                  }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login / Sign Up Modal Popup */}
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAuthModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-[490px] my-auto animate-in zoom-in-95 duration-200">
            <LoginForm
              initialMode="login"
              redirectTo="/restaurants"
              onClose={() => {
                setIsAuthModalOpen(false);
                router.push('/restaurants');
                router.refresh();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
