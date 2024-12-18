import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { prisma } from '../db';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user) throw new Error();
    
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};