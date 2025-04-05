import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Game } from '../types/game';
import { getGames } from '../services/api';

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getGames({});
        setGames(response.results);
      } catch (err) {
        setError('Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <Link 
          key={game.id} 
          to={`/game/${game.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {game.rating.toFixed(1)}
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{game.name}</h2>
            <div className="flex flex-wrap gap-2">
              {game.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Released: {new Date(game.released).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameList;