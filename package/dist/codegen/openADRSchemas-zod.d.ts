import { z } from "zod";
export declare const objectIDSchema: z.ZodString;
export declare const dateTimeSchema: z.ZodDefault<z.ZodString>;
export declare const durationSchema: z.ZodDefault<z.ZodString>;
export declare const intervalPeriodSchema: z.ZodObject<{
    start: z.ZodDefault<z.ZodString>;
    duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    start: string;
    duration?: string | undefined;
    randomizeStart?: string | undefined;
}, {
    start?: string | undefined;
    duration?: string | undefined;
    randomizeStart?: string | undefined;
}>;
export declare const objectTypesSchema: z.ZodUnion<[z.ZodLiteral<"PROGRAM">, z.ZodLiteral<"EVENT">, z.ZodLiteral<"REPORT">, z.ZodLiteral<"SUBSCRIPTION">, z.ZodLiteral<"VEN">, z.ZodLiteral<"RESOURCE">]>;
export declare const pointSchema: z.ZodObject<{
    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    x: number | null;
    y: number | null;
}, {
    x?: number | null | undefined;
    y?: number | null | undefined;
}>;
export declare const eventPayloadDescriptorSchema: z.ZodObject<{
    objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    payloadType: z.ZodString;
    units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    currency: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    objectType: string;
    payloadType: string;
    units: string | null;
    currency: string | null;
}, {
    payloadType: string;
    objectType?: string | undefined;
    units?: string | null | undefined;
    currency?: string | null | undefined;
}>;
export declare const reportPayloadDescriptorSchema: z.ZodObject<{
    objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    payloadType: z.ZodString;
    readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    accuracy: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    confidence: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    objectType: string;
    payloadType: string;
    readingType: string | null;
    units: string | null;
    accuracy: number | null;
    confidence: number;
}, {
    payloadType: string;
    objectType?: string | undefined;
    readingType?: string | null | undefined;
    units?: string | null | undefined;
    accuracy?: number | null | undefined;
    confidence?: number | undefined;
}>;
export declare const problemSchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}, {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}>;
export declare const valuesMapSchema: z.ZodObject<{
    type: z.ZodString;
    values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
        x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        x: number | null;
        y: number | null;
    }, {
        x?: number | null | undefined;
        y?: number | null | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    type: string;
    values: (string | number | boolean | {
        x: number | null;
        y: number | null;
    })[];
}, {
    type: string;
    values: (string | number | boolean | {
        x?: number | null | undefined;
        y?: number | null | undefined;
    })[];
}>;
export declare const resourceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
    resourceName: z.ZodString;
    venID: z.ZodOptional<z.ZodString>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>;
    targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    resourceName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "RESOURCE" | undefined;
    venID?: string | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
}, {
    resourceName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "RESOURCE" | undefined;
    venID?: string | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
}>;
export declare const reportDescriptorSchema: z.ZodObject<{
    payloadType: z.ZodString;
    readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>>>;
    aggregate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    startInterval: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    numIntervals: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    historical: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    frequency: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    repeat: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    repeat: number;
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
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
}, {
    payloadType: string;
    readingType?: string | null | undefined;
    units?: string | null | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | null | undefined;
    aggregate?: boolean | undefined;
    startInterval?: number | undefined;
    numIntervals?: number | undefined;
    historical?: boolean | undefined;
    frequency?: number | undefined;
    repeat?: number | undefined;
}>;
export declare const programSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"PROGRAM">>;
    programName: z.ZodString;
    programLongName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    retailerName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    retailerLongName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    programType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    country: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    principalSubdivision: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    timeZoneOffset: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodDefault<z.ZodString>;
        duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }, {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    programDescriptions: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        URL: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        URL: string;
    }, {
        URL: string;
    }>, "many">>>>;
    bindingEvents: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    localPrice: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }>, z.ZodObject<{
        objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
        confidence: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    }>]>, "many">>>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>>>;
}, "strip", z.ZodTypeAny, {
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | null;
    payloadDescriptors: ({
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    } | {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
    })[] | null;
    programName: string;
    programLongName: string | null;
    retailerName: string | null;
    retailerLongName: string | null;
    programType: string | null;
    country: string | null;
    principalSubdivision: string | null;
    programDescriptions: {
        URL: string;
    }[] | null;
    bindingEvents: boolean;
    localPrice: boolean;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "PROGRAM" | undefined;
    timeZoneOffset?: string | undefined;
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}, {
    programName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "PROGRAM" | undefined;
    programLongName?: string | null | undefined;
    retailerName?: string | null | undefined;
    retailerLongName?: string | null | undefined;
    programType?: string | null | undefined;
    country?: string | null | undefined;
    principalSubdivision?: string | null | undefined;
    timeZoneOffset?: string | undefined;
    intervalPeriod?: {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
    programDescriptions?: {
        URL: string;
    }[] | null | undefined;
    bindingEvents?: boolean | undefined;
    localPrice?: boolean | undefined;
    payloadDescriptors?: ({
        payloadType: string;
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    } | {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    })[] | null | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | null | undefined;
}>;
export declare const intervalSchema: z.ZodObject<{
    id: z.ZodNumber;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodDefault<z.ZodString>;
        duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }, {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    payloads: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[];
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[];
    intervalPeriod?: {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export declare const eventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"EVENT">>;
    programID: z.ZodString;
    eventName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    priority: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>>>;
    reportDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>>>;
        aggregate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        startInterval: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        numIntervals: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        historical: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        frequency: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        repeat: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        repeat: number;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
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
    }, {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
        aggregate?: boolean | undefined;
        startInterval?: number | undefined;
        numIntervals?: number | undefined;
        historical?: boolean | undefined;
        frequency?: number | undefined;
        repeat?: number | undefined;
    }>, "many">>>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }>, "many">>>>;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodDefault<z.ZodString>;
        duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }, {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    intervals: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodDefault<z.ZodString>;
            duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }, {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }>>;
        payloads: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: number;
        payloads: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[];
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }, {
        id: number;
        payloads: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[];
        intervalPeriod?: {
            start?: string | undefined;
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
            x: number | null;
            y: number | null;
        })[];
    }[] | null;
    reportDescriptors: {
        repeat: number;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
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
    }[] | null;
    payloadDescriptors: {
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    }[] | null;
    intervals: {
        id: number;
        payloads: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
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
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}, {
    programID: string;
    intervals: {
        id: number;
        payloads: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[];
        intervalPeriod?: {
            start?: string | undefined;
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
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | null | undefined;
    reportDescriptors?: {
        payloadType: string;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
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
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }[] | null | undefined;
    intervalPeriod?: {
        start?: string | undefined;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export declare const subscriptionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"SUBSCRIPTION">>;
    clientName: z.ZodString;
    programID: z.ZodString;
    objectOperations: z.ZodArray<z.ZodObject<{
        objects: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PROGRAM">, z.ZodLiteral<"EVENT">, z.ZodLiteral<"REPORT">, z.ZodLiteral<"SUBSCRIPTION">, z.ZodLiteral<"VEN">, z.ZodLiteral<"RESOURCE">]>, "many">;
        operations: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
        callbackUrl: z.ZodString;
        bearerToken: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }, {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }>, "many">;
    targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>>>;
}, "strip", z.ZodTypeAny, {
    programID: string;
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | null;
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "SUBSCRIPTION" | undefined;
}, {
    programID: string;
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "SUBSCRIPTION" | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | null | undefined;
}>;
export declare const venSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"VEN">>;
    venName: z.ZodString;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>;
    targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>;
    resources: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
        resourceName: z.ZodString;
        venID: z.ZodOptional<z.ZodString>;
        attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
        targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    }, {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
    }>, "many">>>>;
}, "strip", z.ZodTypeAny, {
    resources: {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    }[] | null;
    venName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "VEN" | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
}, {
    venName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "VEN" | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
    resources?: {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
    }[] | null | undefined;
}>;
export declare const reportSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    objectType: z.ZodOptional<z.ZodLiteral<"REPORT">>;
    programID: z.ZodString;
    eventID: z.ZodString;
    clientName: z.ZodString;
    reportName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
        confidence: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    }>, "many">>>>;
    resources: z.ZodArray<z.ZodObject<{
        resourceName: z.ZodString;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodDefault<z.ZodString>;
            duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }, {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }>>;
        intervals: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            intervalPeriod: z.ZodOptional<z.ZodObject<{
                start: z.ZodDefault<z.ZodString>;
                duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }, {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }>>;
            payloads: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    x: number | null;
                    y: number | null;
                }, {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
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
                    x: number | null;
                    y: number | null;
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
    }, {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    programID: string;
    payloadDescriptors: {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
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
                    x: number | null;
                    y: number | null;
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
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "REPORT" | undefined;
}, {
    programID: string;
    eventID: string;
    clientName: string;
    resources: {
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        resourceName: string;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "REPORT" | undefined;
    reportName?: string | null | undefined;
    payloadDescriptors?: {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    }[] | null | undefined;
}>;
export declare const notificationSchema: z.ZodObject<{
    objectType: z.ZodUnion<[z.ZodLiteral<"PROGRAM">, z.ZodLiteral<"EVENT">, z.ZodLiteral<"REPORT">, z.ZodLiteral<"SUBSCRIPTION">, z.ZodLiteral<"VEN">, z.ZodLiteral<"RESOURCE">]>;
    operation: z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
            x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            x: number | null;
            y: number | null;
        }, {
            x?: number | null | undefined;
            y?: number | null | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">>>>;
    object: z.ZodUnion<[z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"PROGRAM">>;
        programName: z.ZodString;
        programLongName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        retailerName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        retailerLongName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        programType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        country: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        principalSubdivision: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        timeZoneOffset: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodDefault<z.ZodString>;
            duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }, {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }>>;
        programDescriptions: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            URL: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            URL: string;
        }, {
            URL: string;
        }>, "many">>>>;
        bindingEvents: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        localPrice: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            payloadType: z.ZodString;
            units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            currency: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        }, {
            payloadType: string;
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        }>, z.ZodObject<{
            objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            payloadType: z.ZodString;
            readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            accuracy: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
            confidence: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
        }, {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        }>]>, "many">>>>;
        targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>>>;
    }, "strip", z.ZodTypeAny, {
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        payloadDescriptors: ({
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        } | {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
        })[] | null;
        programName: string;
        programLongName: string | null;
        retailerName: string | null;
        retailerLongName: string | null;
        programType: string | null;
        country: string | null;
        principalSubdivision: string | null;
        programDescriptions: {
            URL: string;
        }[] | null;
        bindingEvents: boolean;
        localPrice: boolean;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }, {
        programName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        programLongName?: string | null | undefined;
        retailerName?: string | null | undefined;
        retailerLongName?: string | null | undefined;
        programType?: string | null | undefined;
        country?: string | null | undefined;
        principalSubdivision?: string | null | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
        programDescriptions?: {
            URL: string;
        }[] | null | undefined;
        bindingEvents?: boolean | undefined;
        localPrice?: boolean | undefined;
        payloadDescriptors?: ({
            payloadType: string;
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        } | {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        })[] | null | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"REPORT">>;
        programID: z.ZodString;
        eventID: z.ZodString;
        clientName: z.ZodString;
        reportName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            payloadType: z.ZodString;
            readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            accuracy: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
            confidence: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
        }, {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        }>, "many">>>>;
        resources: z.ZodArray<z.ZodObject<{
            resourceName: z.ZodString;
            intervalPeriod: z.ZodOptional<z.ZodObject<{
                start: z.ZodDefault<z.ZodString>;
                duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }, {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }>>;
            intervals: z.ZodArray<z.ZodObject<{
                id: z.ZodNumber;
                intervalPeriod: z.ZodOptional<z.ZodObject<{
                    start: z.ZodDefault<z.ZodString>;
                    duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                    randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                }, {
                    start?: string | undefined;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                }>>;
                payloads: z.ZodArray<z.ZodObject<{
                    type: z.ZodString;
                    values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                        x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                        y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    }, "strip", z.ZodTypeAny, {
                        x: number | null;
                        y: number | null;
                    }, {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    }>]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: string;
                    values: (string | number | boolean | {
                        x: number | null;
                        y: number | null;
                    })[];
                }, {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x: number | null;
                        y: number | null;
                    })[];
                }[];
                intervalPeriod?: {
                    start: string;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                } | undefined;
            }, {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }[];
                intervalPeriod?: {
                    start?: string | undefined;
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
                        x: number | null;
                        y: number | null;
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
        }, {
            intervals: {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }[];
                intervalPeriod?: {
                    start?: string | undefined;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                } | undefined;
            }[];
            resourceName: string;
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        programID: string;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
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
                        x: number | null;
                        y: number | null;
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
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
    }, {
        programID: string;
        eventID: string;
        clientName: string;
        resources: {
            intervals: {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }[];
                intervalPeriod?: {
                    start?: string | undefined;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                } | undefined;
            }[];
            resourceName: string;
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
        reportName?: string | null | undefined;
        payloadDescriptors?: {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        }[] | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"EVENT">>;
        programID: z.ZodString;
        eventName: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        priority: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
        targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>>>;
        reportDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            payloadType: z.ZodString;
            readingType: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    x: number | null;
                    y: number | null;
                }, {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }>, "many">>>>;
            aggregate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            startInterval: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            numIntervals: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            historical: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            frequency: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            repeat: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            repeat: number;
            targets: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
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
        }, {
            payloadType: string;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | null | undefined;
            aggregate?: boolean | undefined;
            startInterval?: number | undefined;
            numIntervals?: number | undefined;
            historical?: boolean | undefined;
            frequency?: number | undefined;
            repeat?: number | undefined;
        }>, "many">>>>;
        payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            objectType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            payloadType: z.ZodString;
            units: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            currency: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        }, {
            payloadType: string;
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        }>, "many">>>>;
        intervalPeriod: z.ZodOptional<z.ZodObject<{
            start: z.ZodDefault<z.ZodString>;
            duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }, {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        }>>;
        intervals: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            intervalPeriod: z.ZodOptional<z.ZodObject<{
                start: z.ZodDefault<z.ZodString>;
                duration: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                randomizeStart: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }, {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            }>>;
            payloads: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    x: number | null;
                    y: number | null;
                }, {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[];
            intervalPeriod?: {
                start: string;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }, {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
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
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        reportDescriptors: {
            repeat: number;
            targets: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
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
        }[] | null;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        }[] | null;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
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
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }, {
        programID: string;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
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
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
        reportDescriptors?: {
            payloadType: string;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
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
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        }[] | null | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"SUBSCRIPTION">>;
        clientName: z.ZodString;
        programID: z.ZodString;
        objectOperations: z.ZodArray<z.ZodObject<{
            objects: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PROGRAM">, z.ZodLiteral<"EVENT">, z.ZodLiteral<"REPORT">, z.ZodLiteral<"SUBSCRIPTION">, z.ZodLiteral<"VEN">, z.ZodLiteral<"RESOURCE">]>, "many">;
            operations: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
            callbackUrl: z.ZodString;
            bearerToken: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken: string | null;
        }, {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken?: string | null | undefined;
        }>, "many">;
        targets: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>>>;
    }, "strip", z.ZodTypeAny, {
        programID: string;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken: string | null;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
    }, {
        programID: string;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken?: string | null | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"VEN">>;
        venName: z.ZodString;
        attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
        targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
        resources: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
            objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
            resourceName: z.ZodString;
            venID: z.ZodOptional<z.ZodString>;
            attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    x: number | null;
                    y: number | null;
                }, {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }>, "many">>;
            targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                    x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                    y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    x: number | null;
                    y: number | null;
                }, {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }, {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
        }, {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
        }>, "many">>>>;
    }, "strip", z.ZodTypeAny, {
        resources: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
        }[] | null;
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    }, {
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        resources?: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
        }[] | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        modificationDateTime: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
        resourceName: z.ZodString;
        venID: z.ZodOptional<z.ZodString>;
        attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
        targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
                x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                x: number | null;
                y: number | null;
            }, {
                x?: number | null | undefined;
                y?: number | null | undefined;
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }, {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    }, {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    object: ({
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    } | {
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        payloadDescriptors: ({
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        } | {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
        })[] | null;
        programName: string;
        programLongName: string | null;
        retailerName: string | null;
        retailerLongName: string | null;
        programType: string | null;
        country: string | null;
        principalSubdivision: string | null;
        programDescriptions: {
            URL: string;
        }[] | null;
        bindingEvents: boolean;
        localPrice: boolean;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        eventName: string | null;
        priority: number | null;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        reportDescriptors: {
            repeat: number;
            targets: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
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
        }[] | null;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        }[] | null;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
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
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken: string | null;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
    } | {
        resources: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
        }[] | null;
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    } | {
        programID: string;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
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
                        x: number | null;
                        y: number | null;
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
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
    }) & ({
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    } | {
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        payloadDescriptors: ({
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        } | {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
        })[] | null;
        programName: string;
        programLongName: string | null;
        retailerName: string | null;
        retailerLongName: string | null;
        programType: string | null;
        country: string | null;
        principalSubdivision: string | null;
        programDescriptions: {
            URL: string;
        }[] | null;
        bindingEvents: boolean;
        localPrice: boolean;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        eventName: string | null;
        priority: number | null;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        reportDescriptors: {
            repeat: number;
            targets: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
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
        }[] | null;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            units: string | null;
            currency: string | null;
        }[] | null;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
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
        intervalPeriod?: {
            start: string;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        targets: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | null;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken: string | null;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
    } | {
        resources: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x: number | null;
                    y: number | null;
                })[];
            }[] | undefined;
        }[] | null;
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x: number | null;
                y: number | null;
            })[];
        }[] | undefined;
    } | {
        programID: string;
        payloadDescriptors: {
            objectType: string;
            payloadType: string;
            readingType: string | null;
            units: string | null;
            accuracy: number | null;
            confidence: number;
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
                        x: number | null;
                        y: number | null;
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
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
    } | undefined);
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | null;
    operation: "GET" | "POST" | "PUT" | "DELETE";
}, {
    object: ({
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
    } | {
        programName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        programLongName?: string | null | undefined;
        retailerName?: string | null | undefined;
        retailerLongName?: string | null | undefined;
        programType?: string | null | undefined;
        country?: string | null | undefined;
        principalSubdivision?: string | null | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
        programDescriptions?: {
            URL: string;
        }[] | null | undefined;
        bindingEvents?: boolean | undefined;
        localPrice?: boolean | undefined;
        payloadDescriptors?: ({
            payloadType: string;
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        } | {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        })[] | null | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    } | {
        programID: string;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
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
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
        reportDescriptors?: {
            payloadType: string;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
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
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        }[] | null | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken?: string | null | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    } | {
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        resources?: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
        }[] | null | undefined;
    } | {
        programID: string;
        eventID: string;
        clientName: string;
        resources: {
            intervals: {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }[];
                intervalPeriod?: {
                    start?: string | undefined;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                } | undefined;
            }[];
            resourceName: string;
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
        reportName?: string | null | undefined;
        payloadDescriptors?: {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        }[] | null | undefined;
    }) & ({
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
    } | {
        programName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "PROGRAM" | undefined;
        programLongName?: string | null | undefined;
        retailerName?: string | null | undefined;
        retailerLongName?: string | null | undefined;
        programType?: string | null | undefined;
        country?: string | null | undefined;
        principalSubdivision?: string | null | undefined;
        timeZoneOffset?: string | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
        programDescriptions?: {
            URL: string;
        }[] | null | undefined;
        bindingEvents?: boolean | undefined;
        localPrice?: boolean | undefined;
        payloadDescriptors?: ({
            payloadType: string;
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        } | {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        })[] | null | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    } | {
        programID: string;
        intervals: {
            id: number;
            payloads: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[];
            intervalPeriod?: {
                start?: string | undefined;
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
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
        reportDescriptors?: {
            payloadType: string;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
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
            objectType?: string | undefined;
            units?: string | null | undefined;
            currency?: string | null | undefined;
        }[] | null | undefined;
        intervalPeriod?: {
            start?: string | undefined;
            duration?: string | undefined;
            randomizeStart?: string | undefined;
        } | undefined;
    } | {
        programID: string;
        clientName: string;
        objectOperations: {
            objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
            operations: ("GET" | "POST" | "PUT" | "DELETE")[];
            callbackUrl: string;
            bearerToken?: string | null | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "SUBSCRIPTION" | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | null | undefined;
    } | {
        venName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "VEN" | undefined;
        attributes?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        targets?: {
            type: string;
            values: (string | number | boolean | {
                x?: number | null | undefined;
                y?: number | null | undefined;
            })[];
        }[] | undefined;
        resources?: {
            resourceName: string;
            id?: string | undefined;
            createdDateTime?: string | undefined;
            modificationDateTime?: string | undefined;
            objectType?: "RESOURCE" | undefined;
            venID?: string | undefined;
            attributes?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
            targets?: {
                type: string;
                values: (string | number | boolean | {
                    x?: number | null | undefined;
                    y?: number | null | undefined;
                })[];
            }[] | undefined;
        }[] | null | undefined;
    } | {
        programID: string;
        eventID: string;
        clientName: string;
        resources: {
            intervals: {
                id: number;
                payloads: {
                    type: string;
                    values: (string | number | boolean | {
                        x?: number | null | undefined;
                        y?: number | null | undefined;
                    })[];
                }[];
                intervalPeriod?: {
                    start?: string | undefined;
                    duration?: string | undefined;
                    randomizeStart?: string | undefined;
                } | undefined;
            }[];
            resourceName: string;
            intervalPeriod?: {
                start?: string | undefined;
                duration?: string | undefined;
                randomizeStart?: string | undefined;
            } | undefined;
        }[];
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "REPORT" | undefined;
        reportName?: string | null | undefined;
        payloadDescriptors?: {
            payloadType: string;
            objectType?: string | undefined;
            readingType?: string | null | undefined;
            units?: string | null | undefined;
            accuracy?: number | null | undefined;
            confidence?: number | undefined;
        }[] | null | undefined;
    } | undefined);
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation: "GET" | "POST" | "PUT" | "DELETE";
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | null | undefined;
}>;
//# sourceMappingURL=openADRSchemas-zod.d.ts.map