import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToFavorites, removeFromFavorites } from '../store/gamesSlice';
import { Game } from '../types/game';
import { getGameDetails } from '../services/api';

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.games.favorites);
  const isFavorite = favorites.some(fav => fav.id === Number(id));

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;
      
      try {
        const data = await getGameDetails(Number(id));
        setGame(data);
      } catch (err) {
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!game) return;
    
    if (isFavorite) {
      dispatch(removeFromFavorites(game.id));
    } else {
      dispatch(addToFavorites(game));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || 'Game not found'}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="relative">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite ? 'bg-red-500' : 'bg-gray-800'
          } text-white hover:opacity-90 transition-opacity`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold">{game.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {game.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="prose max-w-none mt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {game.description_raw || game.description}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {game.platforms && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map(({ platform }) => (
                <span
                  key={platform.id}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {platform.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;