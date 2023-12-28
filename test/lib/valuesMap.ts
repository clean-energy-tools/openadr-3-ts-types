
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    ValuesMap, parseValuesMap,
    joiValuesMap
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('VALUES MAP', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'valuesMap.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse valuesMap 0 #1', function() {
            // console.log(data.valuesMap0[0]);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMap0[0]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'FOO',
                values: [ 'val1', 'val2' ]
            });
        });

        it('should parse valuesMap 0 #2', function() {
            // console.log(data.valuesMap0[0]);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMap0[1]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'Points',
                values: [ { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 8 }, { x: 8, y: 16 } ]
            });
        });

        it('should parse valuesMap numbers', function() {
            // console.log(data.valuesMapAllTypes);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapAllTypes[0]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'numbers',
                values: [ 1, 2.1, 3.2, 4.3, 5.4, 6.6 ]
            });
        });

        it('should parse valuesMap integers', function() {
            // console.log(data.valuesMapAllTypes);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapAllTypes[1]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'integers',
                values: [ 1, 2, 3, 4, 5, 6 ]
            });
        });

        it('should parse valuesMap strings', function() {
            // console.log(data.valuesMapAllTypes);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapAllTypes[2]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'strings',
                values: [ 'one', 'two', 'three', 'four', 'five', 'six' ]
            });
        });

        it('should parse valuesMap booleans', function() {
            // console.log(data.valuesMapAllTypes);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapAllTypes[3]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'booleans',
                values:  [ true, false, true, false, true, false ]
            });
        });

        it('should parse valuesMap points', function() {
            // console.log(data.valuesMapAllTypes);
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapAllTypes[4]) as ValuesMap;
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
            const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapExtraData[0]) as ValuesMap;
            // console.log(valuesMap);
            assert.deepEqual(valuesMap, {
                type: 'extra1',
                values: [ 1 ]
            });
        });

        it('should parse valuesMap w/ extra data seen with passthrough', function() {
            // console.log(data.valuesMapExtraData);
            const valuesMap: ValuesMap = parseValuesMap.passthrough().parse(data.valuesMapExtraData[0]) as ValuesMap;
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
                const valuesMap: ValuesMap = parseValuesMap.strict().parse(data.valuesMapExtraData[0]) as ValuesMap;
            } catch (err: any) {
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
                const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapShortType[0]) as ValuesMap;
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
                const valuesMap: ValuesMap = parseValuesMap.parse(data.valuesMapLongType[0]) as ValuesMap;
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
                        path: [ 'type' ]
                    }
                ]);
            }
            assert.isOk(didFail);
        });

    });

    describe('JOI', function() {

        it('should parse valuesMap 0 #1', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMap0[0]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'FOO',
                values: [ 'val1', 'val2' ]
            });
        });

        it('should parse valuesMap 0 #2', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMap0[1]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'Points',
                values: [ { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 8 }, { x: 8, y: 16 } ]
            });
        });

        it('should parse valuesMap numbers', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapAllTypes[0]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'numbers',
                values: [ 1, 2.1, 3.2, 4.3, 5.4, 6.6 ]
            });
        });

        it('should parse valuesMap integers', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapAllTypes[1]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'integers',
                values: [ 1, 2, 3, 4, 5, 6 ]
            });
        });

        it('should parse valuesMap strings', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapAllTypes[2]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'strings',
                values: [ 'one', 'two', 'three', 'four', 'five', 'six' ]
            });
        });

        it('should parse valuesMap booleans', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapAllTypes[3]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'booleans',
                values:  [ true, false, true, false, true, false ]
            });
        });

        it('should parse valuesMap points', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapAllTypes[4]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'points',
                values:  [
                    { x: 1, y: 2 },
                    { x: 2, y: 4 },
                    { x: 4, y: 8 },
                    { x: 8, y: 16 }
                ]
            });
        });

        it('should parse valuesMap w/ extra data seen with allowUnknown', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap
                .validate(data.valuesMapExtraData[0], {
                    allowUnknown: true
                });
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.deepEqual(result.value, {
                type: 'extra1',
                values: [ 1 ],
                extraData: "something else 1"
            });
        });

        it('should fail to parse valuesMap w/ short name', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapShortType[0]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result.error.message,
                '"type" is not allowed to be empty');

            assert.deepEqual(result.value, {
                type: '',
                values: [ "zero length type" ]
            });
        });

        it('should fail to parse valuesMap w/ extra long name', function() {
            // console.log(data.valuesMap0[0]);
            const result = joiValuesMap.validate(data.valuesMapLongType[0]);
            
            // console.log(result.value);

            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined');
            assert.isOk(typeof result.value === 'object');

            assert.equal(result.error.message,
                '"type" length must be less than or equal to 128 characters long');

            assert.deepEqual(result.value, {
                type: '00000000001111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000111111111122222222223333333333 -- Type with extra long name',
                values: [ "extra long type" ]
            });
        });

    });

});
