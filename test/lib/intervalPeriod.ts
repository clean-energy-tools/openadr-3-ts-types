
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    IntervalPeriod, intervalPeriodSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('INTERVAL PERIOD', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'intervalPeriod.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse intervalPeriod', function() {
        // console.log(data.intervals[0]);
        const intervalPeriod: IntervalPeriod = intervalPeriodSchema.parse(data.intervalPeriod[0]) as IntervalPeriod;
        // console.log(intervalPeriod);
        assert.deepEqual(intervalPeriod, {
            start: '2023-03-26T18:30:28.829Z',
            duration: 'PT15M',
            randomizeStart: 'PT0S'
        });
    });

    it('should parse intervalPeriod w/ randomizeStart', function() {
        // console.log(data.intervals[0]);
        const intervalPeriod: IntervalPeriod = intervalPeriodSchema.parse(data.intervalPeriod[1]) as IntervalPeriod;
        // console.log(intervalPeriod);
        assert.deepEqual(intervalPeriod, {
            start: '2023-03-26T18:30:28.829Z',
            duration: 'PT15M',
            randomizeStart: 'PT3M'
        });
    });

    it('should parse intervalPeriod w/ negative durations', function() {
        // console.log(data.intervals[0]);
        const intervalPeriod: IntervalPeriod = intervalPeriodSchema.parse(data.intervalPeriod[2]) as IntervalPeriod;
        // console.log(intervalPeriod);
        assert.deepEqual(intervalPeriod, {
            start: '2023-03-26T18:30:28.829Z',
            duration: '-PT15M',
            randomizeStart: '-PT15M'
        });
    });

    it('should parse intervalPeriod w/ extra data but not see it', function() {
        // console.log(data.intervals[0]);
        const intervalPeriod: IntervalPeriod = intervalPeriodSchema.parse(data.intervalPeriod[1]) as IntervalPeriod;
        // console.log(intervalPeriod);
        assert.deepEqual(intervalPeriod, {
            start: '2023-03-26T18:30:28.829Z',
            duration: 'PT15M',
            randomizeStart: 'PT3M'
        });
    });

    it('should parse intervalPeriod w/ extra data and see it with passthrough', function() {
        // console.log(data.intervals[0]);
        const intervalPeriod: IntervalPeriod = intervalPeriodSchema.passthrough().parse(data.intervalPeriod[3]) as IntervalPeriod;
        // console.log(intervalPeriod);
        assert.deepEqual(intervalPeriod, {
            start: '2023-03-26T18:30:28.829Z',
            duration: '-PT15M',
            randomizeStart: '-PT15M',
            extraData: "Something completely different"
        } as any);
    });

    it('should fail to parse intervalPeriod w/ extra data with strict', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const intervalPeriod: IntervalPeriod = intervalPeriodSchema.strict().parse(data.intervalPeriod[3]) as IntervalPeriod;
        } catch (err) {
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

    it('should fail to parse intervalPeriod w/ bad data', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const intervalPeriod: IntervalPeriod = intervalPeriodSchema.parse(data.BADintervalPeriod[0]) as IntervalPeriod;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                  code: 'invalid_string',
                  validation: 'datetime',
                  message: 'Invalid datetime',
                  path: [ 'start' ]
                },
                {
                  validation: 'regex',
                  code: 'invalid_string',
                  message: 'Invalid',
                  path: [ 'duration' ]
                },
                {
                  validation: 'regex',
                  code: 'invalid_string',
                  message: 'Invalid',
                  path: [ 'randomizeStart' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

});
