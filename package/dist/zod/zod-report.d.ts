import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodDefault<z.ZodString>;
    modificationDateTime: z.ZodDefault<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"REPORT">>;
    programID: z.ZodString;
    eventID: z.ZodString;
    clientName: z.ZodString;
    reportName: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
        confidence: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }, {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }>, "many">>>>;
    resources: z.ZodArray<z.ZodObject<{
        resourceName: z.ZodString;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodDefault<z.ZodString>;
            duration: z.ZodDefault<z.ZodString>;
            randomizeStart: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        }, {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        }>>;
        intervals: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            intervalPeriod: z.ZodOptional<z.ZodObject<{
                start: z.ZodDefault<z.ZodString>;
                duration: z.ZodDefault<z.ZodString>;
                randomizeStart: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            }, {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            }>>;
            payloads: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
                }, "strip", z.ZodTypeAny, {
                    x?: number;
                    y?: number;
                }, {
                    x?: number;
                    y?: number;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }, {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }, {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        resourceName?: string;
        intervalPeriod?: {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        };
        intervals?: {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }[];
    }, {
        resourceName?: string;
        intervalPeriod?: {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        };
        intervals?: {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "REPORT";
    programID?: string;
    eventID?: string;
    clientName?: string;
    reportName?: string;
    payloadDescriptors?: {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }[];
    resources?: {
        resourceName?: string;
        intervalPeriod?: {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        };
        intervals?: {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }[];
    }[];
}, {
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "REPORT";
    programID?: string;
    eventID?: string;
    clientName?: string;
    reportName?: string;
    payloadDescriptors?: {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }[];
    resources?: {
        resourceName?: string;
        intervalPeriod?: {
            start?: string;
            duration?: string;
            randomizeStart?: string;
        };
        intervals?: {
            id?: number;
            intervalPeriod?: {
                start?: string;
                duration?: string;
                randomizeStart?: string;
            };
            payloads?: {
                type?: string;
                values?: (string | number | boolean | {
                    x?: number;
                    y?: number;
                })[];
            }[];
        }[];
    }[];
}>;
export default _default;
//# sourceMappingURL=zod-report.d.ts.map