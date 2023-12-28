
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

        it('should parse dateTime 0', function() {
            // console.log(data.dateTimes[0]);
            Joi.assert(data.dateTimes[0], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[0] /*, { convert: false } */);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });

        // This, 1999-12-31, is actually a Date
        it('should parse dateTime 1', function() {
            // console.log(data.dateTimes[0]);
            // Joi.assert(data.dateTimes[1], joiDateTime);
            const result = joiDateTime
                    .validate(data.dateTimes[1]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
            assert.equal(result.error.message,
                '`1999-12-31` is not a valid ISO DateTime string');
        });

        // This, 1111-12, is actually a YearMonth
        it('should parse dateTime 2', function() {
            // console.log(data.dateTimes[0]);
            // Joi.assert(data.dateTimes[2], joiDateTime);
            const result = joiDateTime
                .validate(data.dateTimes[2]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
            assert.equal(result.error.message,
                '`1111-12` is not a valid ISO DateTime string');
        });

        it('should not parse dateTime 3', function() {
            // console.log(data.dateTimes[3]);
            // Joi.assert(data.dateTimes[3], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[3]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });

        it('should not parse dateTime 4', function() {
            // console.log(data.dateTimes[4]);
            // Joi.assert(data.dateTimes[4], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[4] /*, { convert: false } */);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });


        it('should not parse dateTime 5', function() {
            // console.log(data.dateTimes[5]);
            // Joi.assert(data.dateTimes[5], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[5]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });

        it('should not parse dateTime 6', function() {
            // console.log(data.dateTimes[6]);
            // Joi.assert(data.dateTimes[6], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[6] /*, { convert: false } */);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });

        it('should not parse dateTime 7', function() {
            // console.log(data.dateTimes[7]);
            // Joi.assert(data.dateTimes[7], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[7]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
        });

        it('should not parse dateTime 8', function() {
            // console.log(data.dateTimes[8]);
            // Joi.assert(data.dateTimes[8], joiDateTime);
            const result = joiDateTime.validate(data.dateTimes[8]);
            if (result.error) {
                // console.log(result.error);
            }
            // See: https://github.com/savotije/openapi-to-joi/issues/4
            // console.log(result.value);
            // console.log(typeof result.value);
            // console.log(result.value instanceof Date);
            assert.isOk(result.error);
            assert.isOk(!(typeof result.value === 'object'));
            assert.isOk(typeof result.value === 'string');
            assert.isOk(!(result.value instanceof Date));
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

