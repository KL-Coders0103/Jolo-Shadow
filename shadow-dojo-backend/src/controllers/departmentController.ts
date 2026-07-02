import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '../services/departmentService';

export class DepartmentController {
  
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const result = await DepartmentService.createDepartment(companyId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const result = await DepartmentService.getDepartments(companyId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const { id } = req.params;
      const result = await DepartmentService.updateDepartment(companyId, id, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const { id } = req.params;
      const result = await DepartmentService.deleteDepartment(companyId, id);
      res.status(200).json({ status: 'success', message: result.message });
    } catch (error) {
      next(error);
    }
  }
}