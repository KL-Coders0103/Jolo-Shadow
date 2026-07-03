import { Request, Response, NextFunction } from 'express';
import { KnowledgeService } from '../services/knowledgeService';
import { DocumentType } from '../generated/prisma/client';

export class KnowledgeController {
  
  static async uploadDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const file = req.file;

      if (!file) {
        res.status(400).json({ status: 'error', message: 'No file uploaded' });
        return;
      }

      const data = {
        title: req.body.title,
        type: req.body.type as DocumentType,
        category: req.body.category
      };

      const result = await KnowledgeService.processAndStoreDocument(companyId, data, file.buffer);
      
      res.status(202).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const { query, limit } = req.body;

      const results = await KnowledgeService.semanticSearch(companyId, query, limit);
      
      res.status(200).json({ status: 'success', data: results });
    } catch (error) {
      next(error);
    }
  }
}