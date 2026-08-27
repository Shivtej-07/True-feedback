import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center p-6 bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div>
          © {new Date().getFullYear()} True Feedback. All rights reserved.
        </div>
        <div className="flex gap-6 text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
