
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    DateTime, parseDateTime, Duration, parseDuration,
    joiDateTime, joiDuration
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import Joi from 'joi';
import YAML from 'js-yaml';

describe('DATE TIME DURATION', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'dateTime.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse dateTime', function() {
            // console.log(data.dateTimes[0]);
            const dateTime: DateTime = parseDateTime.parse(data.dateTimes[0]) as DateTime;
            // console.log(dateTime);
            assert.deepEqual(dateTime, "2023-02-20T00:00:00Z" as any);
        });

        // it('should parse dateTime', function() {
        //     // console.log(data.dateTimes[0]);
        //     const dateTime: DateTime = dateTimeSchema.parse(data.dateTimes[1]) as DateTime;
        //     // console.log(dateTime);
        //     assert.deepEqual(dateTime, '1994-11-05T08:15:30-05:00' as any);
        // });

        it('should parse duration 0', function() {
            // console.log(data.dateTimes[0]);
            const dateTime: Duration = parseDuration.parse(data.durations[0]) as Duration;
            // console.log(dateTime);
            assert.deepEqual(dateTime, "P1Y2M3DT1H20M10S" as any);
        });

        it('should parse duration 1', function() {
            // console.log(data.dateTimes[0]);
            const dateTime: Duration = parseDuration.parse(data.durations[1]) as Duration;
            // console.log(dateTime);
            assert.deepEqual(dateTime, "P2M3DT1H20M10S" as any);
        });

        it('should parse duration 2', function() {
            // console.log(data.dateTimes[0]);
            const dateTime: Duration = parseDuration.parse(data.durations[2]) as Duration;
            // console.log(dateTime);
            assert.deepEqual(dateTime, "-P1Y2M3DT1H20M10S" as any);
        });

        it('should parse duration 3', function() {
            // console.log(data.dateTimes[0]);
            const dateTime: Duration = parseDuration.parse(data.durations[3]) as Duration;
            // console.log(dateTime);
            assert.deepEqual(dateTime, "-P2M3DT1H20M10S" as any);
        });
    });

    describe('JOI', function() {

        it('should parse dateTime', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.dateTimes[0], joiDateTime);
        });

        // it('should parse dateTime', function() {
        //     // console.log(data.dateTimes[0]);
        //     const dateTime: DateTime = dateTimeSchema.parse(data.dateTimes[1]) as DateTime;
        //     // console.log(dateTime);
        //     assert.deepEqual(dateTime, '1994-11-05T08:15:30-05:00' as any);
        // });

        it('should parse duration 0', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.durations[0], joiDuration);
        });

        it('should parse duration 1', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.durations[1], joiDuration);
        });

        it('should parse duration 2', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.durations[2], joiDuration);
        });

        it('should parse duration 3', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.durations[3], joiDuration);
        });
    })

});

