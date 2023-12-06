
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ValuesMap, valuesMapSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('VALUES MAP', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'valuesMap.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse valuesMap 0 #1', function() {
        // console.log(data.valuesMap0[0]);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMap0[0]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'FOO',
            values: [ 'val1', 'val2' ]
        });
    });

    it('should parse valuesMap 0 #2', function() {
        // console.log(data.valuesMap0[0]);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMap0[1]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'Points',
            values: [ { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 8 }, { x: 8, y: 16 } ]
          });
    });

    it('should parse valuesMap numbers', function() {
        // console.log(data.valuesMapAllTypes);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapAllTypes[0]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'numbers',
            values: [ 1, 2.1, 3.2, 4.3, 5.4, 6.6 ]
        });
    });

    it('should parse valuesMap integers', function() {
        // console.log(data.valuesMapAllTypes);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapAllTypes[1]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'integers',
            values: [ 1, 2, 3, 4, 5, 6 ]
        });
    });

    it('should parse valuesMap strings', function() {
        // console.log(data.valuesMapAllTypes);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapAllTypes[2]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'strings',
            values: [ 'one', 'two', 'three', 'four', 'five', 'six' ]
        });
    });

    it('should parse valuesMap booleans', function() {
        // console.log(data.valuesMapAllTypes);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapAllTypes[3]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'booleans',
            values:  [ true, false, true, false, true, false ]
        });
    });

    it('should parse valuesMap points', function() {
        // console.log(data.valuesMapAllTypes);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapAllTypes[4]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'points',
            values:  [
                { x: 1, y: 2 },
                { x: 2, y: 4 },
                { x: 4, y: 8 },
                { x: 8, y: 16 }
            ]
        });
    });

    it('should parse valuesMap w/ extra data not seen', function() {
        // console.log(data.valuesMapExtraData);
        const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapExtraData[0]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'extra1',
            values: [ 1 ]
        });
    });

    it('should parse valuesMap w/ extra data seen with passthrough', function() {
        // console.log(data.valuesMapExtraData);
        const valuesMap: ValuesMap = valuesMapSchema.passthrough().parse(data.valuesMapExtraData[0]) as ValuesMap;
        // console.log(valuesMap);
        assert.deepEqual(valuesMap, {
            type: 'extra1',
            values: [ 1 ],
            extraData: "something else 1"
        } as any);
    });

    it('should fail to parse valuesMap w/ extra data with strict', function() {
        // console.log(data.valuesMapExtraData);
        let didFail = false;
        try {
            const valuesMap: ValuesMap = valuesMapSchema.strict().parse(data.valuesMapExtraData[0]) as ValuesMap;
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

    it('should fail to parse valuesMap w/ short name', function() {
        // console.log(data.valuesMapExtraData);
        let didFail = false;
        try {
            const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapShortType[0]) as ValuesMap;
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
                  path: [ 'type' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse valuesMap w/ extra long name', function() {
        // console.log(data.valuesMapExtraData);
        let didFail = false;
        try {
            const valuesMap: ValuesMap = valuesMapSchema.parse(data.valuesMapLongType[0]) as ValuesMap;
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
                    path: [ 'type' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

});
