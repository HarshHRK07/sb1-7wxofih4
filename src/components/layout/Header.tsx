import React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import Navigation from './Navigation';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ArtPrints</h1>
          </div>
          
          <Navigation />

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}