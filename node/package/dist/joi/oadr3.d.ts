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
    };
    components: {
        program: Joi.AlternativesSchema<any>;
        programRequest: Joi.ObjectSchema<any>;
        report: Joi.AlternativesSchema<any>;
        reportRequest: Joi.ObjectSchema<any>;
        event: Joi.AlternativesSchema<any>;
        eventRequest: Joi.ObjectSchema<any>;
        subscription: Joi.AlternativesSchema<any>;
        subscriptionRequest: Joi.ObjectSchema<any>;
        ven: Joi.AlternativesSchema<any>;
        venRequest: Joi.ObjectSchema<any>;
        resource: Joi.AlternativesSchema<any>;
        resourceRequest: Joi.ObjectSchema<any>;
        objectMetadata: Joi.ObjectSchema<any>;
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
        clientCredentialRequest: Joi.ObjectSchema<any>;
        clientCredentialResponse: Joi.ObjectSchema<any>;
        authError: Joi.ObjectSchema<any>;
        problem: Joi.ObjectSchema<any>;
    };
};
//# sourceMappingURL=oadr3.d.ts.map