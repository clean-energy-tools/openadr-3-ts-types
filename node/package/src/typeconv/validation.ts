
import path from 'node:path';
import { promises as fsp } from 'node:fs';
import Ajv from "ajv";
import addFormats from "ajv-formats";
export const ajv = new Ajv.default({
    // strict: true,
    // allowUnionTypes: true,
    validateFormats: true
});
addFormats.default(ajv);

import * as OADR3 from '../codegen/oadr3Schemas.js';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await fsp.readFile(
    path.join(__dirname, 'oadr3.0.1.json'), 'utf-8'
);
const schema = JSON.parse(_schema);

/*
 * A type to assist returning an indicator of whether
 * an object matches the type, or otherwise the
 * validation errors.
 */
type errValReturn<T> = {
    errors?: Ajv.DefinedError[];
    value?: T;
}
/*
 * Generate a function for validating data on a given type.
 *
 * The <T> is the type for which this is generated.
 * 
 * The 'key' is the entry in the schema where the
 * schema for this type is declared.
 * 
 * @returns a function which accepts any data object, uses
 * the validator to check the data, then returns an
 * object describing whether it is valid.
 */
function compileValidator<T>(key: string)
    : (data:any) => errValReturn<T> | undefined
{
    const v: Ajv.ValidateFunction<T> = ajv.compile<T>(schema.definitions[key]);
    return function validateData(data: any): errValReturn<T> | undefined {
        if (v(data)) {
            return {
                value: data as T
            };
        } else if (typeof v.errors !== 'undefined' && v.errors !== null) {
            return {
                errors: v.errors as Ajv.DefinedError[]
            };
        }
    }
}

export const validateProgram = compileValidator<OADR3.Program>('program');
export const validateReport = compileValidator<OADR3.Report>('report');
export const validateEvent = compileValidator<OADR3.Event>('event');
export const validateSubscription = compileValidator<OADR3.Subscription>('subscription');
export const validateVen = compileValidator<OADR3.Ven>('ven');
export const validateResource = compileValidator<OADR3.Resource>('resource');
export const validateInterval = compileValidator<OADR3.Interval>('interval');
export const validateIntervalPeriod = compileValidator<OADR3.IntervalPeriod>('intervalPeriod');
export const validateValuesMap = compileValidator<OADR3.ValuesMap>('valuesMap');
export const validatePoint = compileValidator<OADR3.Point>('point');
export const validateEventPayloadDescriptor = compileValidator<OADR3.EventPayloadDescriptor>('eventPayloadDescriptor');
export const validateReportPayloadDescriptor = compileValidator<OADR3.ReportPayloadDescriptor>('reportPayloadDescriptor');
export const validateReportDescriptor = compileValidator<OADR3.ReportDescriptor>('reportDescriptor');
export const validateObjectID = compileValidator<OADR3.ObjectID>('objectID');
export const validateNotification = compileValidator<OADR3.Notification>('notification');
export const validateObjectTypes = compileValidator<OADR3.ObjectTypes>('objectTypes');
export const validateDateTime = compileValidator<OADR3.DateTime>('dateTime');
export const validateDuration = compileValidator<OADR3.Duration>('duration');
export const validateClientCredentialRequest = compileValidator<OADR3.ClientCredentialRequest>('clientCredentialRequest');
export const validateClientCredentialResponse = compileValidator<OADR3.ClientCredentialResponse>('clientCredentialResponse');
export const validateAuthError = compileValidator<OADR3.AuthError>('authError');
export const validateProblem = compileValidator<OADR3.Problem>('problem');
