
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Report, parseReport, joiReport
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('REPORT', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'report.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse report', function() {
            const report: Report = parseReport.parse(data.reports[0]) as Report;
            assert.deepEqual(report, {
                programID: '0',
                eventID: '0',
                clientName: 'VEN99',
                reportName: 'Test report #1',
                payloadDescriptors: [
                  {
                    objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
                    payloadType: 'USAGE',
                    readingType: null,
                    units: null,
                    accuracy: null,
                    confidence: 100
                  }
                ],
                resources: [
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  },
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  }
                ]
            });

        });

        it('should parse report with passthrough', function() {
            let report2: any = parseReport.passthrough().parse(data.reports[0]) as Report;
            // console.log(report2);
            assert.deepEqual(report2, {
                // This field is in the data, and is not
                // part of the defined Program object.
                // For the code to compile, I had to make
                // the type 'any'.
                ignoreVenNotFound: true,
                programID: '0',
                eventID: '0',
                clientName: 'VEN99',
                reportName: 'Test report #1',
                payloadDescriptors: [
                  {
                    objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
                    payloadType: 'USAGE',
                    readingType: null,
                    units: null,
                    accuracy: null,
                    confidence: 100
                  }
                ],
                resources: [
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  },
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  }
                ]
            });

        });

        it('should fail to parse report with strict', function() {
            let didFail = false;
            try {
                let report2: any = parseReport.strict().parse(data.reports[0]) as Report;
            } catch (err: any) {
                // console.log(err);
                didFail = true;
                assert.deepEqual(err.issues, [
                    {
                        code: 'unrecognized_keys',
                        keys: ["ignoreVenNotFound"],
                        path: [],
                        message: "Unrecognized key(s) in object: 'ignoreVenNotFound'"
                      }
                ])
            }
            assert.isOk(didFail);
        });

        it('should parse report with default values', function() {
            let report2: any = parseReport.parse(data.reports[2]) as Report;
            // console.log(report2);
            assert.deepEqual(report2, {
                programID: '0',
                eventID: '0',
                clientName: 'VEN99',
                reportName: 'Test report for default values',
                payloadDescriptors: null,
                resources: [
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  },
                  {
                    resourceName: '99',
                    intervalPeriod: {
                        start: "2023-03-11T12:23:15Z",
                        duration: "PT1M",
                        randomizeStart: "PT0S"
                    },
                    intervals: [
                        {
                            id: 0,
                            intervalPeriod: {
                                duration: "PT15M",
                                start: "2023-03-26T18:30:28.829Z",
                                randomizeStart: "PT0S"
                            },
                            payloads: [
                                {
                                  type: "USAGE",
                                  values: [
                                    94
                                  ]
                                }
                            ]
                        }
                    ]
                  }
                ]
            });

        });
        it('should fail to parse bad report', function() {
            let didFail = false;
            try {
                const badprog
                    = parseReport.parse(data.BADreports[0]);
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ["programID"],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ["eventID"],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ["reportName"],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ["resources", 0, "resourceName"],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: ["resources", 0, "intervals", 0, "id"],
                        message: 'Expected number, received string'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ["resources", 1, "resourceName"],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'string',
                        path: ["resources", 1, "intervals", 0, "id"],
                        message: 'Expected number, received string'
                      }
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse report with zero-length reportName', function() {
            let didFail = false;
            try {
                const badprog
                    = parseReport.parse(data.BADreports[1]);
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        code: 'too_small',
                        minimum: 1,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at least 1 character(s)',
                        path: ["clientName"]
                      } 
                ]);
            }
            assert.isOk(didFail);
        });

        it('should fail to parse report with extra-long reportName', function() {
            let didFail = false;
            try {
                const badprog
                    = parseReport.parse(data.BADreports[2]);
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        code: "too_big",
                        maximum: 128,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: 'String must contain at most 128 character(s)',
                        path: ["clientName"]
                      } 
                ]);
            }
            assert.isOk(didFail);
        });

      });

      describe('JOI', function() {

        it('should parse report w/ extra fields passthrough', function() {
          const result = joiReport.validate(data.reports[0], {
            allowUnknown: true
          });

          // console.log(result.value);

          if (result.error) {
              // console.log(result.error);
          }
          assert.isOk(typeof result.error === 'undefined');
          assert.isOk(typeof result.value === 'object');


          assert.deepEqual(result.value, {
              programID: '0',
              eventID: '0',
              clientName: 'VEN99',
              reportName: 'Test report #1',
              ignoreVenNotFound: true,
              payloadDescriptors: [
                {
                  objectType: 'REPORT_PAYLOAD_DESCRIPTOR',
                  payloadType: 'USAGE',
                  readingType: null,
                  units: null,
                  accuracy: null,
                  confidence: 100
                }
              ],
              resources: [
                {
                  resourceName: '99',
                  ignoreVenNotFound: true,
                  intervalPeriod: {
                      start: "2023-03-11T12:23:15Z",
                      duration: "PT1M",
                      randomizeStart: "PT0S"
                  },
                  intervals: [
                      {
                          id: 0,
                          intervalPeriod: {
                              duration: "PT15M",
                              start: "2023-03-26T18:30:28.829Z",
                              randomizeStart: "PT0S"
                          },
                          payloads: [
                              {
                                type: "USAGE",
                                values: [
                                  94
                                ]
                              }
                          ]
                      }
                  ]
                },
                {
                  resourceName: '99',
                  ignoreVenNotFound: true,
                  intervalPeriod: {
                      start: "2023-03-11T12:23:15Z",
                      duration: "PT1M",
                      randomizeStart: "PT0S"
                  },
                  intervals: [
                      {
                          id: 0,
                          intervalPeriod: {
                              duration: "PT15M",
                              start: "2023-03-26T18:30:28.829Z",
                              randomizeStart: "PT0S"
                          },
                          payloads: [
                              {
                                type: "USAGE",
                                values: [
                                  94
                                ]
                              }
                          ]
                      }
                  ]
                }
              ]
          });

      });

      it('should parse report with default values', function() {
        const result = joiReport.validate(data.reports[2], {
          allowUnknown: true
        });

        // console.log(result.value);

        if (result.error) {
            // console.log(result.error);
        }
        assert.isOk(typeof result.error === 'undefined');
        assert.isOk(typeof result.value === 'object');

        assert.deepEqual(result.value, {
            programID: '0',
            eventID: '0',
            clientName: 'VEN99',
            reportName: 'Test report for default values',
            payloadDescriptors: null,
            ignoreVenNotFound: true,
            resources: [
              {
                resourceName: '99',
                ignoreVenNotFound: true,
                intervalPeriod: {
                    start: "2023-03-11T12:23:15Z",
                    duration: "PT1M",
                    randomizeStart: "PT0S"
                },
                intervals: [
                    {
                        id: 0,
                        intervalPeriod: {
                            duration: "PT15M",
                            start: "2023-03-26T18:30:28.829Z",
                            randomizeStart: "PT0S"
                        },
                        payloads: [
                            {
                              type: "USAGE",
                              values: [
                                94
                              ]
                            }
                        ]
                    }
                ]
              },
              {
                resourceName: '99',
                ignoreVenNotFound: true,
                intervalPeriod: {
                    start: "2023-03-11T12:23:15Z",
                    duration: "PT1M",
                    randomizeStart: "PT0S"
                },
                intervals: [
                    {
                        id: 0,
                        intervalPeriod: {
                            duration: "PT15M",
                            start: "2023-03-26T18:30:28.829Z",
                            randomizeStart: "PT0S"
                        },
                        payloads: [
                            {
                              type: "USAGE",
                              values: [
                                94
                              ]
                            }
                        ]
                    }
                ]
              }
            ]
        });

      });

      it('should fail to parse bad report', function() {
        const result = joiReport.validate(data.BADreports[0]);

        // console.log(result.value);

        if (result.error) {
            // console.log(result.error);
        }
        assert.isOk(typeof result.error !== 'undefined');
        assert.isOk(typeof result.value === 'object');

        assert.equal(result?.error?.message,
            '"programID" must be a string');
      });

      it('should fail to parse report with zero-length reportName', function() {
        const result = joiReport.validate(data.BADreports[1]);

        // console.log(result.value);

        if (result.error) {
            // console.log(result.error);
        }
        assert.isOk(typeof result.error !== 'undefined');
        assert.isOk(typeof result.value === 'object');

        assert.equal(result?.error?.message,
            '"clientName" is not allowed to be empty');
      });

      it('should fail to parse report with extra-long reportName', function() {
        const result = joiReport.validate(data.BADreports[2]);

        // console.log(result.value);

        if (result.error) {
            // console.log(result.error);
        }
        assert.isOk(typeof result.error !== 'undefined');
        assert.isOk(typeof result.value === 'object');

        assert.equal(result?.error?.message,
            '"clientName" length must be less than or equal to 128 characters long');
      });

    });

      
});
