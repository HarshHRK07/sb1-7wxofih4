import React from 'react';
import { ROUTES } from '../../constants/routes';

const navItems = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Gallery', href: ROUTES.GALLERY },
  { label: 'Shop', href: ROUTES.SHOP },
  { label: 'About', href: ROUTES.ABOUT },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}