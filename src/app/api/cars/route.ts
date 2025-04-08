import { NextRequest, NextResponse } from 'next/server';
import { mockCars } from '@/data/mockCars';
import { searchCarImages } from '@/utils/googleSearch';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Get filter parameters
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const fuelType = searchParams.get('fuelType');
  const seatingCapacity = searchParams.get('seatingCapacity');
  const searchQuery = searchParams.get('search');

  // Start with all cars
  let filteredCars = [...mockCars];

  // Apply filters
  if (brand) {
    filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
  }

  if (minPrice) {
    filteredCars = filteredCars.filter(car => car.price >= Number(minPrice));
  }

  if (maxPrice) {
    filteredCars = filteredCars.filter(car => car.price <= Number(maxPrice));
  }

  if (fuelType) {
    filteredCars = filteredCars.filter(car => car.fuelType.toLowerCase() === fuelType.toLowerCase());
  }

  if (seatingCapacity) {
    filteredCars = filteredCars.filter(car => car.seatingCapacity === Number(seatingCapacity));
  }

  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.description.toLowerCase().includes(query)
    );
  }

  // Fetch images for filtered cars
  const carsWithImages = await Promise.all(
    filteredCars.map(async (car) => {
      const searchQuery = `${car.brand} ${car.model} ${car.year}`;
      const images = await searchCarImages(searchQuery);
      return {
        ...car,
        imageUrl: images[0] || car.imageUrl
      };
    })
  );

  return NextResponse.json(carsWithImages);
} 