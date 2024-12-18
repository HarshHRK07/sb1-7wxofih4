import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import ArtworkCard from './components/shop/ArtworkCard';
import { featuredArtworks } from './data/mockData';
import { useCart } from './hooks/useCart';

function App() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Artworks</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onAddToWishlist={() => addToCart(artwork.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;