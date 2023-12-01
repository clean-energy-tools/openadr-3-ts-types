import { z } from "zod";
declare const _default: z.ZodObject<{
    type: z.ZodDefault<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
}, {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
}>;
export default _default;
//# sourceMappingURL=zod-problem.d.ts.map