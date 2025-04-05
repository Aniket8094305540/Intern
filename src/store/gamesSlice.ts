import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../types/game';

interface GamesState {
  favorites: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  favorites: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Game>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(game => game.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = gamesSlice.actions;
export default gamesSlice.reducer;