'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Car } from '@/types/car';
import { searchCarImages } from '@/utils/googleSearch';

interface SearchFiltersProps {
  onSearch: (filters: {
    searchQuery: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    fuelType: string;
    seatingCapacity: number;
  }) => void;
}

interface SearchResult {
  link: string;
  title: string;
  image: string;
}

const SearchFilters = memo(({ onSearch }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const brands = [
    'Toyota', 'Honda', 'Maruti Suzuki', 'Hyundai', 'Tata',
    'Mahindra', 'Kia', 'Volkswagen', 'Skoda', 'Renault',
    'Nissan', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
    'Audi', 'Volvo', 'Jaguar', 'Land Rover', 'Porsche'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const seatingOptions = ['2', '4', '5', '7', '8'];

  const debouncedSearch = useCallback(
    (filters: {
      searchQuery: string;
      brand: string;
      minPrice: number;
      maxPrice: number;
      fuelType: string;
      seatingCapacity: number;
    }) => {
      const timer = setTimeout(() => {
        onSearch(filters);
      }, 300);

      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  useEffect(() => {
    const filters = {
      searchQuery,
      brand,
      minPrice: Number(minPrice) || 0,
      maxPrice: Number(maxPrice) || 10000000,
      fuelType,
      seatingCapacity: Number(seatingCapacity) || 0,
    };
    return debouncedSearch(filters);
  }, [searchQuery, brand, minPrice, maxPrice, fuelType, seatingCapacity, debouncedSearch]);

  const handleImageSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCarImages(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching images:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for cars..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleImageSearch(e.target.value);
          }}
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => {
                  setSearchQuery(result.title);
                  setSearchResults([]);
                }}
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium text-center px-2">
                    {result.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-600 font-medium">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand} className="text-gray-900">
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price (₹)
              </label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 placeholder-opacity-100 placeholder-font-medium text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price (₹)
              </label>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 placeholder-opacity-100 placeholder-font-medium text-gray-900"
              />
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-600 font-medium">All Types</option>
              {fuelTypes.map((type) => (
                <option key={type} value={type} className="text-gray-900">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Seating Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seating Capacity
            </label>
            <select
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-600 font-medium">Any</option>
              {seatingOptions.map((seats) => (
                <option key={seats} value={seats} className="text-gray-900">
                  {seats} Seats
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters; 