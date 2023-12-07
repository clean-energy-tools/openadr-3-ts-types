
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Problem, problemSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('PROBLEM', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'problem.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse problem', function() {
        // console.log(data.problems[0]);
        const problem: Problem = problemSchema.parse(data.problems[0]) as Problem;
        // console.log(problem);
        assert.deepEqual(problem, {
            type: 'http://some.where.com',
            title: 'title 1',
            status: 200,
            detail: 'right here',
            instance: 'http://some.where.com'
        });
    });

    it('should fail to parse bad type url', function() {
        // console.log(data.problems[0]);
        let didFail = false;
        try {
            const problem: Problem = problemSchema.parse(data.BADProblems[0]) as Problem;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                  validation: 'url',
                  code: 'invalid_string',
                  message: 'Invalid url',
                  path: [ 'type' ]
                },
                {
                  code: 'invalid_type',
                  expected: 'number',
                  received: 'string',
                  path: [ 'status' ],
                  message: 'Expected number, received string'
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse bad instance url', function() {
        // console.log(data.problems[0]);
        let didFail = false;
        try {
            const problem: Problem = problemSchema.parse(data.BADProblems[1]) as Problem;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'invalid_type',
                    expected: 'number',
                    received: 'string',
                    path: [ 'status' ],
                    message: 'Expected number, received string'
                },
                {
                    validation: 'url',
                    code: 'invalid_string',
                    message: 'Invalid url',
                    path: [ 'instance' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse bad status too small', function() {
        // console.log(data.problems[0]);
        let didFail = false;
        try {
            const problem: Problem = problemSchema.parse(data.BADProblems[2]) as Problem;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'too_small',
                    minimum: 100,
                    type: 'number',
                    inclusive: true,
                    exact: false,
                    message: 'Number must be greater than or equal to 100',
                    path: [ 'status' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse bad status too big', function() {
        // console.log(data.problems[0]);
        let didFail = false;
        try {
            const problem: Problem = problemSchema.parse(data.BADProblems[3]) as Problem;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'too_big',
                    maximum: 600,
                    type: 'number',
                    inclusive: false,
                    exact: false,
                    message: 'Number must be less than 600',
                    path: [ 'status' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });
});
