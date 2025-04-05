import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';

const CLERK_PUBLISHABLE_KEY = 'pk_test_c3RhcnRsZWQtY2hpcG11bmstOTguY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<GameList />} />
                  <Route path="/game/:id" element={<GameDetails />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

export default App;