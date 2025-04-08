'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Car } from '@/types/car';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { WishlistProvider } from '@/context/WishlistContext';
import Image from 'next/image';

function CarDetailsContent({ car }: { car: Car }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleWishlistClick = () => {
    toggleWishlist(car);
    toast.success(
      isWishlisted(car.id)
        ? 'Removed from wishlist'
        : 'Added to wishlist'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Cars
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.model}
                </h1>
                <p className="text-gray-700">{car.year}</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                ₹{car.price.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[400px]">
                <Image
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">Description</h2>
                  <p className="text-gray-700">{car.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">Features</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">
                      Fuel: {car.fuelType}
                    </span>
                    <span className="text-gray-700">
                      Seats: {car.seatingCapacity}
                    </span>
                  </div>
                  <button
                    onClick={handleWishlistClick}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    {isWishlisted(car.id) ? (
                      <HeartIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartOutlineIcon className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarDetails() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cars/${params.id}`);
        if (!response.ok) {
          throw new Error('Car not found');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-8 text-gray-900">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center py-8 text-gray-900">Car not found</div>;
  }

  return (
    <WishlistProvider>
      <CarDetailsContent car={car} />
    </WishlistProvider>
  );
} 