'use client';

import React, { useState } from 'react';

export default function MoroccoCoverage() {
  const [suggestCityOpen, setSuggestCityOpen] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [suggestedMsg, setSuggestedMsg] = useState(false);

  const cities = [
    { name: 'Casablanca', districts: 'Maârif, Gauthier, Anfa' },
    { name: 'Rabat - Salé', districts: 'Agdal, Hay Riad' },
    { name: 'Marrakech', districts: 'Guéliz, Hivernage' },
    { name: 'Tangier', districts: 'Malabata' },
    { name: 'Agadir' },
    { name: 'Fez' },
    { name: 'Meknes' },
    { name: 'Kenitra' },
    { name: 'Mohammedia' },
  ];

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setSuggestedMsg(true);
    setTimeout(() => {
      setSuggestedMsg(false);
      setSuggestCityOpen(false);
      setCityInput('');
    }, 2000);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-white border-y border-[#e4e1ea]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#a37000] text-xs font-bold mb-3 border border-amber-200">
          <svg className="w-3.5 h-3.5 text-[#a37000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>National Expansion</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19181f]">
          Available across Morocco
        </h2>
        <p className="text-xs sm:text-sm text-[#54525d] max-w-lg mx-auto mt-2 mb-6 sm:mb-8">
          Delivering across all major metropolitan districts and continuing to expand each month.
        </p>

        {/* Refined city pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
          {cities.map((city) => (
            <span
              key={city.name}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FAF8FC] border border-[#e4e1ea] text-xs font-bold text-[#19181f] flex items-center gap-1.5 hover:border-[#5906e7] transition-colors cursor-pointer select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{city.name}</span>
              {city.districts && (
                <span className="text-[#54525d] font-normal text-[10px] sm:text-[11px]">
                  ({city.districts})
                </span>
              )}
            </span>
          ))}

          <button
            type="button"
            onClick={() => setSuggestCityOpen(true)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-transparent border border-dashed border-[#9e9aa8] text-xs font-semibold text-[#54525d] hover:border-[#19181f] hover:text-[#19181f] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>+</span>
            <span>Suggest your city</span>
          </button>
        </div>

        {/* Suggest City Modal */}
        {suggestCityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 xs:p-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-[#e4e1ea] text-center">
              <h3 className="text-base font-bold text-[#19181f] mb-1">Suggest a City in Morocco</h3>
              <p className="text-xs text-[#54525d] mb-4">
                Tell us which Moroccan town or province we should launch in next!
              </p>
              {suggestedMsg ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                  ✓ Merci! Your suggestion has been recorded.
                </div>
              ) : (
                <form onSubmit={handleSuggest} className="space-y-3">
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="e.g. Oujda, Nador, Tetouan..."
                    autoFocus
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#e4e1ea] outline-none focus:ring-2 focus:ring-[#f5b301]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSuggestCityOpen(false)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-gray-100 text-[#54525d] hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#5906e7] text-white hover:bg-[#4502b8]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
