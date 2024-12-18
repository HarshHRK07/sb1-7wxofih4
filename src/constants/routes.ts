export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  SHOP: '/shop',
  ABOUT: '/about',
  ARTWORK: (id: string) => `/artwork/${id}`,
  CART: '/cart',
  PROFILE: '/profile',
} as const;