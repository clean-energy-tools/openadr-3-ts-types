import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodDefault<z.ZodString>;
    modificationDateTime: z.ZodDefault<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"EVENT">>;
    programID: z.ZodString;
    eventName: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    priority: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>>;
    reportDescriptors: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        targets: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        }>, "many">>>>;
        aggregate: z.ZodDefault<z.ZodBoolean>;
        startInterval: z.ZodDefault<z.ZodNumber>;
        numIntervals: z.ZodDefault<z.ZodNumber>;
        historical: z.ZodDefault<z.ZodBoolean>;
        frequency: z.ZodDefault<z.ZodNumber>;
        repeat: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        payloadType?: string;
        readingType?: string;
        units?: string;
        targets?: {
            type?: string;
            values?: (string | number | boolean | {
                x?: number;
                y?: number;
            })[];
        }[];
        aggregate?: boolean;
        startInterval?: number;
        numIntervals?: number;
        historical?: boolean;
        frequency?: number;
        repeat?: number;
    }, {
        payloadType?: string;
        readingType?: string;
        units?: string;
        targets?: {
            type?: string;
            values?: (string | number | boolean | {
                x?: number;
                y?: number;
            })[];
        }[];
        aggregate?: boolean;
        startInterval?: number;
        numIntervals?: number;
        historical?: boolean;
        frequency?: number;
        repeat?: number;
    }>, "many">>>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }, {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }>, "many">>>>;
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
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "EVENT";
    programID?: string;
    eventName?: string;
    priority?: number;
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    reportDescriptors?: {
        payloadType?: string;
        readingType?: string;
        units?: string;
        targets?: {
            type?: string;
            values?: (string | number | boolean | {
                x?: number;
                y?: number;
            })[];
        }[];
        aggregate?: boolean;
        startInterval?: number;
        numIntervals?: number;
        historical?: boolean;
        frequency?: number;
        repeat?: number;
    }[];
    payloadDescriptors?: {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }[];
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
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "EVENT";
    programID?: string;
    eventName?: string;
    priority?: number;
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    reportDescriptors?: {
        payloadType?: string;
        readingType?: string;
        units?: string;
        targets?: {
            type?: string;
            values?: (string | number | boolean | {
                x?: number;
                y?: number;
            })[];
        }[];
        aggregate?: boolean;
        startInterval?: number;
        numIntervals?: number;
        historical?: boolean;
        frequency?: number;
        repeat?: number;
    }[];
    payloadDescriptors?: {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }[];
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
}>;
export default _default;
//# sourceMappingURL=zod-event.d.ts.map