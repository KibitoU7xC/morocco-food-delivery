import type { Metadata } from 'next';
import LoginForm from '@/modules/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Create an Account - Orders au Maroc',
  description: 'Join Orders au Maroc for fast food, grocery, pharmacy and courier delivery across Morocco.',
};

export default function RegisterPage() {
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

      {/* Main Registration Component */}
      <LoginForm initialMode="register" />
    </div>
  );
}
