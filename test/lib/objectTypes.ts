
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ObjectTypes, parseObjectTypes,
    joiObjectTypes
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('OBJECT TYPES', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'objectTypes.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse objectType PROGRAM', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[0]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'PROGRAM');
        });

        it('should parse objectType EVENT', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[1]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'EVENT');
        });

        it('should parse objectType REPORT', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[2]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'REPORT');
        });

        it('should parse objectType SUBSCRIPTION', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[3]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'SUBSCRIPTION');
        });

        it('should parse objectType VEN', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[4]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'VEN');
        });

        it('should parse objectType RESOURCE', function() {
            // console.log(data.intervals[0]);
            const objectType: ObjectTypes = parseObjectTypes.parse(data.objectTypes[5]) as ObjectTypes;
            // console.log(objectType);
            assert.equal(objectType, 'RESOURCE');
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectType: ObjectTypes = parseObjectTypes.parse(data.BADobjectTypes[0]) as ObjectTypes;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                    received: 'PROGRAMMMMMM',
                    code: 'invalid_enum_value',
                    options: [ 'PROGRAM', 'EVENT', 'REPORT', 'SUBSCRIPTION', 'VEN', 'RESOURCE' ],
                    path: [],
                    message: "Invalid enum value. Expected 'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE', received 'PROGRAMMMMMM'"
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectType: ObjectTypes = parseObjectTypes.parse(data.BADobjectTypes[1]) as ObjectTypes;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        received: 'event',
                        code: 'invalid_enum_value',
                        options: [ 'PROGRAM', 'EVENT', 'REPORT', 'SUBSCRIPTION', 'VEN', 'RESOURCE' ],
                        path: [],
                        message: "Invalid enum value. Expected 'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE', received 'event'"
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectType: ObjectTypes = parseObjectTypes.parse(data.BADobjectTypes[2]) as ObjectTypes;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        expected: "'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE'",
                        received: 'number',
                        code: 'invalid_type',
                        path: [],
                        message: "Expected 'PROGRAM' | 'EVENT' | 'REPORT' | 'SUBSCRIPTION' | 'VEN' | 'RESOURCE', received number"
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse objectType PROGRAM', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'PROGRAM');
        });

        it('should parse objectType EVENT', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'EVENT');
        });

        it('should parse objectType REPORT', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'REPORT');
        });

        it('should parse objectType SUBSCRIPTION', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'SUBSCRIPTION');
        });

        it('should parse objectType VEN', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[4]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'VEN');
        });

        it('should parse objectType RESOURCE', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.objectTypes[5]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'RESOURCE');
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.BADobjectTypes[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.error.message, '"value" must be one of [PROGRAM, EVENT, REPORT, SUBSCRIPTION, VEN, RESOURCE]');
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.BADobjectTypes[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.error.message, '"value" must be one of [PROGRAM, EVENT, REPORT, SUBSCRIPTION, VEN, RESOURCE]');
        });

        it('should fail to parse bad objectType', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectTypes.validate(data.BADobjectTypes[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'number');

            // console.log(result.value);
            assert.equal(result.error.message, '"value" must be one of [PROGRAM, EVENT, REPORT, SUBSCRIPTION, VEN, RESOURCE]');
        });

    });

});
