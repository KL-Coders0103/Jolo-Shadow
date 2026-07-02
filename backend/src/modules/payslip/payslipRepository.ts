import { Payslip } from "../../models/payslipModel";

class PayslipRepository {

async create(
data:any,
){

return Payslip.create(data);

}

async findByPayroll(
payrollId:string,
){

return Payslip.findOne({

payrollId,

deletedAt:null,

});

}

async getById(
id:string,
){

return Payslip.findById(id)

.populate(
"employeeId",
"firstName lastName email",
)

.populate(
"payrollId",
);

}

async getEmployeeHistory(
employeeId:string,
){

return Payslip.find({

employeeId,

deletedAt:null,

})

.sort({

createdAt:-1,

});

}

async search(
companyId:string,
query:any,
){

const filter:any={

companyId,

deletedAt:null,

};

if(query.month){

filter.month=
Number(query.month);

}

if(query.year){

filter.year=
Number(query.year);

}

if(query.employeeId){

filter.employeeId=
query.employeeId;

}

return Payslip.find(filter)

.populate(
"employeeId",
"firstName lastName email",
)

.sort({

createdAt:-1,

});

}

async update(
id:string,
data:any,
){

return Payslip.findByIdAndUpdate(

id,

data,

{

new:true,

},

);

}

}

export const payslipRepository=
new PayslipRepository();