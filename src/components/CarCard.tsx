'use client';

import { Car } from '@/types/car';
import { useWishlist } from '@/context/WishlistContext';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(car);
    toast.success(
      isWishlisted(car.id)
        ? 'Removed from wishlist'
        : 'Added to wishlist'
    );
  };

  return (
    <Link href={`/cars/${car.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          >
            {isWishlisted(car.id) ? (
              <HeartIcon className="h-6 w-6 text-red-500" />
            ) : (
              <HeartOutlineIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {car.brand} {car.model}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ₹{car.price.toLocaleString('en-IN')}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
} 