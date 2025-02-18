import { z } from "zod";
declare const _default: z.ZodObject<{
    programID: z.ZodString;
    eventName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    priority: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
    reportDescriptors: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        targets: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
        }>, "many">>>;
        aggregate: z.ZodDefault<z.ZodBoolean>;
        startInterval: z.ZodDefault<z.ZodNumber>;
        numIntervals: z.ZodDefault<z.ZodNumber>;
        historical: z.ZodDefault<z.ZodBoolean>;
        frequency: z.ZodDefault<z.ZodNumber>;
        repeat: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
        }[] | null;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        aggregate: boolean;
        startInterval: number;
        numIntervals: number;
        historical: boolean;
        frequency: number;
        repeat: number;
    }, {
        payloadType: string;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
        }[] | null | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        aggregate?: boolean | undefined;
        startInterval?: number | undefined;
        numIntervals?: number | undefined;
        historical?: boolean | undefined;
        frequency?: number | undefined;
        repeat?: number | undefined;
    }>, "many">>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
        objectType: z.ZodOptional<z.ZodLiteral<"EVENT_PAYLOAD_DESCRIPTOR">>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        payloadType: string;
        units: string | null;
        currency: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    }, {
        payloadType: string;
        units?: string | null | undefined;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        currency?: string | null | undefined;
    }>, "many">>>;
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
    programID: string;
    eventName: string | null;
    priority: number | null;
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
    reportDescriptors: {
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
        }[] | null;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        aggregate: boolean;
        startInterval: number;
        numIntervals: number;
        historical: boolean;
        frequency: number;
        repeat: number;
    }[] | null;
    payloadDescriptors: {
        payloadType: string;
        units: string | null;
        currency: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    }[] | null;
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
    intervalPeriod?: {
        start: string;
        duration: string;
        randomizeStart: string;
    } | undefined;
}, {
    programID: string;
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
    eventName?: string | null | undefined;
    priority?: number | null | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
    reportDescriptors?: {
        payloadType: string;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
        }[] | null | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        aggregate?: boolean | undefined;
        startInterval?: number | undefined;
        numIntervals?: number | undefined;
        historical?: boolean | undefined;
        frequency?: number | undefined;
        repeat?: number | undefined;
    }[] | null | undefined;
    payloadDescriptors?: {
        payloadType: string;
        units?: string | null | undefined;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        currency?: string | null | undefined;
    }[] | null | undefined;
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-eventRequest.d.ts.map