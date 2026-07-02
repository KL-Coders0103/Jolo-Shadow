import {
  Schema,
  model,
} from "mongoose";

import {
  baseSchemaOptions,
} from "../common/constants/database";

import {
  IPayslip,
} from "../modules/payslip/payslipTypes";

const payslipSchema =
new Schema<IPayslip>(
{

employeeId:{
type:Schema.Types.ObjectId,
ref:"User",
required:true,
},

companyId:{
type:Schema.Types.ObjectId,
ref:"Company",
required:true,
},

payrollId:{
type:Schema.Types.ObjectId,
ref:"Payroll",
required:true,
},

month:{
type:Number,
required:true,
},

year:{
type:Number,
required:true,
},

pdfUrl:String,

emailed:{
type:Boolean,
default:false,
},

emailedAt:Date,

generatedAt:{
type:Date,
default:Date.now,
},

deletedAt:Date,

downloadedAt: {
  type: Date,
},

downloadCount: {
  type: Number,
  default: 0,
},

},
baseSchemaOptions,
);

payslipSchema.index({
employeeId:1,
month:1,
year:1,
});

payslipSchema.index({
companyId:1,
});

export const Payslip =
model<IPayslip>(
"Payslip",
payslipSchema,
);