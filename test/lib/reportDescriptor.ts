

import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import { ReportDescriptor, reportDescriptorSchema } from '../../package/dist/index.js';
import YAML from 'js-yaml';


describe('PROGRAM', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'reportDescriptor.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse reportDescriptor', function() {
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[0]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[1]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[2]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[3]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[4]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[5]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[6]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[7]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[8]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[9]) as ReportDescriptor;
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
        const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.reportDescriptors[10]) as ReportDescriptor;
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
            const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.BADreportDescriptors[0]) as ReportDescriptor;
        } catch (err) {
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
            const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.BADreportDescriptors[1]) as ReportDescriptor;
        } catch (err) {
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
            const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.BADreportDescriptors[2]) as ReportDescriptor;
        } catch (err) {
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
            const reportDescriptor: ReportDescriptor = reportDescriptorSchema.parse(data.BADreportDescriptors[3]) as ReportDescriptor;
        } catch (err) {
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
