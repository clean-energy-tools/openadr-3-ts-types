
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Interval, parseInterval, joiInterval
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('INTERVAL', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'interval.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse interval', function() {
            // console.log(data.intervals[0]);
            const interval: Interval = parseInterval.parse(data.intervals[0]) as Interval;
            // console.log(interval);
            assert.deepEqual(interval, {
                id: 0,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT0S'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ randomized start', function() {
            const interval: Interval = parseInterval.parse(data.intervals[1]) as Interval;
            // console.log(interval);
            assert.deepEqual(interval, {
                id: 1,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT15M'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ negative durations', function() {
            const interval: Interval = parseInterval.parse(data.intervals[2]) as Interval;
            // console.log(interval);
            assert.deepEqual(interval, {
                id: 2,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: '-PT15M',
                    randomizeStart: '-PT15M'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ extra data, no passthrough, no data', function() {
            const interval: Interval = parseInterval.parse(data.intervals[3]) as Interval;
            // console.log(interval);
            assert.deepEqual(interval, {
                id: 3,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT0S'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ extra data, passthrough, see data', function() {
            // console.log(data.intervals[3]);
            const interval: Interval = parseInterval.passthrough().parse(data.intervals[3]) as Interval;
            // console.log(interval);
            assert.deepEqual(interval, {
                id: 3,
                extraData: "Something else",
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT0S'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should fail to parse interval w/ extra data, strict', function() {
            let didFail = false;
            try {
                const interval: Interval = parseInterval.strict().parse(data.intervals[3]) as Interval;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        "code": "unrecognized_keys",
                        "keys": [
                        "extraData"
                        ],
                        "path": [],
                        "message": "Unrecognized key(s) in object: 'extraData'"
                    }
                ])
            }
            assert.isOk(didFail);
        });

        it('should fail to parse interval w/ bad data', function() {
            let didFail = false;
            try {
                // console.log(data.BADintervals[0]);
                const interval: Interval = parseInterval.parse(data.BADintervals[0]) as Interval;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: ["id"],
                        message: 'Expected number, received string'
                    },
                    {
                        code: 'invalid_string',
                        validation: 'datetime',
                        message: 'Invalid datetime',
                        path: [ "intervalPeriod", "start" ]
                    },
                    {
                        validation: 'regex',
                        code: 'invalid_string',
                        message: 'Invalid',
                        path: [ "intervalPeriod", "duration" ]
                    }
                ])
            }
            assert.isOk(didFail);
        });

    });


    describe('ZOD', function() {

        it('should parse interval', function() {
            // console.log(data.intervals[0]);
            const result = joiInterval.validate(data.intervals[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                id: 0,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT0S'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ randomized start', function() {
            // console.log(data.intervals[0]);
            const result = joiInterval.validate(data.intervals[1]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                id: 1,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT15M'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ negative durations', function() {
            // console.log(data.intervals[0]);
            const result = joiInterval.validate(data.intervals[2]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                id: 2,
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: '-PT15M',
                    randomizeStart: '-PT15M'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should parse interval w/ extra data, allowUnknown, see data', function() {
            // console.log(data.intervals[0]);
            const result = joiInterval
                .validate(data.intervals[3], {
                    allowUnknown: true
                });
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                id: 3,
                extraData: "Something else",
                intervalPeriod: {
                    start: '2023-03-26T18:30:28.829Z',
                    duration: 'PT15M',
                    randomizeStart: 'PT0S'
                },
                payloads: [ { type: 'USAGE', values: [94] } ]
            } as any);
        });

        it('should fail to parse interval w/ bad data', function() {
            const result = joiInterval.validate(data.BADintervals[0]);
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                    '`26 March 2023, 18:30:28.829` is not a valid ISO DateTime string');
        });

    });

});
