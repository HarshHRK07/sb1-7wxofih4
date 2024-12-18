import express from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
  artworkId: z.string(),
});

// Get reviews for artwork
router.get('/artwork/:artworkId', async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { artworkId: req.params.artworkId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(reviews);
});

// Create review
router.post('/', auth, async (req: AuthRequest, res) => {
  const data = reviewSchema.parse(req.body);
  
  const review = await prisma.review.create({
    data: {
      ...data,
      userId: req.user!.id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  
  res.status(201).json(review);
});

export default router;