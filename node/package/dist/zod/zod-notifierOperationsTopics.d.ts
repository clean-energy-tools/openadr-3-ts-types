import { z } from "zod";
declare const _default: z.ZodObject<{
    CREATE: z.ZodOptional<z.ZodString>;
    UPDATE: z.ZodString;
    DELETE: z.ZodString;
    ALL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    UPDATE: string;
    DELETE: string;
    CREATE?: string | undefined;
    ALL?: string | undefined;
}, {
    UPDATE: string;
    DELETE: string;
    CREATE?: string | undefined;
    ALL?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-notifierOperationsTopics.d.ts.map