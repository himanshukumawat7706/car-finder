'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TruckIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useWishlist } from '@/context/WishlistContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before showing the wishlist count
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <TruckIcon className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">CarFinder</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/wishlist"
              className="relative px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <div className="flex items-center">
                <HeartIcon className="h-5 w-5 mr-1" />
                Wishlist
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 