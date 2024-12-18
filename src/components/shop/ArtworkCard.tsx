import React from 'react';
import { Heart } from 'lucide-react';
import type { ArtWork } from '../../types';
import { ROUTES } from '../../constants/routes';
import Button from '../ui/Button';
import ArtworkPrice from './ArtworkPrice';

interface ArtworkCardProps {
  artwork: ArtWork;
  onAddToWishlist?: (id: string) => void;
}

export default function ArtworkCard({ artwork, onAddToWishlist }: ArtworkCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={ROUTES.ARTWORK(artwork.id)}>
              <span aria-hidden="true" className="absolute inset-0" />
              {artwork.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{artwork.category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToWishlist?.(artwork.id)}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <ArtworkPrice price={artwork.price} />
        </div>
      </div>
    </div>
  );
}