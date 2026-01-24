'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AuthHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-primary-900/80 backdrop-blur-sm border-b border-primary-200 dark:border-primary-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Asciv"
            width={40}
            height={20}
            className="h-5 w-auto"
          />
          <span className="text-xl font-semibold text-primary-900 dark:text-primary-50">
            Asciv
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!isLoginPage && (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
            >
              Log in
            </Link>
          )}
          {!isSignupPage && (
            <Link
              href="/signup"
              className="btn-primary text-sm"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
