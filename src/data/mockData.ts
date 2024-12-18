import type { ArtWork } from '../types';

export const featuredArtworks: ArtWork[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    description: 'A vibrant digital painting exploring color and movement',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80'],
    category: 'Abstract',
    tags: ['digital', 'abstract', 'colorful'],
    dimensions: '24x36',
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Urban Dreams',
    description: 'Contemporary cityscape with a dreamy atmosphere',
    price: 149.99,
    images: ['https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80'],
    category: 'Urban',
    tags: ['cityscape', 'modern', 'architecture'],
    dimensions: '30x40',
    inStock: true,
    createdAt: new Date(),
  },
];