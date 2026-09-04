'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginForm from '@/modules/auth/components/login-form';
import { getLiveCartCount } from '../restaurants.api';

interface RestaurantHeaderProps {
  selectedDistrict?: string;
  onSelectDistrict?: (district: string) => void;
}

export default function RestaurantHeader({
  selectedDistrict = 'Casablanca, Maârif',
  onSelectDistrict,
}: RestaurantHeaderProps) {
  const router = useRouter();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Check auth status from localStorage
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

          // Fetch live profile name if needed
          if (!dataStr || name === 'Account') {
            import('@/modules/customer/customer.api')
              .then(({ getCustomerProfile }) => getCustomerProfile())
              .then((profile) => {
                if (profile && profile.name) {
                  setCustomerName(profile.name);
                  try {
                    const existing = dataStr ? JSON.parse(dataStr) : {};
                    localStorage.setItem(
                      'customer_data',
                      JSON.stringify({ ...existing, ...profile })
                    );
                  } catch {
                    localStorage.setItem('customer_data', JSON.stringify(profile));
                  }
                }
              })
              .catch(() => {
                // non-fatal
              });
          }
        } else {
          setUserLoggedIn(false);
          setCustomerName(null);
        }

        // Read local cart count immediately
        const count = Number(localStorage.getItem('cart_count')) || 0;
        setCartCount(count);
      }
    };

    updateAuthState();

    // Fetch live cart count directly from backend API DB
    getLiveCartCount().then((count) => {
      setCartCount(count);
    }).catch(() => { });

    // Listen to live cart update events triggered when items are added to DB
    const handleCartUpdated = (e: Event) => {
      const customEvt = e as CustomEvent<{ count?: number }>;
      if (typeof customEvt.detail?.count === 'number') {
        setCartCount(customEvt.detail.count);
      } else {
        const local = Number(localStorage.getItem('cart_count')) || 0;
        setCartCount(local);
      }
    };

    window.addEventListener('storage', updateAuthState);
    window.addEventListener('auth_updated', updateAuthState);
    window.addEventListener('cart_updated', handleCartUpdated);
    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('auth_updated', updateAuthState);
      window.removeEventListener('cart_updated', handleCartUpdated);
    };
  }, []);

  const districts = [
    'Casablanca, Maârif',
    'Casablanca, Gauthier',
    'Casablanca, Bourgogne',
    'Casablanca, Centre Ville',
    'Casablanca, Ain Diab',
    'Casablanca, Racine',
    'Casablanca, Anfa',
    'Casablanca, Val Fleuri',
    'Rabat, Agdal',
    'Marrakech, Guéliz',
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#fbf8ff]/90 backdrop-blur-xl py-2.5 sm:py-4 px-3 sm:px-8 transition-colors duration-300 border-b border-[#e4e1ea]/40" data-purpose="site-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Brand Logo and Location Selector */}
          <div className="flex items-center gap-4 sm:gap-8 shrink-0">
            <Link href="/" aria-label="Orders Home" className="flex items-center group shrink-0">
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

            {/* Location Selector with hover underline */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 cursor-pointer group shrink-0 py-1"
              >
                <span className="text-xs sm:text-sm font-bold text-gray-800 border-b-2 border-gray-800 group-hover:text-[#ea580c] group-hover:border-[#ea580c] transition-colors">
                  {selectedDistrict}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[120px] hidden md:inline">
                  Grand Casablanca
                </span>
                <svg
                  className="w-4 h-4 text-[#ea580c] transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Select Delivery Area
                  </div>
                  {districts.map((district) => (
                    <button
                      key={district}
                      type="button"
                      onClick={() => {
                        onSelectDistrict?.(district);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition cursor-pointer flex items-center justify-between ${selectedDistrict === district
                          ? 'bg-amber-50 text-[#ea580c] font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <span>{district}</span>
                      {selectedDistrict === district && (
                        <span className="text-[#ea580c]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions (Help, Sign In / User Profile, Cart) */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0 text-[13px] sm:text-[14px] font-semibold text-gray-700">
            <Link
              href="/help"
              className="hidden sm:flex items-center gap-2 hover:text-[#ea580c] transition-colors py-2"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Help</span>
            </Link>

            {/* User Account / Profile Button */}
            {userLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-[#ea580c] hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-bold truncate max-w-[110px]">👋 {customerName}</span>
                  <svg className="w-3.5 h-3.5 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-[11px] text-gray-500">Signed in as</p>
                      <p className="text-xs font-bold text-gray-800 truncate">{customerName}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-800 hover:bg-amber-50 hover:text-[#ea580c] transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-b-xl"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 hover:text-[#ea580c] transition-colors py-2 text-xs sm:text-sm font-semibold text-gray-700"
                >
                  <svg className="w-4.5 h-4.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#1c1c24] hover:bg-black text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>Sign In</span>
                </button>
              </div>
            )}

            {/* Cart Icon with Live Count Badge */}
            <Link
              href="/checkout"
              className="relative flex items-center gap-2 py-2 text-gray-700 cursor-pointer group select-none hover:text-[#ea580c] transition-colors"
              title={cartCount > 0 ? `${cartCount} items in cart` : 'Cart is empty'}
            >
              <div className="relative flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-700 group-hover:text-[#ea580c] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 min-w-[19px] h-[19px] px-1 bg-[#ea580c] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="group-hover:text-[#ea580c] transition-colors">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Modal Popup */}
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
              onClose={() => {
                setIsAuthModalOpen(false);
                // Refresh auth status
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
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
