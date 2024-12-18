import React from 'react';
import { formatPrice } from '../../utils/formatters';

interface ArtworkPriceProps {
  price: number;
  className?: string;
}

export default function ArtworkPrice({ price, className = '' }: ArtworkPriceProps) {
  return (
    <p className={`text-sm font-medium text-gray-900 ${className}`}>
      {formatPrice(price)}
    </p>
  );
}