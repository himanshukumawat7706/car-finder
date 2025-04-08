'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/types/car';

interface WishlistContextType {
  wishlist: Car[];
  isWishlisted: (carId: string) => boolean;
  toggleWishlist: (car: Car) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (carId: string) => {
    return wishlist.some(car => car.id === carId);
  };

  const toggleWishlist = (car: Car) => {
    setWishlist(prevWishlist => {
      if (isWishlisted(car.id)) {
        return prevWishlist.filter(item => item.id !== car.id);
      } else {
        return [...prevWishlist, car];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 