import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employeeService';

export class EmployeeController {
  
  static async invite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const inviterId = req.user!.userId;
      
      const result = await EmployeeService.inviteEmployee(companyId, inviterId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async bulkInvite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const inviterId = req.user!.userId;

      const result = await EmployeeService.bulkInvite(companyId, inviterId, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.user!.companyId;
      const employeeId = req.params.id;
      
      const result = await EmployeeService.updateEmployee(companyId, employeeId, req.body);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }
}