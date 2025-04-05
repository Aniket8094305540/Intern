import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { TowerControl as GameController, Search, BookMarked } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GameController className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">GameVault</span>
          </Link>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link to="/library" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <BookMarked className="h-5 w-5" />
                  <span>Library</span>
                </Link>
                <UserButton />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;