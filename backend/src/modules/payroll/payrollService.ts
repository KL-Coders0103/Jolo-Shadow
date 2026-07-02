import mongoose from "mongoose";

import { SalaryStructure } from "../../models/salaryStructureModel";
import { Attendance } from "../../models/attendanceModel";
import { Leave } from "../../models/leaveModel";
import { Payroll } from "../../models/payrollModel";

import { payrollRepository } from "./payrollRepository";

import { ApiError } from "../../common/errors/ApiError";
import { HTTP_STATUS } from "../../common/errors/errorCodes";

import {
  PayrollStatus,
  LeaveStatus,
} from "../../common/constants/enums";
import { bonusService } from "../bonus/bonusService";
import { deductionService } from "../deduction/deductionService";
import { exportPayrollExcel } from "../../common/utils/exportPayrollExcel";
import { exportPayrollPdf } from "../../common/utils/exportPayrollPdf";

class PayrollService {

    async generatePayroll(
        companyId: string,
        data: {
            employeeId: string;
            month: number;
            year: number;
        },
        ) {

        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            const existingPayroll = await payrollRepository.findOne(
            data.employeeId,
            companyId,
            data.month,
            data.year,
            );

            if(existingPayroll){
                throw new ApiError(HTTP_STATUS.BAD_REQUEST,"Payroll already generated");
            }

            const salaryStructure =await SalaryStructure.findOne({
                employeeId:data.employeeId,
                companyId,
                isActive:true,
                deletedAt:null,
            }).session(session);

            if(!salaryStructure){
                throw new ApiError(HTTP_STATUS.NOT_FOUND,"Salary structure not found");
            }

            const startDate =new Date(data.year,data.month-1, 1);

            const endDate =new Date(data.year,data.month,0,23,59,59);

            const attendance =await Attendance.find({
                employeeId: data.employeeId,
                createdAt:{
                    $gte:startDate,
                    $lte:endDate,
                },
                deletedAt:null,
            }).session(session);

            const approvedLeaves = await Leave.countDocuments({
                employeeId:data.employeeId,
                status:LeaveStatus.APPROVED,
                startDate:{
                    $gte:startDate,
                },
                endDate:{
                    $lte:endDate,
                },
            }).session(session);

            const workingDays = this.calculateWorkingDays(data.month, data.year);

            const presentDays = attendance.length;

            const leaveDays = approvedLeaves;

            const absentDays = Math.max(workingDays - presentDays - leaveDays, 0);

            const lopAmount = this.calculateLOP(salaryStructure.netSalary,workingDays, absentDays);

            const totalBonus = await bonusService.getApprovedBonusAmount(data.employeeId, data.month, data.year);

            const totalDeduction = await deductionService.getApprovedDeductionAmount(data.employeeId, data.month, data.year);

            const grossSalary = salaryStructure.basicSalary + salaryStructure.hra + salaryStructure.allowances + totalBonus;

            const finalNetSalary = grossSalary - salaryStructure.pf - salaryStructure.professionalTax - salaryStructure.incomeTax - totalDeduction - lopAmount;

            const payroll = await payrollRepository.create({
                employeeId:data.employeeId,
                companyId,
                salaryStructureId:salaryStructure._id,
                month:data.month,
                year:data.year,
                workingDays,
                presentDays,
                absentDays,
                leaveDays,
                basicSalary:salaryStructure.basicSalary,
                hra:salaryStructure.hra,
                allowances:salaryStructure.allowances,
                bonus: totalBonus,
                grossSalary,
                pf:salaryStructure.pf,
                professionalTax:salaryStructure.professionalTax,
                incomeTax:salaryStructure.incomeTax,
                otherDeductions:salaryStructure.otherDeductions,
                netSalary:finalNetSalary,
                status:PayrollStatus.GENERATED,
                generatedAt:new Date(),
            });

            await session.commitTransaction();
            return payroll;
        }catch(error){
            await session.abortTransaction();
            throw error;
        }finally{
            session.endSession();
        }
    }

    private calculateWorkingDays(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    private calculateLOP(netSalary: number, workingDays: number, absentDays: number) {
        const dailySalary = netSalary / workingDays;

        return (dailySalary * absentDays);
    }

    async regeneratePayroll(companyId:string, payrollId:string){
        const payroll = await payrollRepository.getById(payrollId);

        if(!payroll){
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payroll not found");
        }

        await payrollRepository.softDelete(payrollId);

        return this.generatePayroll(
            companyId,
            {
                employeeId: String(payroll.employeeId),
                month: payroll.month,
                year: payroll.year,
            },
        );
    }

    async getPayrolls(companyId:string){
        return payrollRepository.getAll(
        companyId,
        );
    }

    async getPayrollById(id:string){
        const payroll = await payrollRepository.getById(id);

        if(!payroll){
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payroll not found");
        }

        return payroll;
    }

    async deletePayroll(id:string){

        const payroll = await payrollRepository.getById(id);

        if(!payroll){
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payroll not found");
        }

        return payrollRepository.softDelete(id);
    }

    async searchPayroll(companyId:string, query:{
        employeeId?:string;
        month?:number;
        year?:number;
        status?: string;
        page?: string;
        limit?: string;
    }) {
        const filter: any = {
            companyId,
            deletedAt: null,
        };

        if (query.employeeId) {
            filter.employeeId = query.employeeId;
        }

        if (query.month) {
            filter.month = Number(query.month);
        }

        if (query.year) {
            filter.year = Number(query.year);
        }

        if (query.status) {
            filter.status = query.status;
        }   

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Payroll.find(filter)
                .populate("employeeId", "firstName lastName email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Payroll.countDocuments(filter),
        ]);

        return {
            items,
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }

    async getAnalytics(companyId:string){
        const analytics = await Payroll.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(companyId),
                    deletedAt: null,
                }
            },
            {
                $group: {
                    _id: null,
                    totalPayrolls: { $sum: 1 },
                    totalSalaryPaid: { $sum: "$netSalary" },
                    averageSalary: { $avg: "$netSalary" },
                    heightestSalary: { $max: "$netSalary" },
                    lowestSalary: { $min: "$netSalary" },
                }
            },
        ]);

        return (
            analytics[0] || {
                totalPayrolls: 0,
                totalSalaryPaid: 0,
                averageSalary: 0,
                heightestSalary: 0,
                lowestSalary: 0,
            }
        );
    }

    async approvePayroll(id:string){
        const payroll = await payrollRepository.getById(id);

        if(!payroll){
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payroll not found");
        }

        if(payroll.status !== PayrollStatus.GENERATED){
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Only generated payroll can be approved");
        }

        return payrollRepository.update(id, {
            status: PayrollStatus.APPROVED,
        });
    }

    async markAsPaid(id:string){
        const payroll = await payrollRepository.getById(id);

        if(!payroll){
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Payroll not found");
        }

        if(payroll.status !== PayrollStatus.APPROVED){
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Payroll must be approved before payment");
        }

        return payrollRepository.update(id, {
            status: PayrollStatus.PAID,
            paidAt: new Date(),
        });
    }    

    async lockPayroll(
        payrollId: string,
        lockedBy: string,
        ) {
        const payroll =
            await payrollRepository.getById(
            payrollId,
            );

        if (!payroll) {
            throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Payroll not found",
            );
        }

        if (payroll.isLocked) {
            throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Payroll already locked",
            );
        }

        if (
            payroll.status !==
            PayrollStatus.APPROVED
        ) {
            throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Approve payroll before locking",
            );
        }

        return payrollRepository.lockPayroll(
            payrollId,
            lockedBy,
        );
    }

    async unlockPayroll(
        payrollId: string,
        ) {
        const payroll =
            await payrollRepository.getById(
            payrollId,
            );

        if (!payroll) {
            throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Payroll not found",
            );
        }

        if (!payroll.isLocked) {
            throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Payroll is already unlocked",
            );
        }

        if (
            payroll.status ===
            PayrollStatus.PAID
        ) {
            throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Paid payroll cannot be unlocked",
            );
        }

        return payrollRepository.unlockPayroll(
            payrollId,
        );
    }

    async getPayrollHistory(
        companyId: string,
        employeeId: string,
        page = 1,
        limit = 10,
        ) {
        return payrollRepository.getEmployeePayrollHistory(
            companyId,
            employeeId,
            page,
            limit,
        );
    }

    async getDepartmentWiseSalaryReport(
        companyId: string,
        ) {
        return payrollRepository.getDepartmentWiseSalary(
            companyId,
        );
    }

    async getMonthlyPayrollReport(
        companyId: string,
        ) {
        return payrollRepository.getMonthlyPayrollReport(
            companyId,
        );
    }

    async getSalaryExpenseReport(
        companyId: string,
        ) {
        return payrollRepository.getSalaryExpenseReport(
            companyId,
        );
    }

    async getYearlyPayrollReport(
        companyId: string,
        ) {
        return payrollRepository.getYearlyPayrollReport(
            companyId,
        );
    }

    async exportPayrollExcel(
        companyId: string,
        ) {
        const payrolls =
            await payrollRepository.exportPayroll(
            companyId,
            );

        return exportPayrollExcel(
            payrolls,
        );
    }

    async exportPayrollPdf(
        companyId: string,
        ) {
        const payrolls =
            await payrollRepository.exportPayroll(
            companyId,
            );

        return exportPayrollPdf(
            payrolls,
        );
    }
}

export const payrollService =
new PayrollService();