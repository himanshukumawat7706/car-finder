import { NextRequest, NextResponse } from 'next/server';
import { mockCars } from '@/data/mockCars';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const car = mockCars.find(car => car.id === params.id);

  if (!car) {
    return NextResponse.json(
      { error: 'Car not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(car);
} 