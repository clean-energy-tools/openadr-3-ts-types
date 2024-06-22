
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Subscription, parseSubscription,
    joiSubscription
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('SUBSCRIPTION', function() {

    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'subscription.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse subscription', function() {
            const subscription: Subscription = parseSubscription.parse(data.subscriptions[0]) as Subscription;
            // console.log(subscription);

            assert.deepEqual(subscription, {
                objectType: 'SUBSCRIPTION',
                clientName: '9990',
                programID: '0',
                objectOperations: [
                {
                    objects: ['EVENT'],
                    operations: ['POST'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['PUT'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['DELETE'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                }
                ],
                targets: null
            });
        });

        it('should parse subscription with extra stuff using .passthrough', function() {
            const subscription: Subscription = parseSubscription.passthrough().parse(data.subscriptions[0]) as Subscription;
            // console.log(subscription);

            assert.deepEqual(subscription, {
                objectType: 'SUBSCRIPTION',
                clientName: '9990',
                programID: '0',
                whichTypes: 'EVENT',
                objectOperations: [
                {
                    objects: ['EVENT'],
                    operations: ['POST'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['PUT'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['DELETE'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                }
                ],
                targets: null
            } as any);
        });

        it('should FAIL to parse subscription with extra stuff using .strict', function() {
            let didFail = false;
            try {
                const subscription: Subscription = parseSubscription.strict().parse(data.subscriptions[0]) as Subscription;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [{
                    "code": "unrecognized_keys",
                    "keys": [
                    "whichTypes"
                    ],
                    "path": [],
                    "message": "Unrecognized key(s) in object: 'whichTypes'"
                }]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse subscription with too-short clientName', function() {
            let didFail = false;
            try {
                const subscription: Subscription = parseSubscription.passthrough().parse(data.subsTooShortTooLong[0]) as Subscription;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [{
                    "code": "too_small",
                    "minimum": 1,
                    "type": "string",
                    "inclusive": true,
                    "exact": false,
                    "message": "String must contain at least 1 character(s)",
                    "path": [
                    "clientName"
                    ]
                }]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse subscription with too-long clientName', function() {
            let didFail = false;
            try {
                const subscription: Subscription = parseSubscription.passthrough().parse(data.subsTooShortTooLong[1]) as Subscription;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [{
                    code: 'too_big',
                    maximum: 128,
                    type: 'string',
                    inclusive: true,
                    exact: false,
                    message: 'String must contain at most 128 character(s)',
                    path: ['clientName']
                }]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse subscription with bad object types', function() {
            let didFail = false;
            try {
                const subscription: Subscription = parseSubscription.passthrough().parse(data.subsBadObjects[0]) as Subscription;
            } catch (err: any) {
                didFail = true;
                // console.log(util.inspect(err.issues));
                // for (const error of err.issues[0].unionErrors) {
                //     console.log(util.inspect(error));
                // }

                let expectProgram = false;
                let expectEvent = false;
                let expectReport = false;
                let expectSubscription = false;
                let expectVen = false;
                let expectResource = false;

                assert.isArray(err.issues);
                assert.equal(err.issues.length, 1);
                assert.equal(err.issues[0].code, 'invalid_enum_value');
                assert.deepEqual(err.issues, [
                    {
                    received: 'PROGRAMS',
                    code: 'invalid_enum_value',
                    options: [ 'PROGRAM', 'EVENT', 'REPORT', 'SUBSCRIPTION', 'VEN', 'RESOURCE' ],
                    path: [ 'objectOperations', 0, 'objects', 0 ],
                    message: "Invalid enum value. Expected 'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE', received 'PROGRAMS'"
                    }
                ]);
                // console.log(`Before loop`, err.issues);
                // for (const error of err.issues[0].unionErrors) {
                //     // console.log(util.inspect(error.issues));
                //     let issues = error.issues[0];
                //     if (issues.expected === 'PROGRAM') {
                //         expectProgram = true;
                //     } else if (issues.expected === 'EVENT') {
                //         expectEvent = true;
                //     } else if (issues.expected === 'REPORT') {
                //         expectReport = true;
                //     } else if (issues.expected === 'SUBSCRIPTION') {
                //         expectSubscription = true;
                //     } else if (issues.expected === 'VEN') {
                //         expectVen = true;
                //     } else if (issues.expected === 'RESOURCE') {
                //         expectResource = true;
                //     } else {
                //         console.log(`unexpected expect ${error[0].expect}`);
                //     }
                // }
                // assert.isOk(expectProgram);
                // assert.isOk(expectEvent);
                // assert.isOk(expectReport);
                // assert.isOk(expectSubscription);
                // assert.isOk(expectVen);
                // assert.isOk(expectResource);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse subscription with bad operation types', function() {
            let didFail = false;
            try {
                const subscription: Subscription = parseSubscription.passthrough().parse(data.subsBadOperations[0]) as Subscription;
            } catch (err: any) {
                didFail = true;
                // console.log(util.inspect(err.issues));
                // for (const error of err.issues[0].unionErrors) {
                //     console.log(util.inspect(error));
                // }

                let expectPost = false;
                let expectGet = false;
                let expectPut = false;
                let expectDelete = false;

                let gotUnexpected = false;

                assert.isArray(err.issues);
                assert.equal(err.issues.length, 1);
                assert.equal(err.issues[0].code, 'invalid_enum_value');
                assert.deepEqual(err.issues, [
                    {
                        received: 'POSTED',
                        code: 'invalid_enum_value',
                        options: [ 'GET', 'POST', 'PUT', 'DELETE' ],
                        path: [ 'objectOperations', 0, 'operations', 0 ],
                        message: "Invalid enum value. Expected 'GET' | 'POST' | 'PUT' | 'DELETE', received 'POSTED'"
                    }
                ])
                // console.log(`Before loop`, err.issues)
                // for (const error of err.issues[0].unionErrors) {
                //     // console.log(util.inspect(error.issues));
                //     let issues = error.issues[0];
                //     if (issues.expected === 'GET') {
                //         expectGet = true;
                //     } else if (issues.expected === 'POST') {
                //         expectPost = true;
                //     } else if (issues.expected === 'PUT') {
                //         expectPut = true;
                //     } else if (issues.expected === 'DELETE') {
                //         expectDelete = true;
                //     } else {
                //         console.log(`Unexpected `, error);
                //         gotUnexpected = true;
                //     }
                // }
                // assert.isOk(expectGet);
                // assert.isOk(expectPost);
                // assert.isOk(expectPut);
                // assert.isOk(expectDelete);
                // assert.isNotOk(gotUnexpected);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse subscription with extra stuff with allowUnknown', function() {
            const result = joiSubscription
                .validate(data.subscriptions[0], {
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
                clientName: '9990',
                programID: '0',
                whichTypes: "EVENT",
                objectOperations: [
                {
                    objects: ['EVENT'],
                    operations: ['POST'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['PUT'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['DELETE'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    bearerToken: null
                }
                ],
                targets: null
            });
        });

        it('should fail to parse subscription with too-short clientName', function() {
            const result = joiSubscription.validate(data.subsTooShortTooLong[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"clientName" is not allowed to be empty');

            assert.deepEqual(result.value, {
                // objectType: 'SUBSCRIPTION',
                clientName: '',
                ABOUT: "Empty client name",
                programID: '0',
                whichTypes: "EVENT",
                objectOperations: [
                {
                    objects: ['EVENT'],
                    operations: ['POST'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['PUT'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['DELETE'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                }
                ],
                // targets: null
            });
        });

        it('should fail to parse subscription with too-long clientName', function() {
            const result = joiSubscription.validate(data.subsTooShortTooLong[1]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"clientName" length must be less than or equal to 128 characters long');

            assert.deepEqual(result.value, {
                // objectType: 'SUBSCRIPTION',
                clientName: '00000000001111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000111111111122222222223333333333 -- Client name more than 128 characters',
                ABOUT: "Client name more than 128 characters",
                programID: '0',
                whichTypes: "EVENT",
                objectOperations: [
                {
                    objects: ['EVENT'],
                    operations: ['POST'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['PUT'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                },
                {
                    objects: ['EVENT'],
                    operations: ['DELETE'],
                    callbackUrl: 'http://localhost:9293/hook/1',
                    // bearerToken: null
                }
                ],
                // targets: null
            });
        });

        it('should fail to parse subscription with bad object types', function() {
            const result = joiSubscription.validate(data.subsBadObjects[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"objectOperations[0].objects[0]" must be one of [PROGRAM, EVENT, REPORT, SUBSCRIPTION, VEN, RESOURCE]');

        });

        it('should fail to parse subscription with bad operation types', function() {
            const result = joiSubscription.validate(data.subsBadOperations[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"objectOperations[0].operations[0]" must be one of [GET, POST, PUT, DELETE]');

        });
    });

});

