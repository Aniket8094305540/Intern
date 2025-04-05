import React from 'react';
import { Filter } from 'lucide-react';

const Sidebar = () => {
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  
  return (
    <aside className="w-64 bg-white shadow-md p-6 min-h-screen">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="">All Categories</option>
            <option value="action">Action</option>
            <option value="rpg">RPG</option>
            <option value="strategy">Strategy</option>
            <option value="shooter">Shooter</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Release Year</h3>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="-rating">Popularity</option>
            <option value="-released">Release Date</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
          <div className="space-y-2">
            {['Singleplayer', 'Multiplayer', 'Open World', 'FPS'].map(tag => (
              <label key={tag} className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;