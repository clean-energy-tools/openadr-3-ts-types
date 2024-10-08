import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodString>;
    modificationDateTime: z.ZodOptional<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"EVENT">>;
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
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }, {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
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
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }, {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }>, "many">>>;
        aggregate: z.ZodDefault<z.ZodBoolean>;
        startInterval: z.ZodDefault<z.ZodNumber>;
        numIntervals: z.ZodDefault<z.ZodNumber>;
        historical: z.ZodDefault<z.ZodBoolean>;
        frequency: z.ZodDefault<z.ZodNumber>;
        repeat: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        repeat: number;
        targets: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        aggregate: boolean;
        startInterval: number;
        numIntervals: number;
        historical: boolean;
        frequency: number;
    }, {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        targets?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
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
        currency: string | null;
        payloadType: string;
        units: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    }, {
        payloadType: string;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        units?: string | null | undefined;
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
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }, {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: number;
        payloads: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[];
        intervalPeriod?: {
            start: string;
            duration: string;
            randomizeStart: string;
        } | undefined;
    }, {
        id: number;
        payloads: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
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
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null;
    reportDescriptors: {
        repeat: number;
        targets: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        aggregate: boolean;
        startInterval: number;
        numIntervals: number;
        historical: boolean;
        frequency: number;
    }[] | null;
    payloadDescriptors: {
        currency: string | null;
        payloadType: string;
        units: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    }[] | null;
    intervals: {
        id: number;
        payloads: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[];
        intervalPeriod?: {
            start: string;
            duration: string;
            randomizeStart: string;
        } | undefined;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "EVENT" | undefined;
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
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[];
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "EVENT" | undefined;
    eventName?: string | null | undefined;
    priority?: number | null | undefined;
    targets?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
    reportDescriptors?: {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        targets?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
        aggregate?: boolean | undefined;
        startInterval?: number | undefined;
        numIntervals?: number | undefined;
        historical?: boolean | undefined;
        frequency?: number | undefined;
        repeat?: number | undefined;
    }[] | null | undefined;
    payloadDescriptors?: {
        payloadType: string;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }[] | null | undefined;
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-event.d.ts.map