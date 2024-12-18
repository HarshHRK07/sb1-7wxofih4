import express from 'express';
import { prisma } from '../db';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all artworks
router.get('/', async (req, res) => {
  const artworks = await prisma.artwork.findMany({
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.json(artworks);
});

// Get single artwork
router.get('/:id', async (req, res) => {
  const artwork = await prisma.artwork.findUnique({
    where: { id: req.params.id },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  
  if (!artwork) {
    return res.status(404).json({ error: 'Artwork not found' });
  }
  
  res.json(artwork);
});

// Create artwork (admin only)
router.post('/', auth, async (req: AuthRequest, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const artwork = await prisma.artwork.create({
    data: req.body,
  });
  
  res.status(201).json(artwork);
});

// Update artwork (admin only)
router.put('/:id', auth, async (req: AuthRequest, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const artwork = await prisma.artwork.update({
    where: { id: req.params.id },
    data: req.body,
  });
  
  res.json(artwork);
});

// Delete artwork (admin only)
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await prisma.artwork.delete({
    where: { id: req.params.id },
  });
  
  res.status(204).send();
});

export default router;