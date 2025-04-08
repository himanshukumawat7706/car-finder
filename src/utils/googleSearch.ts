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

interface SearchResult {
  link: string;
  title: string;
  image: string;
}

export async function searchCarImages(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}&searchType=image`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.items.map((item: SearchResult) => ({
      link: item.link,
      title: item.title,
      image: item.image
    }));
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
} 