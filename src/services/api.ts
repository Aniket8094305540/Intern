import axios from 'axios';
import { Game, GameFilters } from '../types/game';

const API_KEY = '8c7e6d52e5f34c1bb29f0e7c97e9c7e4'; // RAWG API key
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

interface RAWGResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export const getGames = async (filters: GameFilters): Promise<RAWGResponse> => {
  const response = await api.get<RAWGResponse>('/games', {
    params: {
      page_size: 20,
      ...filters,
    },
  });
  return response.data;
};

export const getGameDetails = async (id: number): Promise<Game> => {
  const response = await api.get<Game>(`/games/${id}`);
  return response.data;
};