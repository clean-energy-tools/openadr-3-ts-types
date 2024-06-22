

import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Program, parseProgram, joiProgram
} from '../../package/dist/index.js';
import YAML from 'js-yaml';

describe('PROGRAM', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'program.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse prog0', function() {
            const prog0: Program = parseProgram.parse(data.prog0[0]) as Program;
            // console.log(prog0);
            assert.deepEqual(prog0, {
                programName: 'TEST-EXAMPLE-1',
                programLongName: 'TEST Example 1',
                retailerName: 'TEST-Retailer',
                retailerLongName: 'TEST Retailer',
                programType: 'any',
                country: 'US',
                principalSubdivision: 'SD',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should fail to parse prog0 in strict mode', function() {
            let didFail = false;
            try {
                const prog0: Program = parseProgram.strict().parse(data.prog0[2]) as Program;
            } catch (err: any) {
                // console.log(err);
                didFail = true;
                assert.deepEqual(err.issues, [{
                    code: 'unrecognized_keys',
                    keys: [
                        "extraField"
                    ],
                    path: [],
                    message: "Unrecognized key(s) in object: 'extraField'"
                }]);
            }
            assert.isOk(didFail);
            // console.log(prog0);
        });

        it('should parse prog0 with extra fields', function() {
            const prog0: Program = parseProgram.passthrough().parse(data.prog0[2]) as Program;
            // console.log(prog0);
            assert.deepEqual(prog0, {
                programName: 'TEST-EXAMPLE-passthrough',
                programLongName: 'TEST Example passthrough',
                extraField: 'with unknown value',
                retailerName: 'TEST-Retailer',
                retailerLongName: 'TEST Retailer',
                programType: 'any',
                country: 'US',
                principalSubdivision: 'SD',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            } as any);
        });

        it('should parse program with default values', function() {
            const progDefaults: Program = parseProgram.parse(data.prog0[1]) as Program;
            // console.log(prog0);
            assert.deepEqual(progDefaults, {
                programName: 'TEST-EXAMPLE-defaults',
                programLongName: 'TEST Example default values',
                retailerName: null,
                retailerLongName: null,
                programType: null,
                country: null,
                principalSubdivision: null,
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should fail to parse bad program', function() {
            let didFail = false;
            try {
                const badprog
                    = parseProgram.parse(data.BADprog[0]);
            } catch (err: any) {
                didFail = true;
                assert.deepEqual(err.issues, [
                    {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'number',
                    path: ["programName"],
                    message: 'Expected string, received number'
                    },
                    {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'number',
                    path: ["programLongName"],
                    message: 'Expected string, received number'
                    },
                    {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'number',
                    path: ["retailerName"],
                    message: 'Expected string, received number'
                    },
                    {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'number',
                    path: ["retailerLongName"],
                    message: 'Expected string, received number'
                    },
                    {
                    validation: 'regex',
                    code: 'invalid_string',
                    message: 'Invalid',
                    path: ["timeZoneOffset"]
                    },
                    {
                    code: 'invalid_type',
                    expected: 'boolean',
                    received: 'string',
                    path: ["bindingEvents"],
                    message: 'Expected boolean, received string'
                    },
                    {
                    code: 'invalid_type',
                    expected: 'boolean',
                    received: 'string',
                    path: ["localPrice"],
                    message: 'Expected boolean, received string'
                    }
                ]);
            }
            assert.isOk(didFail);
        })

        it('should fail to parse zero-length program name', function() {
            let didFail = false;
            try {
                const badprog
                    = parseProgram.parse(data.BADprog[1]);
            } catch (err: any) {
                didFail = true;
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_small',
                        minimum: 1,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at least 1 character(s)',
                        path: ["programName"]
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse extra-long program name', function() {
            let didFail = false;
            try {
                const badprog
                    = parseProgram.parse(data.BADprog[2]);
            } catch (err: any) {
                didFail = true;
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_big',
                        maximum: 128,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at most 128 character(s)',
                        path: ["programName"]
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse prog0', function() {
            const result = joiProgram.validate(data.prog0[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);
            assert.deepEqual(result.value, {
                programName: 'TEST-EXAMPLE-1',
                programLongName: 'TEST Example 1',
                retailerName: 'TEST-Retailer',
                retailerLongName: 'TEST Retailer',
                programType: 'any',
                country: 'US',
                principalSubdivision: 'SD',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should fail to parse prog0 with extra fields stripUnknown false allowUnknown false', function() {
            const result = joiProgram
                    .validate(data.prog0[2], {
                        allowUnknown: false,
                        stripUnknown: false
                    });

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"extraField" is not allowed');

        });

        it('should parse prog0 with extra fields using stripUnknown', function() {
            const result = joiProgram
                    .validate(data.prog0[2], {
                        stripUnknown: true
                    });

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);
            assert.deepEqual(result.value, {
                programName: 'TEST-EXAMPLE-passthrough',
                programLongName: 'TEST Example passthrough',
                // extraField: 'with unknown value',
                retailerName: 'TEST-Retailer',
                retailerLongName: 'TEST Retailer',
                programType: 'any',
                country: 'US',
                principalSubdivision: 'SD',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should parse prog0 with extra fields seen w/o stripUnknown', function() {
            const result = joiProgram
                    .validate(data.prog0[2], {
                        allowUnknown: true
                    });

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);
            assert.deepEqual(result.value, {
                programName: 'TEST-EXAMPLE-passthrough',
                programLongName: 'TEST Example passthrough',
                extraField: 'with unknown value',
                retailerName: 'TEST-Retailer',
                retailerLongName: 'TEST Retailer',
                programType: 'any',
                country: 'US',
                principalSubdivision: 'SD',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should parse prog0 with default values', function() {
            const result = joiProgram.validate(data.prog0[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);
            assert.deepEqual(result.value, {
                programName: 'TEST-EXAMPLE-defaults',
                programLongName: 'TEST Example default values',
                retailerName: null,
                retailerLongName: null,
                programType: null,
                country: null,
                principalSubdivision: null,
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                programDescriptions: null,
                bindingEvents: false,
                localPrice: false,
                payloadDescriptors: null,
                targets: null
            });
        });

        it('should fail to parse bad program', function() {
            const result = joiProgram.validate(data.BADprog[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"programName" must be a string');

        });

        it('should fail to parse zero-length program name', function() {
            const result = joiProgram.validate(data.BADprog[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"programName" is not allowed to be empty');

        });

        it('should fail to parse extra-long program name', function() {
            const result = joiProgram.validate(data.BADprog[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"programName" length must be less than or equal to 128 characters long');

        });
    });

});

