'use client';

import { useState, useEffect, useCallback, memo } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: {
    brand?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    seatingCapacity?: number;
  }) => void;
}

const SearchFilters = memo(({ onSearch }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleSearch = () => {
    onSearch({
      brand: filters.brand || undefined,
      model: filters.model || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      fuelType: filters.fuelType || undefined,
      seatingCapacity: filters.seatingCapacity ? Number(filters.seatingCapacity) : undefined
    });
  };

  const debouncedSearch = useCallback(
    (filters: {
      brand?: string;
      model?: string;
      minPrice?: number;
      maxPrice?: number;
      fuelType?: string;
      seatingCapacity?: number;
    }) => {
      const timer = setTimeout(() => {
        onSearch(filters);
      }, 500);
      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const searchFilters = {
      brand: filters.brand || undefined,
      model: filters.model || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      fuelType: filters.fuelType || undefined,
      seatingCapacity: filters.seatingCapacity ? Number(filters.seatingCapacity) : undefined
    };
    return debouncedSearch(searchFilters);
  }, [filters, debouncedSearch]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for cars..."
          value={filters.model}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 placeholder-opacity-100 placeholder-font-medium text-gray-900"
        />
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Toggle filters"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">All Brands</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 placeholder-opacity-100 placeholder-font-medium text-gray-900"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 placeholder-opacity-100 placeholder-font-medium text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">All Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seating Capacity
              </label>
              <select
                value={filters.seatingCapacity}
                onChange={(e) => setFilters({ ...filters, seatingCapacity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Any</option>
                <option value="2">2 Seater</option>
                <option value="4">4 Seater</option>
                <option value="5">5 Seater</option>
                <option value="7">7 Seater</option>
                <option value="8">8+ Seater</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters; 