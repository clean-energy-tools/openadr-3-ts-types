
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ObjectID, parseObjectID,
    joiObjectID
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('OBJECT ID', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'objectID.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse objectID 0', function() {
            // console.log(data.intervals[0]);
            const objectID: ObjectID = parseObjectID.parse(data.objectIDs[0]) as ObjectID;
            // console.log(objectID);
            assert.equal(objectID, 'aaaaaaaabb');
        });

        it('should parse objectID 1', function() {
            // console.log(data.objectIDs[1]);
            const objectID: ObjectID = parseObjectID.parse(data.objectIDs[1]) as ObjectID;
            // console.log(objectID);
            assert.equal(objectID, '00000000001111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000');
        });

        it('should parse objectID 2', function() {
            // console.log(data.intervals[0]);
            const objectID: ObjectID = parseObjectID.parse(data.objectIDs[2]) as ObjectID;
            // console.log(objectID);
            assert.equal(objectID, '6538ff045a8d0fc3c4038c26');
        });

        it('should parse objectID 3', function() {
            // console.log(data.intervals[0]);
            const objectID: ObjectID = parseObjectID.parse(data.objectIDs[3]) as ObjectID;
            // console.log(objectID);
            assert.equal(objectID, 'f782f78c-9526-11ee-b965-ef8f2248395a');
        });

        it('should FAIL parse BAD objectID 0', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectID: ObjectID = parseObjectID.parse(data.BADObjectIDs[0]) as ObjectID;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                    validation: 'regex',
                    code: 'invalid_string',
                    message: 'Invalid',
                    path: []
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should FAIL parse BAD objectID 1', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectID: ObjectID = parseObjectID.parse(data.BADObjectIDs[1]) as ObjectID;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_small',
                        minimum: 1,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at least 1 character(s)',
                        path: []
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should FAIL parse BAD objectID 2', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectID: ObjectID = parseObjectID.parse(data.BADObjectIDs[2]) as ObjectID;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_big',
                        maximum: 128,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at most 128 character(s)',
                        path: []
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should FAIL parse BAD objectID 3', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectID: ObjectID = parseObjectID.parse(data.BADObjectIDs[3]) as ObjectID;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_big',
                        maximum: 128,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at most 128 character(s)',
                        path: []
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should FAIL parse BAD objectID 4', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const objectID: ObjectID = parseObjectID.parse(data.BADObjectIDs[4]) as ObjectID;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        validation: 'regex',
                        code: 'invalid_string',
                        message: 'Invalid',
                        path: []
                    },
                    {
                        code: 'too_big',
                        maximum: 128,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at most 128 character(s)',
                        path: []
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse objectID 0', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.objectIDs[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'aaaaaaaabb');
        });

        it('should parse objectID 1', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.objectIDs[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, '00000000001111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000');
        });

        it('should parse objectID 2', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.objectIDs[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, '6538ff045a8d0fc3c4038c26');
        });

        it('should parse objectID 3', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.objectIDs[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result.value, 'f782f78c-9526-11ee-b965-ef8f2248395a');
        });

        it('should parse BAD objectID 0', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.BADObjectIDs[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result?.error?.message, '"value" with value "@#(*^*^&%)" fails to match the required pattern: /^[a-zA-Z0-9_-]*$/');
        });

        it('should parse BAD objectID 1', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.BADObjectIDs[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result?.error?.message, '"value" is not allowed to be empty');
        });

        it('should parse BAD objectID 2', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.BADObjectIDs[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result?.error?.message, '"value" length must be less than or equal to 128 characters long');
        });

        it('should parse BAD objectID 3', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.BADObjectIDs[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result?.error?.message, '"value" length must be less than or equal to 128 characters long');
        });

        it('should parse BAD objectID 4', function() {
            // console.log(data.intervals[0]);
            const result = joiObjectID.validate(data.BADObjectIDs[4]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'string');

            // console.log(result.value);
            assert.equal(result?.error?.message, '"value" with value "0a0a0a0a0a0a0a0a0a0a,1b1b1b1b1b1b1b1b1b1b.2c2c2c2c2c2c2c2c2c,3d3d3d3d3d3d3d3d3d3d,4e4e4e4e4e4e4e4e4e4e,5f5f5f5f5f5f5f5f5f5f,6g6g6g6g6g6g6g6g6g6g,7h7h7h7h7h7h7h7h7h7h,8i8i8i8i8i8i8i8i8i8i,9j9j9j9j9j9j9j9j9j9j,0k0k0k0k0k0k0k0k0k0k,1l1l1l1l1l1l1l1l1l1l,2m2m2m2m2m2m2m2m2m2m,3n3n3n3n3n3n3n3n3n3n," fails to match the required pattern: /^[a-zA-Z0-9_-]*$/');
        });

    });

});
