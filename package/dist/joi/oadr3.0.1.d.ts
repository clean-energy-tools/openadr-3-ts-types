import Joi from "joi";
export declare const schemas: {
    parameters: {
        searchAllPrograms: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        searchAllReports: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        searchAllEvents: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        searchSubscriptions: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        searchVens: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        searchVenResources: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
        fetchToken: {
            path: Joi.ObjectSchema<any>;
            query: Joi.ObjectSchema<any>;
            header: Joi.ObjectSchema<any>;
            cookie: Joi.ObjectSchema<any>;
        };
    };
    components: {
        program: Joi.ObjectSchema<any>;
        report: Joi.ObjectSchema<any>;
        event: Joi.ObjectSchema<any>;
        subscription: Joi.ObjectSchema<any>;
        ven: Joi.ObjectSchema<any>;
        resource: Joi.ObjectSchema<any>;
        interval: Joi.ObjectSchema<any>;
        intervalPeriod: Joi.ObjectSchema<any>;
        valuesMap: Joi.ObjectSchema<any>;
        point: Joi.ObjectSchema<any>;
        eventPayloadDescriptor: Joi.ObjectSchema<any>;
        reportPayloadDescriptor: Joi.ObjectSchema<any>;
        reportDescriptor: Joi.ObjectSchema<any>;
        objectID: Joi.StringSchema<string>;
        notification: Joi.ObjectSchema<any>;
        objectTypes: Joi.StringSchema<string>;
        dateTime: Joi.DateSchema<Date>;
        duration: Joi.StringSchema<string>;
        problem: Joi.ObjectSchema<any>;
    };
};
//# sourceMappingURL=oadr3.0.1.d.ts.map