import { Request, Response, NextFunction } from 'express';

export const sellerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.role !== 'SELLER') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};
