import express from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { auth, AuthRequest } from '../middleware/auth';
import Stripe from 'stripe';
import { config } from '../config/env';

const router = express.Router();
const stripe = new Stripe(config.stripeSecretKey);

// Get user's orders
router.get('/', auth, async (req: AuthRequest, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: {
      items: {
        include: {
          artwork: true,
        },
      },
    },
  });
  
  res.json(orders);
});

// Create order and checkout session
router.post('/checkout', auth, async (req: AuthRequest, res) => {
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

  if (!cart?.items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.artwork.title,
          images: item.artwork.images,
        },
        unit_amount: Math.round(item.artwork.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${config.clientUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.clientUrl}/cart`,
  });

  res.json({ sessionId: session.id });
});

// Webhook for handling successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Create order and clear cart
    // Implementation details depend on your specific needs
  }

  res.json({ received: true });
});

export default router;