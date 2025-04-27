import { z } from "zod";
declare const _default: z.ZodObject<{
    start: z.ZodOptional<z.ZodString>;
    duration: z.ZodDefault<z.ZodString>;
    randomizeStart: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    duration: string;
    randomizeStart: string;
    start?: string | undefined;
}, {
    duration?: string | undefined;
    start?: string | undefined;
    randomizeStart?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-intervalPeriod.d.ts.map