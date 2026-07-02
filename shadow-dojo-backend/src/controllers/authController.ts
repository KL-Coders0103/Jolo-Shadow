import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Company and Admin registered successfully',
        data: result
      });
    } catch (error: any) {
      if (error.message === 'Email is already in use') {
        res.status(409).json({ status: 'error', message: error.message });
        return;
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials' || error.message === 'User account is not active') {
        res.status(401).json({ status: 'error', message: error.message });
        return;
      }
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.refreshToken(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Tokens refreshed successfully',
        data: result
      });
    } catch (error: any) {
      if (error.message === 'Invalid or expired refresh token' || error.message === 'Invalid or revoked refresh token') {
        res.status(401).json({ status: 'error', message: error.message });
        return;
      }
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.logout(req.body);
      res.status(200).json({
        status: 'success',
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}