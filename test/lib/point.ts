
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Point, parsePoint, joiPoint
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('POINT', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'point.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse point', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[0]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: 1, y: 1 });
        });

        it('should parse point w/ negative numbers', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[1]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: -1, y: -1 });
        });

        it('should parse point w/ floating numbers', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[2]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: 1.1, y: 2.2 });
        });

        it('should parse point w/ missing x', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[3]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: null, y: 3 });
        });

        it('should parse point w/ missing y', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[4]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: 4, y: null });
        });

        it('should parse point w/ both missing', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[5]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: null, y: null });
        });

        it('should parse point w/ extra data not seen', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.parse(data.points[6]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: 1, y: 2 });
        });

        it('should parse point w/ extra data seen w/ passthrough', function() {
            // console.log(data.intervals[0]);
            const point: Point = parsePoint.passthrough().parse(data.points[6]) as Point;
            // console.log(point);
            assert.deepEqual(point, { x: 1, y: 2, extraData: 'one' } as any);
        });

        it('should fail to parse point w/ extra data w/ strict', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const point: Point = parsePoint.strict().parse(data.points[6]) as Point;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                    code: 'unrecognized_keys',
                    keys: [ 'extraData' ],
                    path: [],
                    message: "Unrecognized key(s) in object: 'extraData'"
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse point w/ bad data', function() {
            // console.log(data.intervals[0]);
            let didFail = false;
            try {
                const point: Point = parsePoint.strict().parse(data.points[7]) as Point;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                    code: 'invalid_type',
                    expected: 'number',
                    received: 'string',
                    path: [ 'x' ],
                    message: 'Expected number, received string'
                    },
                    {
                    code: 'invalid_type',
                    expected: 'number',
                    received: 'string',
                    path: [ 'y' ],
                    message: 'Expected number, received string'
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse point', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { x: 1, y: 1 });
        });

        it('should parse point w/ negative numbers', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { x: -1, y: -1 });
        });

        it('should parse point w/ floating numbers', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { x: 1.1, y: 2.2 });
        });

        it('should parse point w/ missing x', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { y: 3 });
            assert.equal(result.error.message,
                '"x" is required');
        });

        it('should parse point w/ missing y', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[4]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { x: 4 });
            assert.equal(result.error.message,
                '"y" is required');
        });

        it('should parse point w/ both missing', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[5]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, { });
            assert.equal(result.error.message,
                '"x" is required');
        });

        it('should parse point w/ extra data seen w/ passthrough', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[6]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, {
                x: 1,
                y: 2,
                extraData: 'one'
            });
        });

        it('should fail to parse point w/ bad data', function() {
            // console.log(data.intervals[0]);
            const result = joiPoint.validate(data.points[7]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(result.value);

            assert.deepEqual(result.value, {
                x: 'one', y: 'two'
            });
            assert.equal(result.error.message,
                '"x" must be a number');
        });
    });

});
