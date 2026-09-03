'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { sendOtp, verifyOtp, register } from '../auth.api';
import { COUNTRIES, Country } from '../countries';
import { useLanguage } from '@/lib/context/language-context';

type Language = 'EN' | 'FR';
type AuthMode = 'login' | 'register';

const CONTENT = {
  EN: {
    welcomeTitle: 'Welcome back!',
    welcomeSubtitle: 'Sign in to access your saved addresses, favorite restaurants, and exclusive offers across Morocco.',
    registerTitle: 'Create an account',
    registerSubtitle: 'Join Orders au Maroc for fast food, grocery, pharmacy and courier delivery across Morocco.',
    phoneLabel: 'Phone Number',
    otpBadge: 'Instant SMS OTP',
    phonePlaceholder: '6XX-XXXXXX',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Sara Benali',
    emailLabel: 'Email Address',
    emailPlaceholder: 'e.g. sara@example.ma',
    btnSendOtp: 'Continue with OTP',
    btnVerifyOtp: 'Verify & Enter',
    btnRegister: 'Create Account',
    enterCode: 'Enter verification code',
    resend: 'Resend',
    resendIn: 'Resend in',
    secureOtp: 'Secure OTP verification',
    reviewsCount: '(18k reviews)',
    termsPrefix: 'By continuing, you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
    newAccountPrefix: 'New to Orders au Maroc?',
    createAccount: 'Create an account',
    haveAccountPrefix: 'Already have an account?',
    signIn: 'Sign in',
    searchCountry: 'Search country or code...',
    invalidPhone: 'Please enter a valid phone number (e.g. 612345678).',
    invalidName: 'Please enter your full name.',
    invalidEmail: 'Please enter a valid email address.',
    invalidOtp: 'Please enter all 6 digits of the verification code.',
    otpSentBanner: 'OTP sent! For testing, your code is:',
    successLogin: 'Verified successfully! Redirecting to dashboard...',
    successRegister: 'Account verified & created! Redirecting to dashboard...',
  },
  FR: {
    welcomeTitle: 'Bon retour !',
    welcomeSubtitle: 'Connectez-vous pour accéder à vos adresses enregistrées, vos restaurants favoris et aux offres exclusives au Maroc.',
    registerTitle: 'Créer un compte',
    registerSubtitle: 'Rejoignez Orders au Maroc pour vos livraisons de repas, courses, pharmacie et coursier express.',
    phoneLabel: 'Numéro de téléphone',
    otpBadge: 'SMS OTP Instantané',
    phonePlaceholder: '6XX-XXXXXX',
    nameLabel: 'Nom complet',
    namePlaceholder: 'ex: Sara Benali',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'ex: sara@exemple.ma',
    btnSendOtp: 'Continuer avec OTP',
    btnVerifyOtp: 'Vérifier & Entrer',
    btnRegister: 'Créer un compte',
    enterCode: 'Entrez le code de vérification',
    resend: 'Renvoyer',
    resendIn: 'Renvoyer dans',
    secureOtp: 'Vérification OTP sécurisée',
    reviewsCount: '(18k avis)',
    termsPrefix: 'En continuant, vous acceptez nos',
    terms: "Conditions d'utilisation",
    and: 'et',
    privacy: 'Politique de confidentialité',
    newAccountPrefix: 'Nouveau sur Orders au Maroc ?',
    createAccount: 'Créer un compte',
    haveAccountPrefix: 'Vous avez déjà un compte ?',
    signIn: 'Se connecter',
    searchCountry: 'Rechercher un pays ou indicatif...',
    invalidPhone: 'Veuillez saisir un numéro de téléphone valide (ex: 612345678).',
    invalidName: 'Veuillez saisir votre nom complet.',
    invalidEmail: 'Veuillez saisir une adresse email valide.',
    invalidOtp: 'Veuillez saisir le code complet à 6 chiffres.',
    otpSentBanner: 'Code OTP envoyé ! Pour tester, votre code est :',
    successLogin: 'Vérifié avec succès ! Redirection vers le tableau de bord...',
    successRegister: 'Compte vérifié et créé ! Redirection vers le tableau de bord...',
  },
};

