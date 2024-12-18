export interface ArtWork {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  dimensions: string;
  inStock: boolean;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  artworkId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface CartItem {
  artworkId: string;
  quantity: number;
}