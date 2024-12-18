import React from 'react';
import type { ArtWork } from '../../types';
import ArtworkCard from './ArtworkCard';

interface ArtworkGridProps {
  artworks: ArtWork[];
  onAddToWishlist?: (id: string) => void;
}

export default function ArtworkGrid({ artworks, onAddToWishlist }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
}