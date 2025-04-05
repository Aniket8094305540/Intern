export interface Game {
  id: number;
  name: string;
  background_image: string;
  description: string;
  description_raw?: string;
  released: string;
  rating: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  metacritic?: number;
  ratings_count?: number;
}

export interface GameFilters {
  category?: string;
  tags?: string[];
  year?: number;
  ordering?: string;
  search?: string;
  page?: number;
}