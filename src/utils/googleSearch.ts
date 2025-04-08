const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

// Fallback car images
const fallbackImages = [
  {
    link: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3',
    title: 'Luxury Car',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&w=400'
  },
  {
    link: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3',
    title: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&w=400'
  },
  {
    link: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3',
    title: 'SUV Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&w=400'
  }
];

export async function searchCarImages(query: string) {
  try {
    // If no query, return fallback images
    if (!query.trim()) {
      return fallbackImages;
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query + ' car'
      )}&per_page=10&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      console.warn('Failed to fetch from Unsplash, using fallback images');
      return fallbackImages;
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return fallbackImages;
    }

    return data.results.map((item: any) => ({
      link: item.urls.full,
      title: item.alt_description || 'Car image',
      image: item.urls.regular,
    }));
  } catch (error) {
    console.error('Error fetching car images:', error);
    return fallbackImages;
  }
} 