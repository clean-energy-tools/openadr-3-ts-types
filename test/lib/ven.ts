
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import { Ven, parseVen } from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('VEN', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'ven.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse ven', function() {
        const ven: Ven = parseVen.parse(data.vens[0]) as Ven;
        // console.log(ven);
        assert.deepEqual(ven, {
            venName: 'con-ed-lcn-Liberty-Green',
            attributes: [
                { 
                    type: 'GEO_LOCATION',
                    values: [ 
                    `{ "type": "Point", "coordinates": [ -74.01432, 40.7167 ] }\n`
                    ]
                },
                {
                    type: 'ESX_TCN_ID',
                    values: [ 'con-ed-tcn' ]
                },
                {
                    type: 'ESX_CN_ID',
                    values: [ 'con-ed-BATTERY-PARK-CITY' ]
                },
                {
                    type: 'ESX_LONG_NAME',
                    values: [ 'Liberty Green' ]
                }
            ],
            // Verifies that missing values have default
            resources: null
          } as any);
    });

    it('should parse ven with resources', function() {
        const ven: Ven = parseVen.parse(data.vens[1]) as Ven;
        // console.log(ven);
        assert.deepEqual(ven, {
            venName: 'con-ed-lcn-Second-Green',
            attributes: [
                { 
                    type: 'GEO_LOCATION',
                    values: [ 
                    `{ "type": "Point", "coordinates": [ -74.42432, 40.4267 ] }\n`
                    ]
                },
                {
                    type: 'ESX_TCN_ID',
                    values: [ 'con-ed-tcn' ]
                },
                {
                    type: 'ESX_CN_ID',
                    values: [ 'con-ed-BATTERY-PARK-CITY' ]
                },
                {
                    type: 'ESX_LONG_NAME',
                    values: [ 'Liberty Green' ]
                }
            ],
            resources: [
                {
                    resourceName: 'evse-second-green-1',
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
                    ]
                },
                {
                    resourceName: 'evse-second-green-2',
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
                    ]
                },
                {
                    resourceName: 'evse-second-green-3',
                    attributes: [
                        {
                            type: 'DESCRIPTION',
                            values: [ 'EVSE 3 - CP 4002' ]
                        },
                        {
                            type: 'NOMINAL_VOLTAGE',
                            values: [ 208 ]
                        },
                        {
                            type: 'MAX_AMPS',
                            values: [ 208 ]
                        }
                    ]
                }
            ]
          } as any);
    });

    it('should parse ven with resources and extra data', function() {
        const ven: Ven = parseVen.parse(data.vens[2]) as Ven;
        // console.log(ven);
        assert.deepEqual(ven, {
            venName: 'con-ed-lcn-Third-Green',
            attributes: [
                { 
                    type: 'GEO_LOCATION',
                    values: [ 
                    `{ "type": "Point", "coordinates": [ -74.42432, 40.4267 ] }\n`
                    ]
                },
                {
                    type: 'ESX_TCN_ID',
                    values: [ 'con-ed-tcn' ]
                },
                {
                    type: 'ESX_CN_ID',
                    values: [ 'con-ed-BATTERY-PARK-CITY' ]
                },
                {
                    type: 'ESX_LONG_NAME',
                    values: [ 'Liberty Green' ]
                }
            ],
            resources: [
                {
                    resourceName: 'evse-third-green-1',
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
                    ]
                },
                {
                    resourceName: 'evse-third-green-2',
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
                    ]
                },
                {
                    resourceName: 'evse-third-green-3',
                    attributes: [
                        {
                            type: 'DESCRIPTION',
                            values: [ 'EVSE 3 - CP 4002' ]
                        },
                        {
                            type: 'NOMINAL_VOLTAGE',
                            values: [ 208 ]
                        },
                        {
                            type: 'MAX_AMPS',
                            values: [ 208 ]
                        }
                    ]
                }
            ]
          } as any);
    });

    it('should parse ven with resources and extra data and passthrough', function() {
        const ven: Ven = parseVen.passthrough().parse(data.vens[2]) as Ven;
        // console.log(ven);
        assert.deepEqual(ven, {
            venName: 'con-ed-lcn-Third-Green',
            extraData: 'something completely different',
            attributes: [
                { 
                    type: 'GEO_LOCATION',
                    values: [ 
                    `{ "type": "Point", "coordinates": [ -74.42432, 40.4267 ] }\n`
                    ],
                    // .passthrough doesn't seem to affect resources
                    // extraData: 'in attributes'
                },
                {
                    type: 'ESX_TCN_ID',
                    values: [ 'con-ed-tcn' ]
                },
                {
                    type: 'ESX_CN_ID',
                    values: [ 'con-ed-BATTERY-PARK-CITY' ]
                },
                {
                    type: 'ESX_LONG_NAME',
                    values: [ 'Liberty Green' ]
                }
            ],
            resources: [
                {
                    resourceName: 'evse-third-green-1',
                    // .passthrough doesn't seem to affect resources
                    // extraData: 'something completely different 1',
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
                    // extraData: 'in resource 0'
                },
                {
                    resourceName: 'evse-third-green-2',
                    // .passthrough doesn't seem to affect resources
                    // extraData: 'something completely different 2',
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
                    ]
                },
                {
                    resourceName: 'evse-third-green-3',
                    // .passthrough doesn't seem to affect resources
                    // extraData: 'something completely different 3',
                    attributes: [
                        {
                            type: 'DESCRIPTION',
                            values: [ 'EVSE 3 - CP 4002' ]
                        },
                        {
                            type: 'NOMINAL_VOLTAGE',
                            values: [ 208 ]
                        },
                        {
                            type: 'MAX_AMPS',
                            values: [ 208 ]
                        }
                    ]
                }
            ]
          } as any);
    });

    it('should fail to parse ven with resources and extra data and strict', function() {
        let didFail = false;
        let ven: Ven;
        try {
            ven = parseVen.strict().parse(data.vens[2]) as Ven;
        } catch (err: any) {
            didFail = true;
            // console.log(err);
            assert.deepEqual(err.issues, [{
                "code": "unrecognized_keys",
                "keys": [
                  "extraData"
                ],
                "path": [],
                "message": "Unrecognized key(s) in object: 'extraData'"
            }]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse ven with bad values', function() {
        let didFail = false;
        let ven: Ven;
        try {
            ven = parseVen.parse(data.BADven[0]) as Ven;
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
                  },
                  {
                    "code": "invalid_type",
                    "expected": "array",
                    "received": "string",
                    "path": [
                      "resources"
                    ],
                    "message": "Expected array, received string"
                  }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse ven with zero-length name', function() {
        let didFail = false;
        let ven: Ven;
        try {
            ven = parseVen.parse(data.BADven[1]) as Ven;
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
                      "venName"
                    ]
                  }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse ven with extra-long name', function() {
        let didFail = false;
        let ven: Ven;
        try {
            ven = parseVen.parse(data.BADven[2]) as Ven;
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
                      "venName"
                    ]
                  }
            ]);
        }
        assert.isOk(didFail);
    });

});
