import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwtUtil';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        companyId: string;
        role: string;
      };
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ status: 'error', message: 'Authentication required' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token) as any;
    req.user = {
      userId: decoded.userId,
      companyId: decoded.companyId,
      role: decoded.role
    };
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid or expired access token' });
    return;
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ 
        status: 'error', 
        message: 'You do not have permission to perform this action' 
      });
      return;
    }
    next();
  };
};