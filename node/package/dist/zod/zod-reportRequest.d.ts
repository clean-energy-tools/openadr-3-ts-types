import { z } from "zod";
declare const _default: z.ZodObject<{
    eventID: z.ZodString;
    clientName: z.ZodString;
    reportName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
        objectType: z.ZodOptional<z.ZodLiteral<"REPORT_PAYLOAD_DESCRIPTOR">>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        confidence: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number | null;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
    }, {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | null | undefined;
    }>, "many">>>;
    resources: z.ZodArray<z.ZodObject<{
        resourceName: z.ZodString;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodString;
            duration: z.ZodDefault<z.ZodString>;
            randomizeStart: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            duration: string;
            randomizeStart: string;
        }, {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }>>;
        intervals: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            intervalPeriod: z.ZodOptional<z.ZodObject<{
                start: z.ZodString;
                duration: z.ZodDefault<z.ZodString>;
                randomizeStart: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                duration: string;
                randomizeStart: string;
            }, {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }>>;
            payloads: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodNumber;
                    y: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    x: number;
                    y: number;
                }, {
                    x: number;
                    y: number;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration: string;
                randomizeStart: string;
            } | undefined;
        }, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration: string;
                randomizeStart: string;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start: string;
            duration: string;
            randomizeStart: string;
        } | undefined;
    }, {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    payloadDescriptors: {
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number | null;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
    }[] | null;
    eventID: string;
    clientName: string;
    reportName: string | null;
    resources: {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration: string;
                randomizeStart: string;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start: string;
            duration: string;
            randomizeStart: string;
        } | undefined;
    }[];
}, {
    eventID: string;
    clientName: string;
    resources: {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number;
                    y: number;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }[];
    payloadDescriptors?: {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | null | undefined;
    }[] | null | undefined;
    reportName?: string | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-reportRequest.d.ts.map