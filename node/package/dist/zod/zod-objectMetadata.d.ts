import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodString;
    createdDateTime: z.ZodString;
    modificationDateTime: z.ZodString;
    objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
}, "strip", z.ZodTypeAny, {
    objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    id: string;
    createdDateTime: string;
    modificationDateTime: string;
}, {
    objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    id: string;
    createdDateTime: string;
    modificationDateTime: string;
}>;
export default _default;
//# sourceMappingURL=zod-objectMetadata.d.ts.map