
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Interval, intervalSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('INTERVAL', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'interval.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse interval', function() {
        // console.log(data.intervals[0]);
        const interval: Interval = intervalSchema.parse(data.intervals[0]) as Interval;
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
        const interval: Interval = intervalSchema.parse(data.intervals[1]) as Interval;
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
        const interval: Interval = intervalSchema.parse(data.intervals[2]) as Interval;
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
        const interval: Interval = intervalSchema.parse(data.intervals[3]) as Interval;
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
        const interval: Interval = intervalSchema.passthrough().parse(data.intervals[3]) as Interval;
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
            const interval: Interval = intervalSchema.strict().parse(data.intervals[3]) as Interval;
        } catch (err) {
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
            const interval: Interval = intervalSchema.parse(data.BADintervals[0]) as Interval;
        } catch (err) {
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