export default function LoginForm({
  initialMode = 'login',
  onClose,
}: {
  initialMode?: AuthMode;
  onClose?: () => void;
} = {}) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  // Auth Modes & Form State
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(45);

  // Country Selection State
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default: Morocco (MA +212)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Clean phone input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhone(raw);
    setErrorMsg(null);
  };

  // Format full mobile with chosen country's dial code
  const getFullMobile = () => {
    const clean = phone.trim();
    const withoutLeadingZero = clean.startsWith('0') ? clean.slice(1) : clean;
    const dialDigits = selectedCountry.dial_code.replace('+', '');
    return `${dialDigits}${withoutLeadingZero}`;
  };

  // Filter countries by search query
  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dial_code.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // 1. Send OTP for Login
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const cleanNumber = phone.trim();
    if (cleanNumber.length < 6) {
      setErrorMsg(t.invalidPhone);
      return;
    }

    setIsLoading(true);
    try {
      const fullMobile = getFullMobile();
      const res = await sendOtp({ mobile: fullMobile });

      if (res.status) {
        setStep('otp');
        setCountdown(45);
        if (res.otp) {
          setDemoOtp(res.otp);
        }
        setTimeout(() => {
          otpInputs.current[0]?.focus();
          setActiveOtpIndex(0);
        }, 100);
      } else {
        setErrorMsg(res.message || 'Failed to send OTP.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Initiate Registration (validates, sends OTP, and moves to verification page before dashboard)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg(t.invalidName);
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(t.invalidEmail);
      return;
    }

    const cleanNumber = phone.trim();
    if (cleanNumber.length < 6) {
      setErrorMsg(t.invalidPhone);
      return;
    }

    setIsLoading(true);
    try {
      const fullMobile = getFullMobile();
      // Send OTP to verify phone number before registration completes
      const res = await sendOtp({ mobile: fullMobile });

      if (res.status) {
        // Move to the OTP verification screen!
        setStep('otp');
        setCountdown(45);
        if (res.otp) {
          setDemoOtp(res.otp);
        }
        setTimeout(() => {
          otpInputs.current[0]?.focus();
          setActiveOtpIndex(0);
        }, 100);
      } else {
        setErrorMsg(res.message || 'Failed to send verification code.');
      }
    } catch {
      setErrorMsg('Failed to send OTP. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Verify OTP: only after verification succeeds does it complete registration/login and go to dashboard
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setErrorMsg(t.invalidOtp);
      return;
    }

    setIsLoading(true);
    try {
      const fullMobile = getFullMobile();
      // Verify OTP code first
      const verifyRes = await verifyOtp({
        mobile: fullMobile,
        otp: fullOtp,
        device_type: 'web',
      });

      if (verifyRes.status) {
        // If user came through the "Create an account" flow, register profile details
        if (mode === 'register' && name.trim()) {
          await register({
            name: name.trim(),
            email: email.trim(),
            mobile: fullMobile,
            country_code: selectedCountry.dial_code,
          });
          setSuccessMsg(t.successRegister);
        } else {
          setSuccessMsg(t.successLogin);
        }

        // Only after successful verification -> move back to home page!
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 800);
      } else {
        setErrorMsg(verifyRes.message || 'Invalid verification code.');
      }
    } catch {
      setErrorMsg('Verification failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Single digit OTP entry
  const handleOtpChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    setErrorMsg(null);

    if (char && index < 5) {
      otpInputs.current[index + 1]?.focus();
      setActiveOtpIndex(index + 1);
    }
  };

  // Backspace in OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
      setActiveOtpIndex(index - 1);
    }
  };

  // Paste into OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasteData[i] || '';
    }
    setOtp(newOtp);
    const targetIdx = Math.min(pasteData.length, 5);
    otpInputs.current[targetIdx]?.focus();
    setActiveOtpIndex(targetIdx);
  };

  // Autofill demo code
  const handleAutofillDemo = () => {
    if (!demoOtp) return;
    const digits = demoOtp.slice(0, 6).split('');
    const padded = [...digits, ...Array(6 - digits.length).fill('')].slice(0, 6);
    setOtp(padded);
    otpInputs.current[5]?.focus();
    setActiveOtpIndex(5);
  };

  // Reusable Country Prefix Dropdown Element
  const renderCountryPrefix = (disabled: boolean = false) => (
    <div className="relative" ref={countryDropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setCountryDropdownOpen(!countryDropdownOpen);
          setCountrySearch('');
        }}
        className="flex items-center gap-2 px-3.5 py-3.5 text-[#1b1b21] font-bold text-sm select-none border-r border-[#e4e1ea]/80 hover:bg-[#eae7ef]/60 transition-colors cursor-pointer h-full disabled:cursor-default disabled:hover:bg-transparent"
        title="Click to select country"
      >
        <Image
          src={selectedCountry.flag}
          alt={selectedCountry.code}
          width={20}
          height={14}
          className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0"
        />
        <span className="font-extrabold text-[#1b1b21]">{selectedCountry.code}</span>
        <span className="font-semibold text-[#1b1b21]">{selectedCountry.dial_code}</span>
        {!disabled && (
          <svg
            className={`w-3.5 h-3.5 text-[#6b6675] transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Country Selector Dropdown Popover */}
      {countryDropdownOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#e4e1ea] p-2 z-[60] animate-in fade-in zoom-in-95 duration-150"
          style={{
            boxShadow: '0 20px 40px -8px rgba(89, 6, 231, 0.2), 0 6px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="p-1 pb-2">
            <input
              type="text"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder="Search code (e.g. IN, +91)..."
              autoFocus
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-[#f5f2fb] border border-[#e4e1ea] outline-none focus:ring-2 focus:ring-[#f5b301]"
            />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1 overscroll-contain pr-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    setCountryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition cursor-pointer ${selectedCountry.code === c.code
                      ? 'bg-[#e7deff] text-[#5906e7] font-bold'
                      : 'hover:bg-[#f5f2fb] text-[#1b1b21]'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={c.flag}
                      alt={c.code}
                      width={20}
                      height={14}
                      className="w-5 h-3.5 object-cover rounded-xs shadow-2xs shrink-0"
                    />
                    <span className="font-extrabold text-sm text-[#1b1b21] tracking-wide">{c.code}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#5906e7]">
                    {c.dial_code}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-[#6b6675]">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-[490px] mx-auto relative z-10 px-2 sm:px-0">
      {/* Focused Single-Pane Auth Card (overflow visible to allow country dropdown to float freely) */}
      <div
        className="w-full bg-white rounded-[32px] p-7 sm:p-9 md:p-10 relative transition-all duration-300"
        style={{
          boxShadow: '0 20px 45px -12px rgba(89, 6, 231, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(234, 231, 239, 0.9)',
        }}
      >

        {/* Headline & Subtitle */}
        <div className="mb-7">
          <h1 className="text-[30px] sm:text-[34px] font-extrabold text-[#1b1b21] tracking-tight leading-tight">
            {step === 'otp'
              ? t.welcomeTitle
              : mode === 'login'
                ? t.welcomeTitle
                : t.registerTitle}
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#555060] mt-2 leading-relaxed">
            {step === 'otp'
              ? t.welcomeSubtitle
              : mode === 'login'
                ? t.welcomeSubtitle
                : t.registerSubtitle}
          </p>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-2xl border border-red-200 flex items-center gap-2.5">
            <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium rounded-2xl border border-emerald-200 flex items-center gap-2.5">
            <svg className="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Container */}
        {step === 'otp' ? (
          /* Verification Screen */
          <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-5">
            {/* Phone Number summary with Edit button */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1b1b21] flex items-center justify-between" htmlFor="otpPhoneDisplay">
                <span>{t.phoneLabel}</span>
                <span className="text-xs font-bold text-[#5906e7]">
                  {t.otpBadge}
                </span>
              </label>

              <div className="flex items-center rounded-2xl bg-[#f5f2fb] overflow-hidden border border-[#e4e1ea]/70">
                {renderCountryPrefix(true)}
                <input
                  id="otpPhoneDisplay"
                  type="text"
                  disabled
                  value={phone}
                  className="w-full bg-transparent px-4 py-3.5 text-[#1b1b21] font-semibold text-sm sm:text-base outline-none tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtp(['', '', '', '', '', '']);
                    setDemoOtp(null);
                    setErrorMsg(null);
                  }}
                  className="px-4 text-sm text-[#5906e7] font-bold hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* OTP Verification Box */}
            <div className="p-4 sm:p-5 bg-[#f7f4fd] rounded-[20px] space-y-4 border border-[#e5dbfd] transition-all duration-300">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-[#20005f]">{t.enterCode}</span>
                {countdown > 0 ? (
                  <span className="text-[#6b6675] font-medium">
                    {t.resendIn} ({countdown}s)
                  </span>
                ) : (
                  <button
                    onClick={() => (mode === 'login' ? handleSendOtp() : handleRegister({ preventDefault: () => { } } as React.FormEvent))}
                    type="button"
                    className="font-bold text-[#5906e7] hover:underline cursor-pointer"
                  >
                    {t.resend}
                  </button>
                )}
              </div>

              {/* 6 OTP Input Boxes */}
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => {
                  const isCurrent = activeOtpIndex === idx;
                  return (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onFocus={() => setActiveOtpIndex(idx)}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className={`w-11 sm:w-13 h-13 sm:h-14 text-center font-bold text-xl rounded-2xl bg-white text-[#5906e7] outline-none shadow-xs transition-all duration-150 ${isCurrent
                        ? 'border-2 border-[#5906e7] ring-2 ring-[#5906e7]/20'
                        : 'border border-[#e8e4f3]'
                        }`}
                    />
                  );
                })}
              </div>

              {/* Demo Code Banner */}
              {demoOtp && (
                <div className="flex items-center justify-between bg-white rounded-xl px-3.5 py-2.5 border border-[#e5dbfd] text-xs sm:text-sm shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#504533]">
                    <span>{t.otpSentBanner}</span>
                    <span className="font-extrabold text-[#5906e7] tracking-wider text-sm">{demoOtp}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutofillDemo}
                    className="px-3.5 py-1.5 bg-[#f5b301] text-[#654800] rounded-lg font-bold text-xs hover:bg-[#febb14] active:scale-95 transition cursor-pointer shadow-xs"
                  >
                    Fill
                  </button>
                </div>
              )}
            </div>

            {/* Verify & Enter Button */}
            <button
              id="submitBtn"
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base tracking-wide active:scale-[0.99] transition-all duration-200 shadow-md bg-[#f5b301] text-[#654800] hover:bg-[#febb14] shadow-[#f5b301]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>{t.btnVerifyOtp}</span>
                  <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        ) : mode === 'login' ? (
          /* Sign In Screen */
          <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1b1b21] flex items-center justify-between" htmlFor="phoneInput">
                <span>{t.phoneLabel}</span>
                <span className="text-xs font-bold text-[#5906e7]">
                  {t.otpBadge}
                </span>
              </label>

              <div className="flex items-center rounded-2xl bg-[#f5f2fb] border border-[#e4e1ea]/70 transition-all duration-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f5b301] focus-within:border-transparent">
                {/* Selectable Country Prefix */}
                {renderCountryPrefix(false)}

                <input
                  id="phoneInput"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t.phonePlaceholder}
                  required
                  className="w-full bg-transparent px-4 py-3.5 text-[#1b1b21] font-semibold text-sm sm:text-base outline-none tracking-wider rounded-r-2xl"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base tracking-wide active:scale-[0.99] transition-all duration-200 shadow-md bg-[#f5b301] text-[#654800] hover:bg-[#febb14] shadow-[#f5b301]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>{t.btnSendOtp}</span>
                  <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Create Account Screen */
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1b1b21]" htmlFor="nameInput">
                {t.nameLabel}
              </label>
              <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                required
                className="w-full rounded-2xl bg-[#f5f2fb] px-4 py-3.5 text-[#1b1b21] font-semibold text-sm sm:text-base outline-none border border-[#e4e1ea]/70 focus:bg-white focus:ring-2 focus:ring-[#f5b301] focus:border-transparent transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1b1b21]" htmlFor="emailInput">
                {t.emailLabel}
              </label>
              <input
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full rounded-2xl bg-[#f5f2fb] px-4 py-3.5 text-[#1b1b21] font-semibold text-sm sm:text-base outline-none border border-[#e4e1ea]/70 focus:bg-white focus:ring-2 focus:ring-[#f5b301] focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number with Selectable Country Prefix */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1b1b21]" htmlFor="regPhoneInput">
                {t.phoneLabel}
              </label>
              <div className="flex items-center rounded-2xl bg-[#f5f2fb] border border-[#e4e1ea]/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f5b301] focus-within:border-transparent transition-all">
                {renderCountryPrefix(false)}
                <input
                  id="regPhoneInput"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t.phonePlaceholder}
                  required
                  className="w-full bg-transparent px-4 py-3.5 text-[#1b1b21] font-semibold text-sm sm:text-base outline-none tracking-wider rounded-r-2xl"
                />
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-bold text-base tracking-wide active:scale-[0.99] transition-all duration-200 shadow-md bg-[#f5b301] text-[#654800] hover:bg-[#febb14] shadow-[#f5b301]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>{t.btnRegister}</span>
                  <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-7 pt-5 border-t border-[#e4e1ea]/80 flex items-center justify-between text-xs text-[#555060]">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#1b1b21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-semibold text-[#1b1b21]">{t.secureOtp}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#f5b301] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-extrabold text-[#1b1b21]">4.9</span>
            <span className="text-[#6b6675] font-medium">{t.reviewsCount}</span>
          </div>
        </div>

        {/* Footer / Terms & Mode Switcher */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-[#6b6675] leading-relaxed">
            {t.termsPrefix}{' '}
            <Link href="/terms" className="text-[#5906e7] font-semibold hover:underline">
              {t.terms}
            </Link>{' '}
            {t.and}{' '}
            <Link href="/privacy" className="text-[#5906e7] font-semibold hover:underline">
              {t.privacy}
            </Link>
            .
          </p>

          {step !== 'otp' && (
            <div>
              {mode === 'login' ? (
                <>
                  <span className="text-xs text-[#6b6675]">{t.newAccountPrefix}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="text-xs text-[#5906e7] ml-1.5 hover:underline font-bold cursor-pointer"
                  >
                    {t.createAccount}
                  </button>
                </>
              ) : (
                <>
                  <span className="text-xs text-[#6b6675]">{t.haveAccountPrefix}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="text-xs text-[#5906e7] ml-1.5 hover:underline font-bold cursor-pointer"
                  >
                    {t.signIn}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
