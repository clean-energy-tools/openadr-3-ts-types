
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Resource, parseResource, joiResource
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('RESOURCE', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'resource.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse resource', function() {
            const resource: Resource = parseResource.parse(data.resources[0]) as Resource;
            // console.log(resource);
            assert.deepEqual(resource, {
                resourceName: 'evse-green-1',
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 1 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 32 ]
                    }
                ],
                targets: null
            } as any);
        });

        it('should parse resource not see extra fields no passthrough', function() {
            const resource: Resource = parseResource.parse(data.resources[1]) as Resource;
            // console.log(resource);
            assert.deepEqual(resource, {
                resourceName: 'evse-green-2-extra-data',
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 2 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 208 ]
                    }
                ],
                targets: null
            } as any);
        });

        it('should parse resource see extra fields passthrough', function() {
            const resource: Resource = parseResource.passthrough().parse(data.resources[1]) as Resource;
            // console.log(resource);
            assert.deepEqual(resource, {
                resourceName: 'evse-green-2-extra-data',
                extraData: "something else",
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 2 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 208 ]
                    }
                ],
                targets: null
            } as any);
        });

        it('should fail to parse resource strict', function() {
            let didFail = false;
            try {
                const resource: Resource = parseResource.strict().parse(data.resources[1]) as Resource;
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

        it('should parse resource supply default for missing fields', function() {
            const resource: Resource = parseResource.parse(data.resources[2]) as Resource;
            // console.log(resource);
            assert.deepEqual(resource, {
                resourceName: 'evse-green-3-missing',
                attributes: null,
                targets: null
            } as any);
        });

        it('should fail to parse resource with bad values', function() {
            let didFail = false;
            try {
                const resource: Resource = parseResource.parse(data.BADresources[0]) as Resource;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        "code": "invalid_type",
                        "expected": "string",
                        "received": "number",
                        "path": [
                        "id"
                        ],
                        "message": "Expected string, received number"
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "attributes"
                        ],
                        "message": "Expected array, received string"
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "targets"
                        ],
                        "message": "Expected array, received string"
                    }
                ])
            }
            assert.isOk(didFail);
        });

        it('should fail to parse resourceName too short', function() {
            let didFail = false;
            try {
                const resource: Resource = parseResource.parse(data.BADresources[1]) as Resource;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        "code": "too_small",
                        "minimum": 1,
                        "type": "string",
                        "inclusive": true,
                        "exact": false,
                        "message": "String must contain at least 1 character(s)",
                        "path": [
                        "resourceName"
                        ]
                    }
                ])
            }
            assert.isOk(didFail);

        });

        it('should fail to parse resourceName extra-long', function() {
            let didFail = false;
            try {
                const resource: Resource = parseResource.parse(data.BADresources[2]) as Resource;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        "code": "too_big",
                        "maximum": 128,
                        "type": "string",
                        "inclusive": true,
                        "exact": false,
                        "message": "String must contain at most 128 character(s)",
                        "path": [
                        "resourceName"
                        ]
                    }
                ])
            }
            assert.isOk(didFail);

        });

    });

    describe('JOI', function() {

        it('should parse resource', function() {
            const result = joiResource.validate(data.resources[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                resourceName: 'evse-green-1',
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 1 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 32 ]
                    }
                ],
                targets: null
            } as any);
        });

        it('should parse resource see extra fields allowUnknown', function() {
            const result = joiResource
                .validate(data.resources[1], {
                    allowUnknown: true
                });

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                resourceName: 'evse-green-2-extra-data',
                extraData: "something else",
                attributes: [
                    {
                        type: 'DESCRIPTION',
                        values: [ 'EVSE 2 - CP 4002' ]
                    },
                    {
                        type: 'NOMINAL_VOLTAGE',
                        values: [ 208 ]
                    },
                    {
                        type: 'MAX_AMPS',
                        values: [ 208 ]
                    }
                ],
                targets: null
            } as any);
        });

        it('should parse resource supply default for missing fields', function() {
            const result = joiResource.validate(data.resources[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                resourceName: 'evse-green-3-missing',
                attributes: null,
                targets: null
            } as any);
        });

        it('should fail to parse resource with bad values', function() {
            const result = joiResource.validate(data.BADresources[0]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {    
                attributes: "bad attributes",
                id: 99,
                resourceName: "Resource with bad values",
                targets: "bad targets"
            } as any);

            assert.equal(result?.error?.message,
                '"id" must be a string');
        });

        it('should fail to parse resourceName too short', function() {
            const result = joiResource.validate(data.BADresources[1]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"resourceName" is not allowed to be empty');
        });

        it('should fail to parse resourceName extra-long', function() {
            const result = joiResource.validate(data.BADresources[2]);

            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result?.error?.message,
                '"resourceName" length must be less than or equal to 128 characters long');
        });

    });

});
