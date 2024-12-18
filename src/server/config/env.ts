import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  port: process.env.PORT || 3000,
} as const;