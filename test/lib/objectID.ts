
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ObjectID, parseObjectID
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
