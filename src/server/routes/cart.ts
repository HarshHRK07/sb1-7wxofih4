import express from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

const cartItemSchema = z.object({
  artworkId: z.string(),
  quantity: z.number().min(1),
});

// Get user's cart
router.get('/', auth, async (req: AuthRequest, res) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.user!.id },
    include: {
      items: {
        include: {
          artwork: true,
        },
      },
    },
  });
  
  res.json(cart);
});

// Add item to cart
router.post('/items', auth, async (req: AuthRequest, res) => {
  const { artworkId, quantity } = cartItemSchema.parse(req.body);
  
  const cart = await prisma.cart.upsert({
    where: { userId: req.user!.id },
    create: {
      userId: req.user!.id,
      items: {
        create: { artworkId, quantity },
      },
    },
    update: {
      items: {
        upsert: {
          where: {
            cartId_artworkId: {
              cartId: req.user!.id,
              artworkId,
            },
          },
          create: { artworkId, quantity },
          update: { quantity },
        },
      },
    },
    include: { items: true },
  });
  
  res.json(cart);
});

// Remove item from cart
router.delete('/items/:artworkId', auth, async (req: AuthRequest, res) => {
  await prisma.cartItem.delete({
    where: {
      cartId_artworkId: {
        cartId: req.user!.id,
        artworkId: req.params.artworkId,
      },
    },
  });
  
  res.status(204).send();
});

export default router;