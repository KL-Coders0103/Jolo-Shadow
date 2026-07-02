import { z } from "zod";

export const generatePayslipSchema =
z.object({

body:

z.object({

payrollId:

z.string(),

}),

});