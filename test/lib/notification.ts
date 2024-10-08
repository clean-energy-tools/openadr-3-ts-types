
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Notification, parseNotification,
    joiNotification
} from '../../package/dist/index.js';
import YAML from 'js-yaml';

describe('NOTIFICATION', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'notification.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse notification GET PROGRAM', function() {
            const notification: Notification = parseNotification.parse(data.notifications[0]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'PROGRAM',
                operation: 'GET',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                objectType: 'PROGRAM',
                programName: 'PROGRAM Object',
                programLongName: 'Program Object',
                timeZoneOffset: '-PT8H',
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M'
                }
                }
            });
        });

        it('should parse notification POST REPORT', function() {
            const notification: Notification = parseNotification.parse(data.notifications[1]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'REPORT',
                operation: 'POST',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                objectType: 'REPORT',
                ignoreVenNotFound: true,
                programID: '0',
                eventID: '0',
                clientName: 'VEN99',
                reportName: 'Test report #1',
                payloadDescriptors: [ { payloadType: 'USAGE' } ],
                resources: [
                    {
                        resourceName: '99',
                        ignoreVenNotFound: true,
                        intervalPeriod: {
                            start: "2023-03-11T12:23:15Z",
                            duration: "PT1M"
                        },
                        intervals: [
                            {
                                id: 0,
                                intervalPeriod: {
                                    start: '2023-03-26T18:30:28.829Z',
                                    duration: 'PT15M'
                                },
                                payloads: [
                                    {
                                        type: 'USAGE',
                                        values: [ 94 ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
                }
            } as any);
        });

        it('should parse notification PUT EVENT', function() {
            const notification: Notification = parseNotification.parse(data.notifications[2]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'EVENT',
                operation: 'PUT',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                objectType: 'EVENT',
                programID: '0',
                eventName: 'First event',
                priority: 99,
                extraField: 'With unknown value',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                reportDescriptors: [ 
                    {
                        payloadType: 'USAGE',
                        readingType: "DIRECT_READ",
                        reportingRate: 'P15M',
                        targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                    } 
                ],
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M'
                },
                intervals: [
                    {
                        id: 0,
                        payloads: [
                            {
                                type: 'EMPTY',
                                values: []
                            }
                        ]
                    }
                ]
                }
            } as any);
        });

        it('should parse notification DELETE SUBSCRIPTION', function() {
            const notification: Notification = parseNotification.parse(data.notifications[3]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'SUBSCRIPTION',
                operation: 'DELETE',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                clientName: '9990',
                programID: '0',
                // whichTypes: 'EVENT',
                objectType: 'SUBSCRIPTION',
                objectOperations: [
                    {
                        objects: [ 'EVENT' ],
                        operations: [ 'POST' ],
                        callbackUrl: 'http://localhost:9293/hook/1'
                    }
                ]
                }
            } as any);
        });

        it('should parse notification GET VEN', function() {
            const notification: Notification = parseNotification.parse(data.notifications[4]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'VEN',
                operation: 'GET',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                objectType: 'VEN',
                venName: 'con-ed-lcn-Liberty-Green',
                attributes: [
                    {
                        type: 'GEO_LOCATION',
                        values: [
                            '{ "type": "Point", "coordinates": [ -74.01432, 40.7167 ] }\n'
                        ]
                    },
                    {
                        type: 'ESX_TCN_ID',
                        values: [ 'con-ed-tcn' ]
                    },
                    {
                        type: 'ESX_CN_ID',
                        values: [ 'con-ed-BATTERY-PARK-CITY' ]
                    },
                    {
                        type: 'ESX_LONG_NAME',
                        values: [ 'Liberty Green' ]
                    }
                ]
                }
            } as any);
        });

        it('should parse notification POST RESOURCE', function() {
            const notification: Notification = parseNotification.parse(data.notifications[5]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'RESOURCE',
                operation: 'POST',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                objectType: 'RESOURCE',
                resourceName: 'evse-green-1',
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 1 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 32 ]
                    }
                ]
                }
            } as any);
        });

        it('should parse notification POST RESOURCE w/ missing field', function() {
            const notification: Notification = parseNotification.parse(data.notifications[6]) as Notification;
            // console.log(notification);
            assert.deepEqual(notification, {
                objectType: 'RESOURCE',
                operation: 'POST',
                targets: null,
                object: {
                objectType: 'RESOURCE',
                resourceName: 'evse-green-1',
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 1 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 32 ]
                    }
                ]
                }
            } as any);
        });

        it('should fail to parse notification w/ incorrect operation code', function() {
            let didFail = false;
            try {
                const notification: Notification = parseNotification.parse(data.BADnotifications[0]) as Notification;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                    received: 'get',
                    code: 'invalid_enum_value',
                    options: [ 'GET', 'POST', 'PUT', 'DELETE' ],
                    path: [ 'operation' ],
                    message: "Invalid enum value. Expected 'GET' | 'POST' | 'PUT' | 'DELETE', received 'get'"
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse notification w/ missing operation code', function() {
            let didFail = false;
            try {
                const notification: Notification = parseNotification.parse(data.BADnotifications[1]) as Notification;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        expected: "'GET' | 'POST' | 'PUT' | 'DELETE'",
                        received: 'undefined',
                        code: 'invalid_type',
                        path: [ 'operation' ],
                        message: 'Required'
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse notification w/ incorrect operation type', function() {
            let didFail = false;
            try {
                const notification: Notification = parseNotification.parse(data.BADnotifications[2]) as Notification;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                // console.log(err.issues[1].unionErrors);
                delete err.issues[1].unionErrors;
                assert.deepEqual(err.issues, [
                    {
                        received: 'PROGRAMMMM',
                        code: 'invalid_enum_value',
                        options: [ 'PROGRAM', 'EVENT', 'REPORT', 'SUBSCRIPTION', 'VEN', 'RESOURCE' ],
                        path: [ 'objectType' ],
                        message: "Invalid enum value. Expected 'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE', received 'PROGRAMMMM'"
                    },
                    {
                        path: [ 'object', 'object' ],
                        code: 'invalid_union',
                        // This is too complex to try and verify
                        // unionErrors: [
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "PROGRAM",
                        //         "path": [
                        //           "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"PROGRAM\""
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "programName"
                        //         ],
                        //         "message": "Required"
                        //       }
                        //   ],
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "REPORT",
                        //         "path": [
                        //           "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"REPORT\""
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "programID"
                        //         ],
                        //         "message": "Required"
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "eventID"
                        //         ],
                        //         "message": "Required"
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "clientName"
                        //         ],
                        //         "message": "Required"
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "array",
                        //         "received": "undefined",
                        //         "path": [
                        //           "resources"
                        //         ],
                        //         "message": "Required"
                        //       }
                        //   ],
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "RESOURCE",
                        //         "path": [
                        //           "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"RESOURCE\""
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "resourceName"
                        //         ],
                        //         "message": "Required"
                        //       }
                        //   ],
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "RESOURCE",
                        //         "path": [
                        //         "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"RESOURCE\""
                        //     },
                        //     {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //         "resourceName"
                        //         ],
                        //         "message": "Required"
                        //     }
                        //   ],
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "RESOURCE",
                        //         "path": [
                        //           "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"RESOURCE\""
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "resourceName"
                        //         ],
                        //         "message": "Required"
                        //       }
                        //   ],
                        //   [
                        //     {
                        //         "received": "PROGRAMMMM",
                        //         "code": "invalid_literal",
                        //         "expected": "RESOURCE",
                        //         "path": [
                        //           "objectType"
                        //         ],
                        //         "message": "Invalid literal value, expected \"RESOURCE\""
                        //       },
                        //       {
                        //         "code": "invalid_type",
                        //         "expected": "string",
                        //         "received": "undefined",
                        //         "path": [
                        //           "resourceName"
                        //         ],
                        //         "message": "Required"
                        //       }
                        //   ]
                        // ],
                        message: 'Invalid input: Should pass single schema'
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse notification GET PROGRAM', function() {
            const result = joiNotification.validate(data.notifications[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                objectType: 'PROGRAM',
                operation: 'GET',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                    objectType: 'PROGRAM',
                    programName: 'PROGRAM Object',
                    programLongName: 'Program Object',
                    timeZoneOffset: '-PT8H',
                    bindingEvents: null,
                    country: null,
                    localPrice: null,
                    payloadDescriptors: null,
                    principalSubdivision: null,
                    programDescriptions: null,
                    programType: null,
                    retailerLongName: null,
                    retailerName: null,
                    targets: null,
                    intervalPeriod: {
                        start: '2023-02-20T00:00:00Z',
                        duration: 'P3M',
                        randomizeStart: "PT0S"
                    }
                }
            });
        });

        it('should parse notification POST REPORT', function() {
            const result = joiNotification
                .validate(data.notifications[1], {
                    allowUnknown: true
                });
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                objectType: 'REPORT',
                operation: 'POST',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                    objectType: 'REPORT',
                    ignoreVenNotFound: true,
                    programID: '0',
                    eventID: '0',
                    clientName: 'VEN99',
                    reportName: 'Test report #1',
                    payloadDescriptors: [
                        {
                            payloadType: 'USAGE',
                            accuracy: null,
                            confidence: null,
                            // This is not automatically filled in
                            // objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
                            readingType: null,
                            units: null
                        }
                    ],
                    resources: [
                        {
                            resourceName: '99',
                            ignoreVenNotFound: true,
                            intervalPeriod: {
                                start: "2023-03-11T12:23:15Z",
                                duration: "PT1M",
                                randomizeStart: "PT0S"
                            },
                            intervals: [
                                {
                                    id: 0,
                                    intervalPeriod: {
                                        start: '2023-03-26T18:30:28.829Z',
                                        duration: 'PT15M',
                                        randomizeStart: "PT0S"
                                    },
                                    payloads: [
                                        {
                                            type: 'USAGE',
                                            values: [ 94 ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            } as any);
        });


        it('should parse notification DELETE SUBSCRIPTION', function() {

            const result = joiNotification
                .validate(data.notifications[3], {
                    allowUnknown: true
                });
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                objectType: 'SUBSCRIPTION',
                operation: 'DELETE',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                    clientName: '9990',
                    programID: '0',
                    // whichTypes: 'EVENT',
                    objectType: 'SUBSCRIPTION',
                    targets: null,
                    objectOperations: [
                        {
                            bearerToken: null,
                            objects: [ 'EVENT' ],
                            operations: [ 'POST' ],
                            callbackUrl: 'http://localhost:9293/hook/1'
                        }
                    ]
                }
            });
        });

        it('should parse notification GET VEN', function() {

            const result = joiNotification.validate(data.notifications[4]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                objectType: 'VEN',
                operation: 'GET',
                targets: [ { type: 'GROUP_NAME', values: [ 'VEN99' ] } ],
                object: {
                    objectType: 'VEN',
                    venName: 'con-ed-lcn-Liberty-Green',
                    resources: null,
                    targets: null,
                    attributes: [
                        {
                            type: 'GEO_LOCATION',
                            values: [
                                '{ "type": "Point", "coordinates": [ -74.01432, 40.7167 ] }\n'
                            ]
                        },
                        {
                            type: 'ESX_TCN_ID',
                            values: [ 'con-ed-tcn' ]
                        },
                        {
                            type: 'ESX_CN_ID',
                            values: [ 'con-ed-BATTERY-PARK-CITY' ]
                        },
                        {
                            type: 'ESX_LONG_NAME',
                            values: [ 'Liberty Green' ]
                        }
                    ]
                }
            });
        });

        it('should parse notification POST RESOURCE', function() {

            const result = joiNotification.validate(data.notifications[5]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
                // console.log(result.error.details[0]);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                objectType: 'RESOURCE',
                operation: 'POST',
                targets: [
                    {
                        type: 'GROUP_NAME', values: [ 'VEN99' ]
                    }
                ],
                object: {
                    objectType: 'RESOURCE',
                    resourceName: 'evse-green-1',
                    targets: null,
                    attributes: [
                        {
                            type: 'DESCRIPTION',
                            values: [ 'EVSE 1 - CP 4002' ]
                        },
                        {
                            type: 'NOMINAL_VOLTAGE',
                            values: [ 208 ]
                        },
                        {
                            type: 'MAX_AMPS',
                            values: [ 32 ]
                        }
                    ]
                }
            });
        });

        it('should parse notification POST RESOURCE w/ missing field', function() {

            const result = joiNotification.validate(data.notifications[6]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');
            // assert.equal(result.error.message,
            //     '"object" does not match all of the required types');

            assert.deepEqual(result.value, {
                objectType: 'RESOURCE',
                operation: 'POST',
                targets: null,
                object: {
                    objectType: 'RESOURCE',
                    resourceName: 'evse-green-1',
                    targets: null,
                    attributes: [
                        {
                            type: 'DESCRIPTION',
                            values: [ 'EVSE 1 - CP 4002' ]
                        },
                        {
                            type: 'NOMINAL_VOLTAGE',
                            values: [ 208 ]
                        },
                        {
                            type: 'MAX_AMPS',
                            values: [ 32 ]
                        }
                    ]
                }
            });

        });

        it('should fail to parse notification w/ incorrect operation code', function() {

            const result = joiNotification.validate(data.BADnotifications[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"operation" must be one of [GET, POST, PUT, DELETE]');
        });
    });

});
