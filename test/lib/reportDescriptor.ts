

import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ReportDescriptor, parseReportDescriptor,
    joiReportDescriptor
} from '../../package/dist/index.js';
import YAML from 'js-yaml';


describe('REPORT DESCRIPTOR', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'reportDescriptor.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse reportDescriptor', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[0]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing readingType', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[1]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: null,
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing units', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[2]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: null,
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing targets', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[3]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: null,
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing aggregate', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[4]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing startInterval', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[5]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing numIntervals', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[6]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing historical', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[7]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: true,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing frequency', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[8]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing repeat', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[9]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing many fields', function() {
            const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.reportDescriptors[10]) as ReportDescriptor;
            // console.log(reportDescriptor);
            assert.deepEqual(reportDescriptor, {
                payloadType: 'USAGE',
                readingType: null,
                units: null,
                targets: null,
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: true,
                frequency: -1,
                repeat: 1
            });
        });

        it('should fail to parse reportDescriptor with short payload type name', function() {
            let didFail = false;
            try {
                const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.BADreportDescriptors[0]) as ReportDescriptor;
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
                    path: [ 'payloadType' ]
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse reportDescriptor with long payload type name', function() {
            let didFail = false;
            try {
                const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.BADreportDescriptors[1]) as ReportDescriptor;
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
                        path: [ 'payloadType' ]
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse reportDescriptor with missing payload type name', function() {
            let didFail = false;
            try {
                const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.BADreportDescriptors[2]) as ReportDescriptor;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'undefined',
                        path: [ 'payloadType' ],
                        message: 'Required'
                    }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse reportDescriptor with bad values', function() {
            let didFail = false;
            try {
                const reportDescriptor: ReportDescriptor = parseReportDescriptor.parse(data.BADreportDescriptors[3]) as ReportDescriptor;
            } catch (err: any) {
                didFail = true;
                // console.log(err.issues);
                assert.deepEqual(err.issues, [
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'readingType' ],
                        message: 'Expected string, received number'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'units' ],
                        message: 'Expected string, received number'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'array',
                        received: 'string',
                        path: [ 'targets' ],
                        message: 'Expected array, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'boolean',
                        received: 'string',
                        path: [ 'aggregate' ],
                        message: 'Expected boolean, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: [ 'startInterval' ],
                        message: 'Expected number, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: [ 'numIntervals' ],
                        message: 'Expected number, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'boolean',
                        received: 'string',
                        path: [ 'historical' ],
                        message: 'Expected boolean, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: [ 'frequency' ],
                        message: 'Expected number, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: [ 'repeat' ],
                        message: 'Expected number, received string'
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse reportDescriptor', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing readingType', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: null,
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing units', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: null,
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing targets', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: null,
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing aggregate', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[4]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing startInterval', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[5]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing numIntervals', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[6]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing historical', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[7]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: true,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing frequency', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[8]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing repeat', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[9]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: 'DIRECT_READ',
                units: 'KWH',
                targets: [
                {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                }],
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: false,
                frequency: -1,
                repeat: 1
            });
        });

        it('should parse reportDescriptor missing many fields', function() {
            const result = joiReportDescriptor.validate(data.reportDescriptors[10]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            // console.log(reportDescriptor);
            assert.deepEqual(result.value, {
                payloadType: 'USAGE',
                readingType: null,
                units: null,
                targets: null,
                aggregate: false,
                startInterval: -1,
                numIntervals: -1,
                historical: true,
                frequency: -1,
                repeat: 1
            });
        });

        it('should fail to parse reportDescriptor with short payload type name', function() {
            const result = joiReportDescriptor.validate(data.BADreportDescriptors[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"payloadType" is not allowed to be empty');
        });

        it('should fail to parse reportDescriptor with long payload type name', function() {
            const result = joiReportDescriptor.validate(data.BADreportDescriptors[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"payloadType" length must be less than or equal to 128 characters long');
        });

        it('should fail to parse reportDescriptor with missing payload type name', function() {
            const result = joiReportDescriptor.validate(data.BADreportDescriptors[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"payloadType" is required');
        });

        it('should fail to parse reportDescriptor with bad values', function() {
            const result = joiReportDescriptor.validate(data.BADreportDescriptors[3]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"readingType" must be a string');
        });

    });
});
