
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ReportPayloadDescriptor, reportPayloadDescriptorSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('REPORT PAYLOAD DESCRIPTOR', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'reportPayload.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse reportPayload', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[0]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: 'DIRECT_READ',
            units: 'KWH',
            accuracy: 0.5,
            confidence: 90
        } as any);
    });

    it('should parse reportPayload w/o objectType', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[1]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: 'DIRECT_READ',
            units: 'KWH',
            accuracy: 0.5,
            confidence: 90
        } as any);
    });

    it('should parse reportPayload w/o readingType', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[2]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: null,
            units: 'KWH',
            accuracy: 0.5,
            confidence: 90
        } as any);
    });

    it('should parse reportPayload w/o units', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[3]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: 'DIRECT_READ',
            units: null,
            accuracy: 0.5,
            confidence: 90
        } as any);
    });

    it('should parse reportPayload w/o accuracy', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[4]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: 'DIRECT_READ',
            units: 'KWH',
            accuracy: null,
            confidence: 90
        } as any);
    });

    it('should parse reportPayload w/o confidence', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[5]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: 'DIRECT_READ',
            units: 'KWH',
            accuracy: 0.5,
            confidence: 100
        } as any);
    });

    it('should parse reportPayload w/o everything', function() {
        // console.log(data.intervals[0]);
        const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.reportPayloadDescriptors[6]) as ReportPayloadDescriptor;
        // console.log(reportPayload);
        assert.deepEqual(reportPayload, {
            objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
            payloadType: 'USAGE',
            readingType: null,
            units: null,
            accuracy: null,
            confidence: 100
        } as any);
    });

    it('should fail to parse reportPayload w/ low confidence', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[0]) as ReportPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                  code: 'too_small',
                  minimum: 0,
                  type: 'number',
                  inclusive: true,
                  exact: false,
                  message: 'Number must be greater than or equal to 0',
                  path: [ 'confidence' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse reportPayload w/ high confidence', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[1]) as ReportPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'too_big',
                    maximum: 100,
                    type: 'number',
                    inclusive: true,
                    exact: false,
                    message: 'Number must be less than or equal to 100',
                    path: [ 'confidence' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse reportPayload w/ bad values', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[2]) as ReportPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'invalid_type',
                    expected: 'string',
                    received: 'number',
                    path: [ 'payloadType' ],
                    message: 'Expected string, received number'
                },
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
                    expected: 'number',
                    received: 'string',
                    path: [ 'accuracy' ],
                    message: 'Expected number, received string'
                },
                {
                    code: 'invalid_type',
                    expected: 'number',
                    received: 'string',
                    path: [ 'confidence' ],
                    message: 'Expected number, received string'
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse reportPayload w/ short payload type', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[3]) as ReportPayloadDescriptor;
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

    it('should fail to parse reportPayload w/ long payload type', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[4]) as ReportPayloadDescriptor;
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

    it('should fail to parse reportPayload w/ missing payload type', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const reportPayload: ReportPayloadDescriptor = reportPayloadDescriptorSchema.parse(data.BADreportPayloadDescriptors[5]) as ReportPayloadDescriptor;
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

});

