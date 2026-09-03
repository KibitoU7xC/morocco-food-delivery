import React from 'react';
import {
  HomeNavbar,
  HeroSection,
  ServicePills,
  BelovedBrands,
  EcosystemCards,
  MoroccoCoverage,
  AppPromo,
  PartnerOnboarding,
  HomeFooter,
} from '@/modules/home';

export const metadata = {
  title: 'Orders au Maroc - Food Delivery, Grocery, Pharmacy & Express Courier',
  description:
    'Order delicious meals from your favorite restaurants, fresh market groceries, or request quick couriers across Morocco.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] text-[#19181f] selection:bg-[#ffdea5] selection:text-[#271900]">
      <HomeNavbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <ServicePills />
        <BelovedBrands />
        <EcosystemCards />
        <MoroccoCoverage />
        <AppPromo />
        <PartnerOnboarding />
      </main>
      <HomeFooter />
    </div>
  );
}
