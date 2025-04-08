export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  imageUrl: string;
  description: string;
  features: string[];
}

export interface FilterOptions {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  seatingCapacity?: number;
} 