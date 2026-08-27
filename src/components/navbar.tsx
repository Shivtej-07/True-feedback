'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* Brand & Left Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <Link href="/" className="text-xl font-bold">
            True Feedback
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                isActive('/') ? 'text-white underline underline-offset-4' : 'text-gray-400'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                isActive('/about') ? 'text-white underline underline-offset-4' : 'text-gray-400'
              }`}
            >
              About
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                  isActive('/dashboard') ? 'text-white underline underline-offset-4' : 'text-gray-400'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-3 w-full pt-4 border-t border-gray-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium ${isActive('/') ? 'text-white' : 'text-gray-400'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium ${isActive('/about') ? 'text-white' : 'text-gray-400'}`}
            >
              About
            </Link>
            {session && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${isActive('/dashboard') ? 'text-white' : 'text-gray-400'}`}
              >
                Dashboard
              </Link>
            )}
          </div>
        )}

        {/* User Actions */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          {session ? (
            <>
              <span className="text-sm">
                Welcome, {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;