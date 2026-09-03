import type { Metadata } from 'next';
import LoginForm from '@/modules/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Sign In - Orders au Maroc',
  description: 'Sign in with your phone number via instant SMS OTP to order from top restaurants, groceries, pharmacies, and courier express across Morocco.',
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-x-hidden">
      {/* Ambient Backdrop Light Glows matching stitch design */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -translate-y-1/2 opacity-70"
        style={{ backgroundColor: 'rgba(245, 179, 1, 0.15)' }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none translate-y-1/2 opacity-60"
        style={{ backgroundColor: 'rgba(89, 6, 231, 0.10)' }}
      />

      {/* Main Form Component */}
      <LoginForm />
    </div>
  );
}
