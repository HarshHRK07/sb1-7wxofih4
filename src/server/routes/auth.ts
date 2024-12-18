import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { config } from '../config/env';

const router = express.Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = signupSchema.parse(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error();
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;