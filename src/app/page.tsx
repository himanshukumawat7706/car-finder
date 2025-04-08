'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchFilters from '@/components/SearchFilters';
import CarCard from '@/components/CarCard';
import { mockCars } from '@/data/mockCars';
import { Car } from '@/types/car';
import { WishlistProvider } from '@/context/WishlistContext';

const HomePage = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSearch = useCallback((filters: {
    brand?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    seatingCapacity?: number;
  }) => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = mockCars.filter(car => {
        const searchQuery = filters.model?.toLowerCase() || '';
        const matchesSearch = searchQuery ? 
          car.brand.toLowerCase().includes(searchQuery) || 
          car.model.toLowerCase().includes(searchQuery) : true;
        const matchesBrand = !filters.brand || car.brand === filters.brand;
        const matchesPrice = (!filters.minPrice || car.price >= filters.minPrice) && 
                           (!filters.maxPrice || car.price <= filters.maxPrice);
        const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;
        const matchesSeating = !filters.seatingCapacity || car.seatingCapacity === filters.seatingCapacity;

        return matchesSearch && matchesBrand && matchesPrice && matchesFuelType && matchesSeating;
      });

      // Sort the filtered results alphabetically by brand and model
      const sortedResults = [...filtered].sort((a, b) => {
        // First sort by brand
        const brandCompare = a.brand.localeCompare(b.brand);
        if (brandCompare !== 0) return brandCompare;
        
        // If brands are the same, sort by model
        return a.model.localeCompare(b.model);
      });

      setFilteredCars(sortedResults);
      setLoading(false);
    }, 500);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <WishlistProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Perfect Car
            </h1>
            <p className="text-lg text-gray-600">
              Browse through our extensive collection of cars and find the one that matches your needs
            </p>
          </div>

          <SearchFilters onSearch={handleSearch} />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No cars found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters to find more results
              </p>
            </div>
          )}
        </div>
      </main>
    </WishlistProvider>
  );
};

export default HomePage;
