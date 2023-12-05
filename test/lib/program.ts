

import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Program, programSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('PROGRAM', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'program.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    let prog0: Program;
    it('should parse prog0', function() {
        prog0 = programSchema.parse(data.prog0[0]) as Program;
        // console.log(prog0);
        assert.deepEqual(prog0, {
            programName: 'TEST-EXAMPLE-1',
            programLongName: 'TEST Example 1',
            retailerName: 'TEST-LTP',
            retailerLongName: 'TEST Long Tail Pipe',
            programType: 'any',
            country: 'US',
            principalSubdivision: 'SD',
            timeZoneOffset: '-PT8H',
            intervalPeriod: {
                start: '2023-02-20T00:00:00Z',
                duration: 'P3M'
            },
            programDescriptions: null,
            bindingEvents: false,
            localPrice: false,
            payloadDescriptors: null,
            targets: null
        });
    });

    it('should parse program with default values', function() {
        const progDefaults: Program = programSchema.parse(data.prog0[1]) as Program;
        // console.log(prog0);
        assert.deepEqual(progDefaults, {
            programName: 'TEST-EXAMPLE-defaults',
            programLongName: 'TEST Example default values',
            retailerName: null,
            retailerLongName: null,
            programType: null,
            country: null,
            principalSubdivision: null,
            timeZoneOffset: '-PT8H',
            intervalPeriod: {
                start: '2023-02-20T00:00:00Z',
                duration: 'P3M'
            },
            programDescriptions: null,
            bindingEvents: false,
            localPrice: false,
            payloadDescriptors: null,
            targets: null
        });
    });

    it('should fail to parse bad program', function() {
        let didFail = false;
        try {
            const badprog
                = programSchema.parse(data.BADprog[0]);
        } catch (err) {
            didFail = true;
            assert.deepEqual(err.issues, [
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: ["programName"],
                  message: 'Expected string, received number'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: ["programLongName"],
                  message: 'Expected string, received number'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: ["retailerName"],
                  message: 'Expected string, received number'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: ["retailerLongName"],
                  message: 'Expected string, received number'
                },
                {
                  validation: 'regex',
                  code: 'invalid_string',
                  message: 'Invalid',
                  path: ["timeZoneOffset"]
                },
                {
                  code: 'invalid_type',
                  expected: 'boolean',
                  received: 'string',
                  path: ["bindingEvents"],
                  message: 'Expected boolean, received string'
                },
                {
                  code: 'invalid_type',
                  expected: 'boolean',
                  received: 'string',
                  path: ["localPrice"],
                  message: 'Expected boolean, received string'
                }
              ]);
        }
        assert.isOk(didFail);
    })

    it('should fail to parse zero-length program name', function() {
        let didFail = false;
        try {
            const badprog
                = programSchema.parse(data.BADprog[1]);
        } catch (err) {
            didFail = true;
            assert.deepEqual(err.issues, [
                {
                    code: 'too_small',
                    minimum: 1,
                    type: 'string',
                    inclusive: true,
                    exact: false,
                    message: 'String must contain at least 1 character(s)',
                    path: ["programName"]
                }
              ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse extra-long program name', function() {
        let didFail = false;
        try {
            const badprog
                = programSchema.parse(data.BADprog[2]);
        } catch (err) {
            didFail = true;
            assert.deepEqual(err.issues, [
                {
                    code: 'too_big',
                    maximum: 128,
                    type: 'string',
                    inclusive: true,
                    exact: false,
                    message: 'String must contain at most 128 character(s)',
                    path: ["programName"]
                  }
              ]);
        }
        assert.isOk(didFail);
    });

});

