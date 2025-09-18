/**
 * Auto-generated AJV validators for OpenADR 3.1.0
 * 
 * These validators preserve all OpenAPI validation constraints:
 * - @pattern for regex patterns
 * - @minLength/@maxLength for string length constraints  
 * - @minimum/@maximum for numeric constraints
 * - @format for format validation (date-time, uri, etc.)
 * 
 * Generated from: openadr3.1.0.yaml
 */

import Ajv, { type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import type * as Schemas from './openadr3Schemas.js';

// Export schema type aliases for convenience
export type Program = Schemas.Program;
export type ProgramRequest = Schemas.ProgramRequest;
export type Report = Schemas.Report;
export type ReportRequest = Schemas.ReportRequest;
export type Event = Schemas.Event;
export type EventRequest = Schemas.EventRequest;
export type Subscription = Schemas.Subscription;
export type SubscriptionRequest = Schemas.SubscriptionRequest;
export type Ven = Schemas.Ven;
export type VenRequest = Schemas.VenRequest;
export type BlVenRequest = Schemas.BlVenRequest;
export type VenVenRequest = Schemas.VenVenRequest;
export type Resource = Schemas.Resource;
export type ResourceRequest = Schemas.ResourceRequest;
export type BlResourceRequest = Schemas.BlResourceRequest;
export type VenResourceRequest = Schemas.VenResourceRequest;
export type ObjectMetadata = Schemas.ObjectMetadata;
export type Interval = Schemas.Interval;
export type IntervalPeriod = Schemas.IntervalPeriod;
export type ValuesMap = Schemas.ValuesMap;
export type Point = Schemas.Point;
export type EventPayloadDescriptor = Schemas.EventPayloadDescriptor;
export type ReportPayloadDescriptor = Schemas.ReportPayloadDescriptor;
export type ReportDescriptor = Schemas.ReportDescriptor;
export type ObjectID = Schemas.ObjectID;
export type ClientID = Schemas.ClientID;
export type VenName = Schemas.VenName;
export type ClientName = Schemas.ClientName;
export type Target = Schemas.Target;
export type ResourceName = Schemas.ResourceName;
export type Units = Schemas.Units;
export type ReadingType = Schemas.ReadingType;
export type Notification = Schemas.Notification;
export type ObjectTypes = Schemas.ObjectTypes;
export type DateTime = Schemas.DateTime;
export type Duration = Schemas.Duration;
export type ClientCredentialRequest = Schemas.ClientCredentialRequest;
export type ClientCredentialResponse = Schemas.ClientCredentialResponse;
export type AuthError = Schemas.AuthError;
export type AuthServerInfo = Schemas.AuthServerInfo;
export type NotifiersResponse = Schemas.NotifiersResponse;
export type MqttNotifierBindingObject = Schemas.MqttNotifierBindingObject;
export type MqttNotifierAuthenticationAnonymous = Schemas.MqttNotifierAuthenticationAnonymous;
export type MqttNotifierAuthenticationOauth2BearerToken = Schemas.MqttNotifierAuthenticationOauth2BearerToken;
export type MqttNotifierAuthenticationCertificate = Schemas.MqttNotifierAuthenticationCertificate;
export type NotifierOperationsTopics = Schemas.NotifierOperationsTopics;
export type NotifierTopicsResponse = Schemas.NotifierTopicsResponse;

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors: ErrorObject[];
}

// Configure AJV instance
const ajv = new Ajv({ 
  allErrors: true,
  strict: false,
  validateSchema: false
});
addFormats(ajv);

// JSON Schema definitions
/**
 * Server provided representation of program
 */
export const programSchema = {
  "type": "object",
  "description": "Server provided representation of program",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "Client provided description of program",
      "required": [
        "programName"
      ],
      "properties": {
        "programName": {
          "type": "string",
          "description": "Short name to uniquely identify program.",
          "minLength": 1,
          "maxLength": 128
        },
        "intervalPeriod": {
          "type": "object",
          "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
          "properties": {
            "start": {
              "type": "string",
              "format": "date-time",
              "description": "datetime in RFC 3339 format"
            },
            "duration": {
              "type": "string",
              "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
              "description": "duration in ISO 8601 format",
              "default": "PT0S"
            },
            "randomizeStart": {
              "type": "string",
              "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
              "description": "duration in ISO 8601 format",
              "default": "PT0S"
            }
          }
        },
        "programDescriptions": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of programDescriptions",
          "items": {
            "required": [
              "URL"
            ],
            "properties": {
              "URL": {
                "type": "string",
                "format": "uri",
                "minLength": 2,
                "maxLength": 8000,
                "description": "A human or machine readable program description"
              }
            }
          },
          "default": null
        },
        "payloadDescriptors": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of payloadDescriptors.",
          "items": {
            "anyOf": [
              {
                "type": "object",
                "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
                "required": [
                  "objectType",
                  "payloadType"
                ],
                "properties": {
                  "objectType": {
                    "type": "string",
                    "description": "Used as discriminator.",
                    "enum": [
                      "EVENT_PAYLOAD_DESCRIPTOR"
                    ]
                  },
                  "payloadType": {
                    "type": "string",
                    "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "minLength": 1,
                    "maxLength": 128
                  },
                  "units": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Units of measure.",
                    "default": null,
                    "minLength": 1,
                    "maxLength": 128
                  },
                  "currency": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Currency of price payload.",
                    "default": null
                  }
                }
              },
              {
                "type": "object",
                "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
                "required": [
                  "objectType",
                  "payloadType"
                ],
                "properties": {
                  "objectType": {
                    "type": "string",
                    "description": "Used as discriminator.",
                    "enum": [
                      "REPORT_PAYLOAD_DESCRIPTOR"
                    ]
                  },
                  "payloadType": {
                    "type": "string",
                    "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "minLength": 1,
                    "maxLength": 128
                  },
                  "readingType": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "minLength": 1,
                    "maxLength": 128,
                    "default": null
                  },
                  "units": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Units of measure.",
                    "default": null,
                    "minLength": 1,
                    "maxLength": 128
                  },
                  "accuracy": {
                    "type": [
                      "number",
                      "null"
                    ],
                    "format": "float",
                    "description": "A quantification of the accuracy of a set of payload values.",
                    "default": null,
                    "minimum": -3.402823669209385e+38,
                    "maximum": 3.402823669209385e+38
                  },
                  "confidence": {
                    "type": [
                      "integer",
                      "null"
                    ],
                    "format": "int32",
                    "minimum": 0,
                    "maximum": 100,
                    "description": "A quantification of the confidence in a set of payload values.",
                    "default": null
                  }
                }
              }
            ]
          },
          "default": null
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": null
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Client provided description of program
 */
export const programRequestSchema = {
  "type": "object",
  "description": "Client provided description of program",
  "required": [
    "programName"
  ],
  "properties": {
    "programName": {
      "type": "string",
      "description": "Short name to uniquely identify program.",
      "minLength": 1,
      "maxLength": 128
    },
    "intervalPeriod": {
      "type": "object",
      "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
      "properties": {
        "start": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "duration": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        },
        "randomizeStart": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        }
      }
    },
    "programDescriptions": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of programDescriptions",
      "items": {
        "required": [
          "URL"
        ],
        "properties": {
          "URL": {
            "type": "string",
            "format": "uri",
            "minLength": 2,
            "maxLength": 8000,
            "description": "A human or machine readable program description"
          }
        }
      },
      "default": null
    },
    "payloadDescriptors": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of payloadDescriptors.",
      "items": {
        "anyOf": [
          {
            "type": "object",
            "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
            "required": [
              "objectType",
              "payloadType"
            ],
            "properties": {
              "objectType": {
                "type": "string",
                "description": "Used as discriminator.",
                "enum": [
                  "EVENT_PAYLOAD_DESCRIPTOR"
                ]
              },
              "payloadType": {
                "type": "string",
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128
              },
              "units": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Units of measure.",
                "default": null,
                "minLength": 1,
                "maxLength": 128
              },
              "currency": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Currency of price payload.",
                "default": null
              }
            }
          },
          {
            "type": "object",
            "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
            "required": [
              "objectType",
              "payloadType"
            ],
            "properties": {
              "objectType": {
                "type": "string",
                "description": "Used as discriminator.",
                "enum": [
                  "REPORT_PAYLOAD_DESCRIPTOR"
                ]
              },
              "payloadType": {
                "type": "string",
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128
              },
              "readingType": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128,
                "default": null
              },
              "units": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Units of measure.",
                "default": null,
                "minLength": 1,
                "maxLength": 128
              },
              "accuracy": {
                "type": [
                  "number",
                  "null"
                ],
                "format": "float",
                "description": "A quantification of the accuracy of a set of payload values.",
                "default": null,
                "minimum": -3.402823669209385e+38,
                "maximum": 3.402823669209385e+38
              },
              "confidence": {
                "type": [
                  "integer",
                  "null"
                ],
                "format": "int32",
                "minimum": 0,
                "maximum": 100,
                "description": "A quantification of the confidence in a set of payload values.",
                "default": null
              }
            }
          }
        ]
      },
      "default": null
    },
    "attributes": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of valuesMap objects describing attributes.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "default": null
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Server provided representation of report
 */
export const reportSchema = {
  "type": "object",
  "description": "Server provided representation of report",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "report object.",
      "required": [
        "eventID",
        "clientName",
        "resources"
      ],
      "properties": {
        "eventID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "clientName": {
          "type": "string",
          "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
          "minLength": 1,
          "maxLength": 128
        },
        "reportName": {
          "type": [
            "string",
            "null"
          ],
          "description": "User defined string for use in debugging or User Interface.",
          "default": null
        },
        "payloadDescriptors": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of reportPayloadDescriptors.",
          "items": {
            "type": "object",
            "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
            "required": [
              "objectType",
              "payloadType"
            ],
            "properties": {
              "objectType": {
                "type": "string",
                "description": "Used as discriminator.",
                "enum": [
                  "REPORT_PAYLOAD_DESCRIPTOR"
                ]
              },
              "payloadType": {
                "type": "string",
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128
              },
              "readingType": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128,
                "default": null
              },
              "units": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Units of measure.",
                "default": null,
                "minLength": 1,
                "maxLength": 128
              },
              "accuracy": {
                "type": [
                  "number",
                  "null"
                ],
                "format": "float",
                "description": "A quantification of the accuracy of a set of payload values.",
                "default": null,
                "minimum": -3.402823669209385e+38,
                "maximum": 3.402823669209385e+38
              },
              "confidence": {
                "type": [
                  "integer",
                  "null"
                ],
                "format": "int32",
                "minimum": 0,
                "maximum": 100,
                "description": "A quantification of the confidence in a set of payload values.",
                "default": null
              }
            }
          },
          "default": null
        },
        "resources": {
          "type": "array",
          "description": "A list of objects containing report data for a set of resources.",
          "items": {
            "type": "object",
            "description": "Report data associated with a resource.",
            "required": [
              "resourceName",
              "intervals"
            ],
            "properties": {
              "resourceName": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
              },
              "intervalPeriod": {
                "type": "object",
                "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                "properties": {
                  "start": {
                    "type": "string",
                    "format": "date-time",
                    "description": "datetime in RFC 3339 format"
                  },
                  "duration": {
                    "type": "string",
                    "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                    "description": "duration in ISO 8601 format",
                    "default": "PT0S"
                  },
                  "randomizeStart": {
                    "type": "string",
                    "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                    "description": "duration in ISO 8601 format",
                    "default": "PT0S"
                  }
                }
              },
              "intervals": {
                "type": "array",
                "description": "A list of interval objects.",
                "items": {
                  "type": "object",
                  "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
                  "required": [
                    "id",
                    "payloads"
                  ],
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "description": "A client generated number assigned an interval object. Not a sequence number.",
                      "minimum": -2147483648,
                      "maximum": 2147483647
                    },
                    "intervalPeriod": {
                      "type": "object",
                      "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                      "properties": {
                        "start": {
                          "type": "string",
                          "format": "date-time",
                          "description": "datetime in RFC 3339 format"
                        },
                        "duration": {
                          "type": "string",
                          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                          "description": "duration in ISO 8601 format",
                          "default": "PT0S"
                        },
                        "randomizeStart": {
                          "type": "string",
                          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                          "description": "duration in ISO 8601 format",
                          "default": "PT0S"
                        }
                      }
                    },
                    "payloads": {
                      "type": "array",
                      "description": "A list of valuesMap objects.",
                      "items": {
                        "type": "object",
                        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "required": [
                          "type",
                          "values"
                        ],
                        "properties": {
                          "type": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 128,
                            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                          },
                          "values": {
                            "type": "array",
                            "description": "A list of data points. Most often a singular value such as a price.",
                            "items": {
                              "anyOf": [
                                {
                                  "type": "number"
                                },
                                {
                                  "type": "integer"
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "boolean"
                                },
                                {
                                  "type": "object",
                                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                                  "required": [
                                    "x",
                                    "y"
                                  ],
                                  "properties": {
                                    "x": {
                                      "type": "number",
                                      "format": "float",
                                      "description": "A value on an x axis.",
                                      "minimum": -3.402823669209385e+38,
                                      "maximum": 3.402823669209385e+38
                                    },
                                    "y": {
                                      "type": "number",
                                      "format": "float",
                                      "description": "A value on a y axis.",
                                      "minimum": -3.402823669209385e+38,
                                      "maximum": 3.402823669209385e+38
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "clientID"
      ],
      "properties": {
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * report object.
 */
export const reportRequestSchema = {
  "type": "object",
  "description": "report object.",
  "required": [
    "eventID",
    "clientName",
    "resources"
  ],
  "properties": {
    "eventID": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "clientName": {
      "type": "string",
      "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
      "minLength": 1,
      "maxLength": 128
    },
    "reportName": {
      "type": [
        "string",
        "null"
      ],
      "description": "User defined string for use in debugging or User Interface.",
      "default": null
    },
    "payloadDescriptors": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of reportPayloadDescriptors.",
      "items": {
        "type": "object",
        "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
        "required": [
          "objectType",
          "payloadType"
        ],
        "properties": {
          "objectType": {
            "type": "string",
            "description": "Used as discriminator.",
            "enum": [
              "REPORT_PAYLOAD_DESCRIPTOR"
            ]
          },
          "payloadType": {
            "type": "string",
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "minLength": 1,
            "maxLength": 128
          },
          "readingType": {
            "type": [
              "string",
              "null"
            ],
            "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "minLength": 1,
            "maxLength": 128,
            "default": null
          },
          "units": {
            "type": [
              "string",
              "null"
            ],
            "description": "Units of measure.",
            "default": null,
            "minLength": 1,
            "maxLength": 128
          },
          "accuracy": {
            "type": [
              "number",
              "null"
            ],
            "format": "float",
            "description": "A quantification of the accuracy of a set of payload values.",
            "default": null,
            "minimum": -3.402823669209385e+38,
            "maximum": 3.402823669209385e+38
          },
          "confidence": {
            "type": [
              "integer",
              "null"
            ],
            "format": "int32",
            "minimum": 0,
            "maximum": 100,
            "description": "A quantification of the confidence in a set of payload values.",
            "default": null
          }
        }
      },
      "default": null
    },
    "resources": {
      "type": "array",
      "description": "A list of objects containing report data for a set of resources.",
      "items": {
        "type": "object",
        "description": "Report data associated with a resource.",
        "required": [
          "resourceName",
          "intervals"
        ],
        "properties": {
          "resourceName": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
          },
          "intervalPeriod": {
            "type": "object",
            "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
            "properties": {
              "start": {
                "type": "string",
                "format": "date-time",
                "description": "datetime in RFC 3339 format"
              },
              "duration": {
                "type": "string",
                "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                "description": "duration in ISO 8601 format",
                "default": "PT0S"
              },
              "randomizeStart": {
                "type": "string",
                "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                "description": "duration in ISO 8601 format",
                "default": "PT0S"
              }
            }
          },
          "intervals": {
            "type": "array",
            "description": "A list of interval objects.",
            "items": {
              "type": "object",
              "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
              "required": [
                "id",
                "payloads"
              ],
              "properties": {
                "id": {
                  "type": "integer",
                  "format": "int32",
                  "description": "A client generated number assigned an interval object. Not a sequence number.",
                  "minimum": -2147483648,
                  "maximum": 2147483647
                },
                "intervalPeriod": {
                  "type": "object",
                  "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                  "properties": {
                    "start": {
                      "type": "string",
                      "format": "date-time",
                      "description": "datetime in RFC 3339 format"
                    },
                    "duration": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    },
                    "randomizeStart": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    }
                  }
                },
                "payloads": {
                  "type": "array",
                  "description": "A list of valuesMap objects.",
                  "items": {
                    "type": "object",
                    "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "required": [
                      "type",
                      "values"
                    ],
                    "properties": {
                      "type": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 128,
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                      },
                      "values": {
                        "type": "array",
                        "description": "A list of data points. Most often a singular value such as a price.",
                        "items": {
                          "anyOf": [
                            {
                              "type": "number"
                            },
                            {
                              "type": "integer"
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "boolean"
                            },
                            {
                              "type": "object",
                              "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                              "required": [
                                "x",
                                "y"
                              ],
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on an x axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                },
                                "y": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on a y axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Server provided representation of event
 */
export const eventSchema = {
  "type": "object",
  "description": "Server provided representation of event",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n",
      "required": [
        "programID"
      ],
      "properties": {
        "programID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "eventName": {
          "type": [
            "string",
            "null"
          ],
          "description": "User defined string for use in debugging or User Interface.",
          "default": null
        },
        "duration": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        },
        "priority": {
          "type": [
            "integer",
            "null"
          ],
          "minimum": 0,
          "description": "Relative priority of event. A lower number is a higher priority.",
          "default": null
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": null
        },
        "reportDescriptors": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of reportDescriptor objects. Used to request reports from VEN.",
          "items": {
            "type": "object",
            "description": "An object that may be used to request a report from a VEN.\n",
            "required": [
              "payloadType"
            ],
            "properties": {
              "payloadType": {
                "type": "string",
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128
              },
              "readingType": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128,
                "default": null
              },
              "units": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Units of measure.",
                "default": null,
                "minLength": 1,
                "maxLength": 128
              },
              "targets": {
                "type": [
                  "array",
                  "null"
                ],
                "description": "A list of targets.",
                "items": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "User generated target string."
                },
                "default": null
              },
              "aggregate": {
                "type": "boolean",
                "description": "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n",
                "default": false
              },
              "startInterval": {
                "type": "integer",
                "format": "int32",
                "description": "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n",
                "default": -1,
                "minimum": -2147483648,
                "maximum": 2147483647
              },
              "numIntervals": {
                "type": "integer",
                "format": "int32",
                "description": "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n",
                "default": -1,
                "minimum": -2147483648,
                "maximum": 2147483647
              },
              "historical": {
                "type": "boolean",
                "description": "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n",
                "default": true
              },
              "frequency": {
                "type": "integer",
                "format": "int32",
                "description": "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n",
                "default": -1,
                "minimum": -2147483648,
                "maximum": 2147483647
              },
              "repeat": {
                "type": "integer",
                "format": "int32",
                "description": "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n",
                "default": 1,
                "minimum": -2147483648,
                "maximum": 2147483647
              },
              "reportIntervals": {
                "type": "string",
                "description": "Indicates VEN report interval options. See User Guide.",
                "enum": [
                  "INTERVALS",
                  "SUB_INTERVALS",
                  "OPEN_INTERVALS"
                ],
                "default": "INTERVALS"
              }
            }
          },
          "default": null
        },
        "payloadDescriptors": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of payloadDescriptor objects.",
          "items": {
            "type": "object",
            "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
            "required": [
              "objectType",
              "payloadType"
            ],
            "properties": {
              "objectType": {
                "type": "string",
                "description": "Used as discriminator.",
                "enum": [
                  "EVENT_PAYLOAD_DESCRIPTOR"
                ]
              },
              "payloadType": {
                "type": "string",
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                "minLength": 1,
                "maxLength": 128
              },
              "units": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Units of measure.",
                "default": null,
                "minLength": 1,
                "maxLength": 128
              },
              "currency": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Currency of price payload.",
                "default": null
              }
            }
          },
          "default": null
        },
        "intervalPeriod": {
          "type": "object",
          "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
          "properties": {
            "start": {
              "type": "string",
              "format": "date-time",
              "description": "datetime in RFC 3339 format"
            },
            "duration": {
              "type": "string",
              "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
              "description": "duration in ISO 8601 format",
              "default": "PT0S"
            },
            "randomizeStart": {
              "type": "string",
              "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
              "description": "duration in ISO 8601 format",
              "default": "PT0S"
            }
          }
        },
        "intervals": {
          "type": "array",
          "description": "A list of interval objects.",
          "items": {
            "type": "object",
            "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
            "required": [
              "id",
              "payloads"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int32",
                "description": "A client generated number assigned an interval object. Not a sequence number.",
                "minimum": -2147483648,
                "maximum": 2147483647
              },
              "intervalPeriod": {
                "type": "object",
                "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                "properties": {
                  "start": {
                    "type": "string",
                    "format": "date-time",
                    "description": "datetime in RFC 3339 format"
                  },
                  "duration": {
                    "type": "string",
                    "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                    "description": "duration in ISO 8601 format",
                    "default": "PT0S"
                  },
                  "randomizeStart": {
                    "type": "string",
                    "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                    "description": "duration in ISO 8601 format",
                    "default": "PT0S"
                  }
                }
              },
              "payloads": {
                "type": "array",
                "description": "A list of valuesMap objects.",
                "items": {
                  "type": "object",
                  "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                  "required": [
                    "type",
                    "values"
                  ],
                  "properties": {
                    "type": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 128,
                      "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                    },
                    "values": {
                      "type": "array",
                      "description": "A list of data points. Most often a singular value such as a price.",
                      "items": {
                        "anyOf": [
                          {
                            "type": "number"
                          },
                          {
                            "type": "integer"
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "boolean"
                          },
                          {
                            "type": "object",
                            "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                            "required": [
                              "x",
                              "y"
                            ],
                            "properties": {
                              "x": {
                                "type": "number",
                                "format": "float",
                                "description": "A value on an x axis.",
                                "minimum": -3.402823669209385e+38,
                                "maximum": 3.402823669209385e+38
                              },
                              "y": {
                                "type": "number",
                                "format": "float",
                                "description": "A value on a y axis.",
                                "minimum": -3.402823669209385e+38,
                                "maximum": 3.402823669209385e+38
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Event object to communicate a Demand Response request to VEN.
If intervalPeriod is present, sets default start time and duration of intervals.

 */
export const eventRequestSchema = {
  "type": "object",
  "description": "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n",
  "required": [
    "programID"
  ],
  "properties": {
    "programID": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "eventName": {
      "type": [
        "string",
        "null"
      ],
      "description": "User defined string for use in debugging or User Interface.",
      "default": null
    },
    "duration": {
      "type": "string",
      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
      "description": "duration in ISO 8601 format",
      "default": "PT0S"
    },
    "priority": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0,
      "description": "Relative priority of event. A lower number is a higher priority.",
      "default": null
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    },
    "reportDescriptors": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of reportDescriptor objects. Used to request reports from VEN.",
      "items": {
        "type": "object",
        "description": "An object that may be used to request a report from a VEN.\n",
        "required": [
          "payloadType"
        ],
        "properties": {
          "payloadType": {
            "type": "string",
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "minLength": 1,
            "maxLength": 128
          },
          "readingType": {
            "type": [
              "string",
              "null"
            ],
            "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "minLength": 1,
            "maxLength": 128,
            "default": null
          },
          "units": {
            "type": [
              "string",
              "null"
            ],
            "description": "Units of measure.",
            "default": null,
            "minLength": 1,
            "maxLength": 128
          },
          "targets": {
            "type": [
              "array",
              "null"
            ],
            "description": "A list of targets.",
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 128,
              "description": "User generated target string."
            },
            "default": null
          },
          "aggregate": {
            "type": "boolean",
            "description": "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n",
            "default": false
          },
          "startInterval": {
            "type": "integer",
            "format": "int32",
            "description": "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n",
            "default": -1,
            "minimum": -2147483648,
            "maximum": 2147483647
          },
          "numIntervals": {
            "type": "integer",
            "format": "int32",
            "description": "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n",
            "default": -1,
            "minimum": -2147483648,
            "maximum": 2147483647
          },
          "historical": {
            "type": "boolean",
            "description": "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n",
            "default": true
          },
          "frequency": {
            "type": "integer",
            "format": "int32",
            "description": "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n",
            "default": -1,
            "minimum": -2147483648,
            "maximum": 2147483647
          },
          "repeat": {
            "type": "integer",
            "format": "int32",
            "description": "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n",
            "default": 1,
            "minimum": -2147483648,
            "maximum": 2147483647
          },
          "reportIntervals": {
            "type": "string",
            "description": "Indicates VEN report interval options. See User Guide.",
            "enum": [
              "INTERVALS",
              "SUB_INTERVALS",
              "OPEN_INTERVALS"
            ],
            "default": "INTERVALS"
          }
        }
      },
      "default": null
    },
    "payloadDescriptors": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of payloadDescriptor objects.",
      "items": {
        "type": "object",
        "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
        "required": [
          "objectType",
          "payloadType"
        ],
        "properties": {
          "objectType": {
            "type": "string",
            "description": "Used as discriminator.",
            "enum": [
              "EVENT_PAYLOAD_DESCRIPTOR"
            ]
          },
          "payloadType": {
            "type": "string",
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "minLength": 1,
            "maxLength": 128
          },
          "units": {
            "type": [
              "string",
              "null"
            ],
            "description": "Units of measure.",
            "default": null,
            "minLength": 1,
            "maxLength": 128
          },
          "currency": {
            "type": [
              "string",
              "null"
            ],
            "description": "Currency of price payload.",
            "default": null
          }
        }
      },
      "default": null
    },
    "intervalPeriod": {
      "type": "object",
      "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
      "properties": {
        "start": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "duration": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        },
        "randomizeStart": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        }
      }
    },
    "intervals": {
      "type": "array",
      "description": "A list of interval objects.",
      "items": {
        "type": "object",
        "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
        "required": [
          "id",
          "payloads"
        ],
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32",
            "description": "A client generated number assigned an interval object. Not a sequence number.",
            "minimum": -2147483648,
            "maximum": 2147483647
          },
          "intervalPeriod": {
            "type": "object",
            "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
            "properties": {
              "start": {
                "type": "string",
                "format": "date-time",
                "description": "datetime in RFC 3339 format"
              },
              "duration": {
                "type": "string",
                "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                "description": "duration in ISO 8601 format",
                "default": "PT0S"
              },
              "randomizeStart": {
                "type": "string",
                "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                "description": "duration in ISO 8601 format",
                "default": "PT0S"
              }
            }
          },
          "payloads": {
            "type": "array",
            "description": "A list of valuesMap objects.",
            "items": {
              "type": "object",
              "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
              "required": [
                "type",
                "values"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                },
                "values": {
                  "type": "array",
                  "description": "A list of data points. Most often a singular value such as a price.",
                  "items": {
                    "anyOf": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "integer"
                      },
                      {
                        "type": "string"
                      },
                      {
                        "type": "boolean"
                      },
                      {
                        "type": "object",
                        "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                        "required": [
                          "x",
                          "y"
                        ],
                        "properties": {
                          "x": {
                            "type": "number",
                            "format": "float",
                            "description": "A value on an x axis.",
                            "minimum": -3.402823669209385e+38,
                            "maximum": 3.402823669209385e+38
                          },
                          "y": {
                            "type": "number",
                            "format": "float",
                            "description": "A value on a y axis.",
                            "minimum": -3.402823669209385e+38,
                            "maximum": 3.402823669209385e+38
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Server provided representation of subscription
 */
export const subscriptionSchema = {
  "type": "object",
  "description": "Server provided representation of subscription",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n",
      "required": [
        "clientName",
        "objectOperations"
      ],
      "properties": {
        "clientName": {
          "type": "string",
          "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
          "minLength": 1,
          "maxLength": 128
        },
        "programID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "objectOperations": {
          "type": "array",
          "description": "list of objects and operations to subscribe to.",
          "items": {
            "type": "object",
            "description": "object type, operations, and callbackUrl.",
            "required": [
              "objects",
              "operations",
              "callbackUrl"
            ],
            "properties": {
              "objects": {
                "type": "array",
                "description": "list of objects to subscribe to.",
                "items": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              },
              "operations": {
                "type": "array",
                "description": "list of operations to subscribe to.",
                "items": {
                  "type": "string",
                  "description": "object operation to subscribe to.",
                  "enum": [
                    "READ",
                    "CREATE",
                    "UPDATE",
                    "DELETE"
                  ]
                }
              },
              "callbackUrl": {
                "type": "string",
                "format": "uri",
                "minLength": 2,
                "maxLength": 8000,
                "description": "User provided webhook URL."
              },
              "bearerToken": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n",
                "default": null
              }
            }
          }
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of target objects. Used by server to filter notifications.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": null
        }
      }
    },
    {
      "type": "object",
      "required": [
        "clientID"
      ],
      "properties": {
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * An object created by a client to receive notification of operations on objects.
Clients may subscribe to be notified when a type of object is created,
updated, or deleted.

 */
export const subscriptionRequestSchema = {
  "type": "object",
  "description": "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n",
  "required": [
    "clientName",
    "objectOperations"
  ],
  "properties": {
    "clientName": {
      "type": "string",
      "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
      "minLength": 1,
      "maxLength": 128
    },
    "programID": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "objectOperations": {
      "type": "array",
      "description": "list of objects and operations to subscribe to.",
      "items": {
        "type": "object",
        "description": "object type, operations, and callbackUrl.",
        "required": [
          "objects",
          "operations",
          "callbackUrl"
        ],
        "properties": {
          "objects": {
            "type": "array",
            "description": "list of objects to subscribe to.",
            "items": {
              "type": "string",
              "description": "Types of objects addressable through API.",
              "enum": [
                "PROGRAM",
                "EVENT",
                "REPORT",
                "SUBSCRIPTION",
                "VEN",
                "RESOURCE"
              ]
            }
          },
          "operations": {
            "type": "array",
            "description": "list of operations to subscribe to.",
            "items": {
              "type": "string",
              "description": "object operation to subscribe to.",
              "enum": [
                "READ",
                "CREATE",
                "UPDATE",
                "DELETE"
              ]
            }
          },
          "callbackUrl": {
            "type": "string",
            "format": "uri",
            "minLength": 2,
            "maxLength": 8000,
            "description": "User provided webhook URL."
          },
          "bearerToken": {
            "type": [
              "string",
              "null"
            ],
            "description": "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n",
            "default": null
          }
        }
      }
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of target objects. Used by server to filter notifications.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Server provided representation of ven
 */
export const venSchema = {
  "type": "object",
  "description": "Server provided representation of ven",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "Business Logic provided representation of ven.",
      "required": [
        "objectType",
        "clientID",
        "venName"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "BL_VEN_REQUEST"
          ]
        },
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": "null          -"
        },
        "venName": {
          "type": "string",
          "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
          "minLength": 1,
          "maxLength": 128
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * JSON Schema for venRequest
 */
export const venRequestSchema = {
  "oneOf": [
    {
      "type": "object",
      "description": "VEN provided representation of ven.",
      "required": [
        "objectType",
        "venName"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "VEN_VEN_REQUEST"
          ]
        },
        "venName": {
          "type": "string",
          "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
          "minLength": 1,
          "maxLength": 128
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    },
    {
      "type": "object",
      "description": "Business Logic provided representation of ven.",
      "required": [
        "objectType",
        "clientID",
        "venName"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "BL_VEN_REQUEST"
          ]
        },
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": "null          -"
        },
        "venName": {
          "type": "string",
          "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
          "minLength": 1,
          "maxLength": 128
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Business Logic provided representation of ven.
 */
export const BlVenRequestSchema = {
  "type": "object",
  "description": "Business Logic provided representation of ven.",
  "required": [
    "objectType",
    "clientID",
    "venName"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "BL_VEN_REQUEST"
      ]
    },
    "clientID": {
      "type": "string",
      "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
      "minLength": 1,
      "maxLength": 128
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": "null          -"
    },
    "venName": {
      "type": "string",
      "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
      "minLength": 1,
      "maxLength": 128
    },
    "attributes": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of valuesMap objects describing attributes.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * VEN provided representation of ven.
 */
export const VenVenRequestSchema = {
  "type": "object",
  "description": "VEN provided representation of ven.",
  "required": [
    "objectType",
    "venName"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "VEN_VEN_REQUEST"
      ]
    },
    "venName": {
      "type": "string",
      "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
      "minLength": 1,
      "maxLength": 128
    },
    "attributes": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of valuesMap objects describing attributes.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Server provided representation of resource
 */
export const resourceSchema = {
  "type": "object",
  "description": "Server provided representation of resource",
  "allOf": [
    {
      "type": "object",
      "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
      "required": [
        "id",
        "createdDateTime",
        "modificationDateTime",
        "objectType"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "createdDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "modificationDateTime": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "objectType": {
          "type": "string",
          "description": "Types of objects addressable through API.",
          "enum": [
            "PROGRAM",
            "EVENT",
            "REPORT",
            "SUBSCRIPTION",
            "VEN",
            "RESOURCE"
          ]
        }
      }
    },
    {
      "type": "object",
      "description": "Business Logic provided representation of ven resource.\n",
      "required": [
        "objectType",
        "clientID",
        "resourceName",
        "venID"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "BL_RESOURCE_REQUEST"
          ]
        },
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": null
        },
        "resourceName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 128,
          "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
        },
        "venID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * JSON Schema for resourceRequest
 */
export const resourceRequestSchema = {
  "oneOf": [
    {
      "type": "object",
      "description": "Business Logic provided representation of ven resource.\n",
      "required": [
        "objectType",
        "clientID",
        "resourceName",
        "venID"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "BL_RESOURCE_REQUEST"
          ]
        },
        "clientID": {
          "type": "string",
          "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
          "minLength": 1,
          "maxLength": 128
        },
        "targets": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of targets.",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "User generated target string."
          },
          "default": null
        },
        "resourceName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 128,
          "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
        },
        "venID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    },
    {
      "type": "object",
      "description": "Business Logic provided representation of ven resource.\n",
      "required": [
        "objectType",
        "resourceName",
        "venID"
      ],
      "properties": {
        "objectType": {
          "type": "string",
          "description": "Used as discriminator.",
          "enum": [
            "VEN_RESOURCE_REQUEST"
          ]
        },
        "resourceName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 128,
          "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
        },
        "venID": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]*$",
          "minLength": 1,
          "maxLength": 128,
          "description": "URL safe VTN assigned object ID."
        },
        "attributes": {
          "type": [
            "array",
            "null"
          ],
          "description": "A list of valuesMap objects describing attributes.",
          "items": {
            "type": "object",
            "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
            "required": [
              "type",
              "values"
            ],
            "properties": {
              "type": {
                "type": "string",
                "minLength": 1,
                "maxLength": 128,
                "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
              },
              "values": {
                "type": "array",
                "description": "A list of data points. Most often a singular value such as a price.",
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "object",
                      "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                      "required": [
                        "x",
                        "y"
                      ],
                      "properties": {
                        "x": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on an x axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        },
                        "y": {
                          "type": "number",
                          "format": "float",
                          "description": "A value on a y axis.",
                          "minimum": -3.402823669209385e+38,
                          "maximum": 3.402823669209385e+38
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "default": null
        }
      }
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Business Logic provided representation of ven resource.

 */
export const BlResourceRequestSchema = {
  "type": "object",
  "description": "Business Logic provided representation of ven resource.\n",
  "required": [
    "objectType",
    "clientID",
    "resourceName",
    "venID"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "BL_RESOURCE_REQUEST"
      ]
    },
    "clientID": {
      "type": "string",
      "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
      "minLength": 1,
      "maxLength": 128
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    },
    "resourceName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128,
      "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
    },
    "venID": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "attributes": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of valuesMap objects describing attributes.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Business Logic provided representation of ven resource.

 */
export const VenResourceRequestSchema = {
  "type": "object",
  "description": "Business Logic provided representation of ven resource.\n",
  "required": [
    "objectType",
    "resourceName",
    "venID"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "VEN_RESOURCE_REQUEST"
      ]
    },
    "resourceName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128,
      "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
    },
    "venID": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "attributes": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of valuesMap objects describing attributes.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * metadata common to all addressable objects. Values provided by VTN on object creation.
 */
export const objectMetadataSchema = {
  "type": "object",
  "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
  "required": [
    "id",
    "createdDateTime",
    "modificationDateTime",
    "objectType"
  ],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]*$",
      "minLength": 1,
      "maxLength": 128,
      "description": "URL safe VTN assigned object ID."
    },
    "createdDateTime": {
      "type": "string",
      "format": "date-time",
      "description": "datetime in RFC 3339 format"
    },
    "modificationDateTime": {
      "type": "string",
      "format": "date-time",
      "description": "datetime in RFC 3339 format"
    },
    "objectType": {
      "type": "string",
      "description": "Types of objects addressable through API.",
      "enum": [
        "PROGRAM",
        "EVENT",
        "REPORT",
        "SUBSCRIPTION",
        "VEN",
        "RESOURCE"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * An object defining a temporal window and a list of valuesMaps.
if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.

 */
export const intervalSchema = {
  "type": "object",
  "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
  "required": [
    "id",
    "payloads"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32",
      "description": "A client generated number assigned an interval object. Not a sequence number.",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "intervalPeriod": {
      "type": "object",
      "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
      "properties": {
        "start": {
          "type": "string",
          "format": "date-time",
          "description": "datetime in RFC 3339 format"
        },
        "duration": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        },
        "randomizeStart": {
          "type": "string",
          "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
          "description": "duration in ISO 8601 format",
          "default": "PT0S"
        }
      }
    },
    "payloads": {
      "type": "array",
      "description": "A list of valuesMap objects.",
      "items": {
        "type": "object",
        "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
        "required": [
          "type",
          "values"
        ],
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128,
            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
          },
          "values": {
            "type": "array",
            "description": "A list of data points. Most often a singular value such as a price.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "integer"
                },
                {
                  "type": "string"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "object",
                  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                  "required": [
                    "x",
                    "y"
                  ],
                  "properties": {
                    "x": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on an x axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    },
                    "y": {
                      "type": "number",
                      "format": "float",
                      "description": "A value on a y axis.",
                      "minimum": -3.402823669209385e+38,
                      "maximum": 3.402823669209385e+38
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Defines temporal aspects of intervals.
A start of "0001-01-01" or "0001-01-01T00:00:00" may indicate 'now'. See User Guide.
A duration of "P9999Y" may indicate infinity. See User Guide.
A randomizeStart indicates absolute range of client applied offset to start. See User Guide.

 */
export const intervalPeriodSchema = {
  "type": "object",
  "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
  "properties": {
    "start": {
      "type": "string",
      "format": "date-time",
      "description": "datetime in RFC 3339 format"
    },
    "duration": {
      "type": "string",
      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
      "description": "duration in ISO 8601 format",
      "default": "PT0S"
    },
    "randomizeStart": {
      "type": "string",
      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
      "description": "duration in ISO 8601 format",
      "default": "PT0S"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Represents one or more values associated with a type.

See enumerations in Definitions for defined string values, or use privately defined strings

 */
export const valuesMapSchema = {
  "type": "object",
  "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
  "required": [
    "type",
    "values"
  ],
  "properties": {
    "type": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128,
      "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
    },
    "values": {
      "type": "array",
      "description": "A list of data points. Most often a singular value such as a price.",
      "items": {
        "anyOf": [
          {
            "type": "number"
          },
          {
            "type": "integer"
          },
          {
            "type": "string"
          },
          {
            "type": "boolean"
          },
          {
            "type": "object",
            "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
            "required": [
              "x",
              "y"
            ],
            "properties": {
              "x": {
                "type": "number",
                "format": "float",
                "description": "A value on an x axis.",
                "minimum": -3.402823669209385e+38,
                "maximum": 3.402823669209385e+38
              },
              "y": {
                "type": "number",
                "format": "float",
                "description": "A value on a y axis.",
                "minimum": -3.402823669209385e+38,
                "maximum": 3.402823669209385e+38
              }
            }
          }
        ]
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * A pair of floats typically used as a point on a 2 dimensional grid.
 */
export const pointSchema = {
  "type": "object",
  "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
  "required": [
    "x",
    "y"
  ],
  "properties": {
    "x": {
      "type": "number",
      "format": "float",
      "description": "A value on an x axis.",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "y": {
      "type": "number",
      "format": "float",
      "description": "A value on a y axis.",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Contextual information used to interpret event valuesMap values.
E.g. a PRICE payload simply contains a price value, an
associated descriptor provides necessary context such as units and currency.

 */
export const eventPayloadDescriptorSchema = {
  "type": "object",
  "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
  "required": [
    "objectType",
    "payloadType"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "EVENT_PAYLOAD_DESCRIPTOR"
      ]
    },
    "payloadType": {
      "type": "string",
      "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
      "minLength": 1,
      "maxLength": 128
    },
    "units": {
      "type": [
        "string",
        "null"
      ],
      "description": "Units of measure.",
      "default": null,
      "minLength": 1,
      "maxLength": 128
    },
    "currency": {
      "type": [
        "string",
        "null"
      ],
      "description": "Currency of price payload.",
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Contextual information used to interpret report payload values.
E.g. a USAGE payload simply contains a usage value, an
associated descriptor provides necessary context such as units and data quality.

 */
export const reportPayloadDescriptorSchema = {
  "type": "object",
  "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
  "required": [
    "objectType",
    "payloadType"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Used as discriminator.",
      "enum": [
        "REPORT_PAYLOAD_DESCRIPTOR"
      ]
    },
    "payloadType": {
      "type": "string",
      "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
      "minLength": 1,
      "maxLength": 128
    },
    "readingType": {
      "type": [
        "string",
        "null"
      ],
      "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
      "minLength": 1,
      "maxLength": 128,
      "default": null
    },
    "units": {
      "type": [
        "string",
        "null"
      ],
      "description": "Units of measure.",
      "default": null,
      "minLength": 1,
      "maxLength": 128
    },
    "accuracy": {
      "type": [
        "number",
        "null"
      ],
      "format": "float",
      "description": "A quantification of the accuracy of a set of payload values.",
      "default": null,
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "confidence": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32",
      "minimum": 0,
      "maximum": 100,
      "description": "A quantification of the confidence in a set of payload values.",
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * An object that may be used to request a report from a VEN.

 */
export const reportDescriptorSchema = {
  "type": "object",
  "description": "An object that may be used to request a report from a VEN.\n",
  "required": [
    "payloadType"
  ],
  "properties": {
    "payloadType": {
      "type": "string",
      "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
      "minLength": 1,
      "maxLength": 128
    },
    "readingType": {
      "type": [
        "string",
        "null"
      ],
      "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
      "minLength": 1,
      "maxLength": 128,
      "default": null
    },
    "units": {
      "type": [
        "string",
        "null"
      ],
      "description": "Units of measure.",
      "default": null,
      "minLength": 1,
      "maxLength": 128
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    },
    "aggregate": {
      "type": "boolean",
      "description": "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n",
      "default": false
    },
    "startInterval": {
      "type": "integer",
      "format": "int32",
      "description": "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n",
      "default": -1,
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "numIntervals": {
      "type": "integer",
      "format": "int32",
      "description": "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n",
      "default": -1,
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "historical": {
      "type": "boolean",
      "description": "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n",
      "default": true
    },
    "frequency": {
      "type": "integer",
      "format": "int32",
      "description": "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n",
      "default": -1,
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "repeat": {
      "type": "integer",
      "format": "int32",
      "description": "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n",
      "default": 1,
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "reportIntervals": {
      "type": "string",
      "description": "Indicates VEN report interval options. See User Guide.",
      "enum": [
        "INTERVALS",
        "SUB_INTERVALS",
        "OPEN_INTERVALS"
      ],
      "default": "INTERVALS"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * URL safe VTN assigned object ID.
 */
export const objectIDSchema = {
  "type": "string",
  "pattern": "^[a-zA-Z0-9_-]*$",
  "minLength": 1,
  "maxLength": 128,
  "description": "URL safe VTN assigned object ID.",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * ClientID as provisioned by Auhtentication Service and associated with client's bearer token

 */
export const clientIDSchema = {
  "type": "string",
  "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
  "minLength": 1,
  "maxLength": 128,
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
venName is expected to be unique within the scope of a VTN

 */
export const venNameSchema = {
  "type": "string",
  "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
  "minLength": 1,
  "maxLength": 128,
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
 */
export const clientNameSchema = {
  "type": "string",
  "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
  "minLength": 1,
  "maxLength": 128,
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * User generated target string.
 */
export const targetSchema = {
  "type": "string",
  "minLength": 1,
  "maxLength": 128,
  "description": "User generated target string.",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
 */
export const resourceNameSchema = {
  "type": "string",
  "minLength": 1,
  "maxLength": 128,
  "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Units of measure.
 */
export const unitsSchema = {
  "type": [
    "string",
    "null"
  ],
  "description": "Units of measure.",
  "default": null,
  "minLength": 1,
  "maxLength": 128,
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Represents the type of reading.

See enumerations in Definitions for defined string values, or use privately defined strings

 */
export const readingTypeSchema = {
  "type": [
    "string",
    "null"
  ],
  "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
  "minLength": 1,
  "maxLength": 128,
  "default": null,
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * VTN generated object included in request to subscription callbackUrl.

 */
export const notificationSchema = {
  "type": "object",
  "description": "VTN generated object included in request to subscription callbackUrl.\n",
  "required": [
    "objectType",
    "operation",
    "object"
  ],
  "properties": {
    "objectType": {
      "type": "string",
      "description": "Types of objects addressable through API.",
      "enum": [
        "PROGRAM",
        "EVENT",
        "REPORT",
        "SUBSCRIPTION",
        "VEN",
        "RESOURCE"
      ]
    },
    "operation": {
      "type": "string",
      "description": "the operation on on object that triggered the notification.",
      "enum": [
        "CREATE",
        "READ",
        "UPDATE",
        "DELETE"
      ]
    },
    "object": {
      "type": "object",
      "description": "the object that is the subject of the notification.",
      "oneOf": [
        {
          "type": "object",
          "description": "Server provided representation of program",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "Client provided description of program",
              "required": [
                "programName"
              ],
              "properties": {
                "programName": {
                  "type": "string",
                  "description": "Short name to uniquely identify program.",
                  "minLength": 1,
                  "maxLength": 128
                },
                "intervalPeriod": {
                  "type": "object",
                  "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                  "properties": {
                    "start": {
                      "type": "string",
                      "format": "date-time",
                      "description": "datetime in RFC 3339 format"
                    },
                    "duration": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    },
                    "randomizeStart": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    }
                  }
                },
                "programDescriptions": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of programDescriptions",
                  "items": {
                    "required": [
                      "URL"
                    ],
                    "properties": {
                      "URL": {
                        "type": "string",
                        "format": "uri",
                        "minLength": 2,
                        "maxLength": 8000,
                        "description": "A human or machine readable program description"
                      }
                    }
                  },
                  "default": null
                },
                "payloadDescriptors": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of payloadDescriptors.",
                  "items": {
                    "anyOf": [
                      {
                        "type": "object",
                        "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
                        "required": [
                          "objectType",
                          "payloadType"
                        ],
                        "properties": {
                          "objectType": {
                            "type": "string",
                            "description": "Used as discriminator.",
                            "enum": [
                              "EVENT_PAYLOAD_DESCRIPTOR"
                            ]
                          },
                          "payloadType": {
                            "type": "string",
                            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                            "minLength": 1,
                            "maxLength": 128
                          },
                          "units": {
                            "type": [
                              "string",
                              "null"
                            ],
                            "description": "Units of measure.",
                            "default": null,
                            "minLength": 1,
                            "maxLength": 128
                          },
                          "currency": {
                            "type": [
                              "string",
                              "null"
                            ],
                            "description": "Currency of price payload.",
                            "default": null
                          }
                        }
                      },
                      {
                        "type": "object",
                        "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
                        "required": [
                          "objectType",
                          "payloadType"
                        ],
                        "properties": {
                          "objectType": {
                            "type": "string",
                            "description": "Used as discriminator.",
                            "enum": [
                              "REPORT_PAYLOAD_DESCRIPTOR"
                            ]
                          },
                          "payloadType": {
                            "type": "string",
                            "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                            "minLength": 1,
                            "maxLength": 128
                          },
                          "readingType": {
                            "type": [
                              "string",
                              "null"
                            ],
                            "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                            "minLength": 1,
                            "maxLength": 128,
                            "default": null
                          },
                          "units": {
                            "type": [
                              "string",
                              "null"
                            ],
                            "description": "Units of measure.",
                            "default": null,
                            "minLength": 1,
                            "maxLength": 128
                          },
                          "accuracy": {
                            "type": [
                              "number",
                              "null"
                            ],
                            "format": "float",
                            "description": "A quantification of the accuracy of a set of payload values.",
                            "default": null,
                            "minimum": -3.402823669209385e+38,
                            "maximum": 3.402823669209385e+38
                          },
                          "confidence": {
                            "type": [
                              "integer",
                              "null"
                            ],
                            "format": "int32",
                            "minimum": 0,
                            "maximum": 100,
                            "description": "A quantification of the confidence in a set of payload values.",
                            "default": null
                          }
                        }
                      }
                    ]
                  },
                  "default": null
                },
                "attributes": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of valuesMap objects describing attributes.",
                  "items": {
                    "type": "object",
                    "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "required": [
                      "type",
                      "values"
                    ],
                    "properties": {
                      "type": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 128,
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                      },
                      "values": {
                        "type": "array",
                        "description": "A list of data points. Most often a singular value such as a price.",
                        "items": {
                          "anyOf": [
                            {
                              "type": "number"
                            },
                            {
                              "type": "integer"
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "boolean"
                            },
                            {
                              "type": "object",
                              "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                              "required": [
                                "x",
                                "y"
                              ],
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on an x axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                },
                                "y": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on a y axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  "default": null
                },
                "targets": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of targets.",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128,
                    "description": "User generated target string."
                  },
                  "default": null
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "description": "Server provided representation of report",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "report object.",
              "required": [
                "eventID",
                "clientName",
                "resources"
              ],
              "properties": {
                "eventID": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "clientName": {
                  "type": "string",
                  "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
                  "minLength": 1,
                  "maxLength": 128
                },
                "reportName": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "description": "User defined string for use in debugging or User Interface.",
                  "default": null
                },
                "payloadDescriptors": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of reportPayloadDescriptors.",
                  "items": {
                    "type": "object",
                    "description": "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n",
                    "required": [
                      "objectType",
                      "payloadType"
                    ],
                    "properties": {
                      "objectType": {
                        "type": "string",
                        "description": "Used as discriminator.",
                        "enum": [
                          "REPORT_PAYLOAD_DESCRIPTOR"
                        ]
                      },
                      "payloadType": {
                        "type": "string",
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "readingType": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "minLength": 1,
                        "maxLength": 128,
                        "default": null
                      },
                      "units": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Units of measure.",
                        "default": null,
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "accuracy": {
                        "type": [
                          "number",
                          "null"
                        ],
                        "format": "float",
                        "description": "A quantification of the accuracy of a set of payload values.",
                        "default": null,
                        "minimum": -3.402823669209385e+38,
                        "maximum": 3.402823669209385e+38
                      },
                      "confidence": {
                        "type": [
                          "integer",
                          "null"
                        ],
                        "format": "int32",
                        "minimum": 0,
                        "maximum": 100,
                        "description": "A quantification of the confidence in a set of payload values.",
                        "default": null
                      }
                    }
                  },
                  "default": null
                },
                "resources": {
                  "type": "array",
                  "description": "A list of objects containing report data for a set of resources.",
                  "items": {
                    "type": "object",
                    "description": "Report data associated with a resource.",
                    "required": [
                      "resourceName",
                      "intervals"
                    ],
                    "properties": {
                      "resourceName": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 128,
                        "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                      },
                      "intervalPeriod": {
                        "type": "object",
                        "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                        "properties": {
                          "start": {
                            "type": "string",
                            "format": "date-time",
                            "description": "datetime in RFC 3339 format"
                          },
                          "duration": {
                            "type": "string",
                            "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                            "description": "duration in ISO 8601 format",
                            "default": "PT0S"
                          },
                          "randomizeStart": {
                            "type": "string",
                            "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                            "description": "duration in ISO 8601 format",
                            "default": "PT0S"
                          }
                        }
                      },
                      "intervals": {
                        "type": "array",
                        "description": "A list of interval objects.",
                        "items": {
                          "type": "object",
                          "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
                          "required": [
                            "id",
                            "payloads"
                          ],
                          "properties": {
                            "id": {
                              "type": "integer",
                              "format": "int32",
                              "description": "A client generated number assigned an interval object. Not a sequence number.",
                              "minimum": -2147483648,
                              "maximum": 2147483647
                            },
                            "intervalPeriod": {
                              "type": "object",
                              "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                              "properties": {
                                "start": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "datetime in RFC 3339 format"
                                },
                                "duration": {
                                  "type": "string",
                                  "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                                  "description": "duration in ISO 8601 format",
                                  "default": "PT0S"
                                },
                                "randomizeStart": {
                                  "type": "string",
                                  "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                                  "description": "duration in ISO 8601 format",
                                  "default": "PT0S"
                                }
                              }
                            },
                            "payloads": {
                              "type": "array",
                              "description": "A list of valuesMap objects.",
                              "items": {
                                "type": "object",
                                "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                                "required": [
                                  "type",
                                  "values"
                                ],
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 128,
                                    "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                                  },
                                  "values": {
                                    "type": "array",
                                    "description": "A list of data points. Most often a singular value such as a price.",
                                    "items": {
                                      "anyOf": [
                                        {
                                          "type": "number"
                                        },
                                        {
                                          "type": "integer"
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "boolean"
                                        },
                                        {
                                          "type": "object",
                                          "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                                          "required": [
                                            "x",
                                            "y"
                                          ],
                                          "properties": {
                                            "x": {
                                              "type": "number",
                                              "format": "float",
                                              "description": "A value on an x axis.",
                                              "minimum": -3.402823669209385e+38,
                                              "maximum": 3.402823669209385e+38
                                            },
                                            "y": {
                                              "type": "number",
                                              "format": "float",
                                              "description": "A value on a y axis.",
                                              "minimum": -3.402823669209385e+38,
                                              "maximum": 3.402823669209385e+38
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              "type": "object",
              "required": [
                "clientID"
              ],
              "properties": {
                "clientID": {
                  "type": "string",
                  "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
                  "minLength": 1,
                  "maxLength": 128
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "description": "Server provided representation of event",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n",
              "required": [
                "programID"
              ],
              "properties": {
                "programID": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "eventName": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "description": "User defined string for use in debugging or User Interface.",
                  "default": null
                },
                "duration": {
                  "type": "string",
                  "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                  "description": "duration in ISO 8601 format",
                  "default": "PT0S"
                },
                "priority": {
                  "type": [
                    "integer",
                    "null"
                  ],
                  "minimum": 0,
                  "description": "Relative priority of event. A lower number is a higher priority.",
                  "default": null
                },
                "targets": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of targets.",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128,
                    "description": "User generated target string."
                  },
                  "default": null
                },
                "reportDescriptors": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of reportDescriptor objects. Used to request reports from VEN.",
                  "items": {
                    "type": "object",
                    "description": "An object that may be used to request a report from a VEN.\n",
                    "required": [
                      "payloadType"
                    ],
                    "properties": {
                      "payloadType": {
                        "type": "string",
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "readingType": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "minLength": 1,
                        "maxLength": 128,
                        "default": null
                      },
                      "units": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Units of measure.",
                        "default": null,
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "targets": {
                        "type": [
                          "array",
                          "null"
                        ],
                        "description": "A list of targets.",
                        "items": {
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 128,
                          "description": "User generated target string."
                        },
                        "default": null
                      },
                      "aggregate": {
                        "type": "boolean",
                        "description": "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n",
                        "default": false
                      },
                      "startInterval": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n",
                        "default": -1,
                        "minimum": -2147483648,
                        "maximum": 2147483647
                      },
                      "numIntervals": {
                        "type": "integer",
                        "format": "int32",
                        "description": "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n",
                        "default": -1,
                        "minimum": -2147483648,
                        "maximum": 2147483647
                      },
                      "historical": {
                        "type": "boolean",
                        "description": "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n",
                        "default": true
                      },
                      "frequency": {
                        "type": "integer",
                        "format": "int32",
                        "description": "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n",
                        "default": -1,
                        "minimum": -2147483648,
                        "maximum": 2147483647
                      },
                      "repeat": {
                        "type": "integer",
                        "format": "int32",
                        "description": "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n",
                        "default": 1,
                        "minimum": -2147483648,
                        "maximum": 2147483647
                      },
                      "reportIntervals": {
                        "type": "string",
                        "description": "Indicates VEN report interval options. See User Guide.",
                        "enum": [
                          "INTERVALS",
                          "SUB_INTERVALS",
                          "OPEN_INTERVALS"
                        ],
                        "default": "INTERVALS"
                      }
                    }
                  },
                  "default": null
                },
                "payloadDescriptors": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of payloadDescriptor objects.",
                  "items": {
                    "type": "object",
                    "description": "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n",
                    "required": [
                      "objectType",
                      "payloadType"
                    ],
                    "properties": {
                      "objectType": {
                        "type": "string",
                        "description": "Used as discriminator.",
                        "enum": [
                          "EVENT_PAYLOAD_DESCRIPTOR"
                        ]
                      },
                      "payloadType": {
                        "type": "string",
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "units": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Units of measure.",
                        "default": null,
                        "minLength": 1,
                        "maxLength": 128
                      },
                      "currency": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "Currency of price payload.",
                        "default": null
                      }
                    }
                  },
                  "default": null
                },
                "intervalPeriod": {
                  "type": "object",
                  "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                  "properties": {
                    "start": {
                      "type": "string",
                      "format": "date-time",
                      "description": "datetime in RFC 3339 format"
                    },
                    "duration": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    },
                    "randomizeStart": {
                      "type": "string",
                      "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                      "description": "duration in ISO 8601 format",
                      "default": "PT0S"
                    }
                  }
                },
                "intervals": {
                  "type": "array",
                  "description": "A list of interval objects.",
                  "items": {
                    "type": "object",
                    "description": "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n",
                    "required": [
                      "id",
                      "payloads"
                    ],
                    "properties": {
                      "id": {
                        "type": "integer",
                        "format": "int32",
                        "description": "A client generated number assigned an interval object. Not a sequence number.",
                        "minimum": -2147483648,
                        "maximum": 2147483647
                      },
                      "intervalPeriod": {
                        "type": "object",
                        "description": "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n",
                        "properties": {
                          "start": {
                            "type": "string",
                            "format": "date-time",
                            "description": "datetime in RFC 3339 format"
                          },
                          "duration": {
                            "type": "string",
                            "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                            "description": "duration in ISO 8601 format",
                            "default": "PT0S"
                          },
                          "randomizeStart": {
                            "type": "string",
                            "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
                            "description": "duration in ISO 8601 format",
                            "default": "PT0S"
                          }
                        }
                      },
                      "payloads": {
                        "type": "array",
                        "description": "A list of valuesMap objects.",
                        "items": {
                          "type": "object",
                          "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                          "required": [
                            "type",
                            "values"
                          ],
                          "properties": {
                            "type": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 128,
                              "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                            },
                            "values": {
                              "type": "array",
                              "description": "A list of data points. Most often a singular value such as a price.",
                              "items": {
                                "anyOf": [
                                  {
                                    "type": "number"
                                  },
                                  {
                                    "type": "integer"
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "boolean"
                                  },
                                  {
                                    "type": "object",
                                    "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                                    "required": [
                                      "x",
                                      "y"
                                    ],
                                    "properties": {
                                      "x": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "A value on an x axis.",
                                        "minimum": -3.402823669209385e+38,
                                        "maximum": 3.402823669209385e+38
                                      },
                                      "y": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "A value on a y axis.",
                                        "minimum": -3.402823669209385e+38,
                                        "maximum": 3.402823669209385e+38
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "description": "Server provided representation of subscription",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n",
              "required": [
                "clientName",
                "objectOperations"
              ],
              "properties": {
                "clientName": {
                  "type": "string",
                  "description": "User generated identifier, may be VEN identifier provisioned out-of-band.",
                  "minLength": 1,
                  "maxLength": 128
                },
                "programID": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "objectOperations": {
                  "type": "array",
                  "description": "list of objects and operations to subscribe to.",
                  "items": {
                    "type": "object",
                    "description": "object type, operations, and callbackUrl.",
                    "required": [
                      "objects",
                      "operations",
                      "callbackUrl"
                    ],
                    "properties": {
                      "objects": {
                        "type": "array",
                        "description": "list of objects to subscribe to.",
                        "items": {
                          "type": "string",
                          "description": "Types of objects addressable through API.",
                          "enum": [
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          ]
                        }
                      },
                      "operations": {
                        "type": "array",
                        "description": "list of operations to subscribe to.",
                        "items": {
                          "type": "string",
                          "description": "object operation to subscribe to.",
                          "enum": [
                            "READ",
                            "CREATE",
                            "UPDATE",
                            "DELETE"
                          ]
                        }
                      },
                      "callbackUrl": {
                        "type": "string",
                        "format": "uri",
                        "minLength": 2,
                        "maxLength": 8000,
                        "description": "User provided webhook URL."
                      },
                      "bearerToken": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "description": "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n",
                        "default": null
                      }
                    }
                  }
                },
                "targets": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of target objects. Used by server to filter notifications.",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128,
                    "description": "User generated target string."
                  },
                  "default": null
                }
              }
            },
            {
              "type": "object",
              "required": [
                "clientID"
              ],
              "properties": {
                "clientID": {
                  "type": "string",
                  "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
                  "minLength": 1,
                  "maxLength": 128
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "description": "Server provided representation of ven",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "Business Logic provided representation of ven.",
              "required": [
                "objectType",
                "clientID",
                "venName"
              ],
              "properties": {
                "objectType": {
                  "type": "string",
                  "description": "Used as discriminator.",
                  "enum": [
                    "BL_VEN_REQUEST"
                  ]
                },
                "clientID": {
                  "type": "string",
                  "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
                  "minLength": 1,
                  "maxLength": 128
                },
                "targets": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of targets.",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128,
                    "description": "User generated target string."
                  },
                  "default": "null          -"
                },
                "venName": {
                  "type": "string",
                  "description": "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n",
                  "minLength": 1,
                  "maxLength": 128
                },
                "attributes": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of valuesMap objects describing attributes.",
                  "items": {
                    "type": "object",
                    "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "required": [
                      "type",
                      "values"
                    ],
                    "properties": {
                      "type": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 128,
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                      },
                      "values": {
                        "type": "array",
                        "description": "A list of data points. Most often a singular value such as a price.",
                        "items": {
                          "anyOf": [
                            {
                              "type": "number"
                            },
                            {
                              "type": "integer"
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "boolean"
                            },
                            {
                              "type": "object",
                              "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                              "required": [
                                "x",
                                "y"
                              ],
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on an x axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                },
                                "y": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on a y axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  "default": null
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "description": "Server provided representation of resource",
          "allOf": [
            {
              "type": "object",
              "description": "metadata common to all addressable objects. Values provided by VTN on object creation.",
              "required": [
                "id",
                "createdDateTime",
                "modificationDateTime",
                "objectType"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "createdDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "modificationDateTime": {
                  "type": "string",
                  "format": "date-time",
                  "description": "datetime in RFC 3339 format"
                },
                "objectType": {
                  "type": "string",
                  "description": "Types of objects addressable through API.",
                  "enum": [
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  ]
                }
              }
            },
            {
              "type": "object",
              "description": "Business Logic provided representation of ven resource.\n",
              "required": [
                "objectType",
                "clientID",
                "resourceName",
                "venID"
              ],
              "properties": {
                "objectType": {
                  "type": "string",
                  "description": "Used as discriminator.",
                  "enum": [
                    "BL_RESOURCE_REQUEST"
                  ]
                },
                "clientID": {
                  "type": "string",
                  "description": "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n",
                  "minLength": 1,
                  "maxLength": 128
                },
                "targets": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of targets.",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128,
                    "description": "User generated target string."
                  },
                  "default": null
                },
                "resourceName": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                },
                "venID": {
                  "type": "string",
                  "pattern": "^[a-zA-Z0-9_-]*$",
                  "minLength": 1,
                  "maxLength": 128,
                  "description": "URL safe VTN assigned object ID."
                },
                "attributes": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "description": "A list of valuesMap objects describing attributes.",
                  "items": {
                    "type": "object",
                    "description": "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n",
                    "required": [
                      "type",
                      "values"
                    ],
                    "properties": {
                      "type": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 128,
                        "description": "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n"
                      },
                      "values": {
                        "type": "array",
                        "description": "A list of data points. Most often a singular value such as a price.",
                        "items": {
                          "anyOf": [
                            {
                              "type": "number"
                            },
                            {
                              "type": "integer"
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "boolean"
                            },
                            {
                              "type": "object",
                              "description": "A pair of floats typically used as a point on a 2 dimensional grid.",
                              "required": [
                                "x",
                                "y"
                              ],
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on an x axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                },
                                "y": {
                                  "type": "number",
                                  "format": "float",
                                  "description": "A value on a y axis.",
                                  "minimum": -3.402823669209385e+38,
                                  "maximum": 3.402823669209385e+38
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  },
                  "default": null
                }
              }
            }
          ]
        }
      ]
    },
    "targets": {
      "type": [
        "array",
        "null"
      ],
      "description": "A list of targets.",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128,
        "description": "User generated target string."
      },
      "default": null
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Types of objects addressable through API.
 */
export const objectTypesSchema = {
  "type": "string",
  "description": "Types of objects addressable through API.",
  "enum": [
    "PROGRAM",
    "EVENT",
    "REPORT",
    "SUBSCRIPTION",
    "VEN",
    "RESOURCE"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * datetime in RFC 3339 format
 */
export const dateTimeSchema = {
  "type": "string",
  "format": "date-time",
  "description": "datetime in RFC 3339 format",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * duration in ISO 8601 format
 */
export const durationSchema = {
  "type": "string",
  "pattern": "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$",
  "description": "duration in ISO 8601 format",
  "default": "PT0S",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 */
export const clientCredentialRequestSchema = {
  "type": "object",
  "description": "Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n",
  "required": [
    "grant_type",
    "client_id",
    "client_secret"
  ],
  "properties": {
    "grant_type": {
      "type": "string",
      "description": "OAuth2 grant type, must be 'client_credentials'",
      "enum": [
        "client_credentials"
      ]
    },
    "client_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4096,
      "description": "client ID to exchange for bearer token."
    },
    "client_secret": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4096,
      "description": "client secret to exchange for bearer token."
    },
    "scope": {
      "type": "string",
      "minLength": 0,
      "maxLength": 4096,
      "description": "application defined scope."
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 */
export const clientCredentialResponseSchema = {
  "type": "object",
  "description": "Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n",
  "required": [
    "access_token",
    "token_type"
  ],
  "properties": {
    "access_token": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4096,
      "description": "access token provided by Authorization service"
    },
    "token_type": {
      "type": "string",
      "description": "token type, must be Bearer.",
      "enum": [
        "Bearer"
      ]
    },
    "expires_in": {
      "type": "integer",
      "description": "expiration period in seconds."
    },
    "refresh_token": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4096,
      "description": "refresh token provided by Authorization service"
    },
    "scope": {
      "type": "string",
      "minLength": 0,
      "maxLength": 4096,
      "description": "application defined scope."
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749
 */
export const authErrorSchema = {
  "type": "object",
  "description": "error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749",
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "string",
      "description": "As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter. invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case. invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request. invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request. unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps. unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above.",
      "enum": [
        "invalid_request",
        "invalid_client",
        "invalid_grant",
        "invalid_scope",
        "unauthorized_client",
        "unsupported_grant_type"
      ]
    },
    "error_description": {
      "type": "string",
      "description": "Should be a sentence or two at most describing the circumstance of the error"
    },
    "error_uri": {
      "type": "string",
      "format": "uri",
      "minLength": 2,
      "maxLength": 8000,
      "description": "Optional reference to more detailed error description"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * JSON Schema for authServerInfo
 */
export const authServerInfoSchema = {
  "type": "object",
  "required": [
    "tokenURL"
  ],
  "properties": {
    "tokenURL": {
      "type": "string",
      "format": "uri",
      "minLength": 2,
      "maxLength": 8000,
      "description": "URL of the token endpoint."
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Provides details of each notifier binding supported
 */
export const notifiersResponseSchema = {
  "type": "object",
  "description": "Provides details of each notifier binding supported",
  "required": [
    "WEBHOOK"
  ],
  "properties": {
    "WEBHOOK": {
      "type": "boolean",
      "description": "Currently MUST be true"
    },
    "MQTT": {
      "type": "object",
      "description": "Details of MQTT binding for messaging protocol support",
      "required": [
        "URIS",
        "serialization",
        "authentication"
      ],
      "properties": {
        "URIS": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uri",
            "description": "URIs for connection to MQTT broker"
          }
        },
        "serialization": {
          "type": "string",
          "description": "Currently always JSON, perhaps other formats supported in future",
          "enum": [
            "JSON"
          ]
        },
        "authentication": {
          "oneOf": [
            {
              "type": "object",
              "description": "MQTT broker anonymous authentication details",
              "required": [
                "method"
              ],
              "properties": {
                "method": {
                  "type": "string",
                  "enum": [
                    "ANONYMOUS"
                  ],
                  "description": "Specifies anonymous authentication"
                }
              }
            },
            {
              "type": "object",
              "description": "MQTT broker OAuth2 Bearer Token authentication details",
              "required": [
                "method",
                "username"
              ],
              "properties": {
                "method": {
                  "type": "string",
                  "enum": [
                    "OAUTH2_BEARER_TOKEN"
                  ],
                  "description": "Specifies OAuth2 bearer token authentication"
                },
                "username": {
                  "type": "string",
                  "description": "Either the distinguished string \"{clientID}\", or any other literal string"
                }
              }
            },
            {
              "type": "object",
              "description": "MQTT broker mTLS client certificate authentication details",
              "required": [
                "method",
                "caCert",
                "clientCert",
                "clientKey"
              ],
              "properties": {
                "method": {
                  "type": "string",
                  "enum": [
                    "CERTIFICATE"
                  ],
                  "description": "Specifies certificate authentication"
                },
                "caCert": {
                  "type": "string",
                  "description": "String containing the Certificate Authority certificate"
                },
                "clientCert": {
                  "type": "string",
                  "description": "String containing the Client certificate"
                },
                "clientKey": {
                  "type": "string",
                  "description": "String containing the client certificate private key"
                }
              }
            }
          ],
          "description": "Authentication method supported for connection to MQTT broker"
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * Details of MQTT binding for messaging protocol support
 */
export const mqttNotifierBindingObjectSchema = {
  "type": "object",
  "description": "Details of MQTT binding for messaging protocol support",
  "required": [
    "URIS",
    "serialization",
    "authentication"
  ],
  "properties": {
    "URIS": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri",
        "description": "URIs for connection to MQTT broker"
      }
    },
    "serialization": {
      "type": "string",
      "description": "Currently always JSON, perhaps other formats supported in future",
      "enum": [
        "JSON"
      ]
    },
    "authentication": {
      "oneOf": [
        {
          "type": "object",
          "description": "MQTT broker anonymous authentication details",
          "required": [
            "method"
          ],
          "properties": {
            "method": {
              "type": "string",
              "enum": [
                "ANONYMOUS"
              ],
              "description": "Specifies anonymous authentication"
            }
          }
        },
        {
          "type": "object",
          "description": "MQTT broker OAuth2 Bearer Token authentication details",
          "required": [
            "method",
            "username"
          ],
          "properties": {
            "method": {
              "type": "string",
              "enum": [
                "OAUTH2_BEARER_TOKEN"
              ],
              "description": "Specifies OAuth2 bearer token authentication"
            },
            "username": {
              "type": "string",
              "description": "Either the distinguished string \"{clientID}\", or any other literal string"
            }
          }
        },
        {
          "type": "object",
          "description": "MQTT broker mTLS client certificate authentication details",
          "required": [
            "method",
            "caCert",
            "clientCert",
            "clientKey"
          ],
          "properties": {
            "method": {
              "type": "string",
              "enum": [
                "CERTIFICATE"
              ],
              "description": "Specifies certificate authentication"
            },
            "caCert": {
              "type": "string",
              "description": "String containing the Certificate Authority certificate"
            },
            "clientCert": {
              "type": "string",
              "description": "String containing the Client certificate"
            },
            "clientKey": {
              "type": "string",
              "description": "String containing the client certificate private key"
            }
          }
        }
      ],
      "description": "Authentication method supported for connection to MQTT broker"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * MQTT broker anonymous authentication details
 */
export const mqttNotifierAuthenticationAnonymousSchema = {
  "type": "object",
  "description": "MQTT broker anonymous authentication details",
  "required": [
    "method"
  ],
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "ANONYMOUS"
      ],
      "description": "Specifies anonymous authentication"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * MQTT broker OAuth2 Bearer Token authentication details
 */
export const mqttNotifierAuthenticationOauth2BearerTokenSchema = {
  "type": "object",
  "description": "MQTT broker OAuth2 Bearer Token authentication details",
  "required": [
    "method",
    "username"
  ],
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "OAUTH2_BEARER_TOKEN"
      ],
      "description": "Specifies OAuth2 bearer token authentication"
    },
    "username": {
      "type": "string",
      "description": "Either the distinguished string \"{clientID}\", or any other literal string"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * MQTT broker mTLS client certificate authentication details
 */
export const mqttNotifierAuthenticationCertificateSchema = {
  "type": "object",
  "description": "MQTT broker mTLS client certificate authentication details",
  "required": [
    "method",
    "caCert",
    "clientCert",
    "clientKey"
  ],
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "CERTIFICATE"
      ],
      "description": "Specifies certificate authentication"
    },
    "caCert": {
      "type": "string",
      "description": "String containing the Certificate Authority certificate"
    },
    "clientCert": {
      "type": "string",
      "description": "String containing the Client certificate"
    },
    "clientKey": {
      "type": "string",
      "description": "String containing the client certificate private key"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * MQTT notifier topic names for notifications of subscribable-object operations
 */
export const notifierOperationsTopicsSchema = {
  "type": "object",
  "description": "MQTT notifier topic names for notifications of subscribable-object operations",
  "required": [
    "UPDATE",
    "DELETE"
  ],
  "properties": {
    "CREATE": {
      "type": "string",
      "description": "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n"
    },
    "UPDATE": {
      "type": "string",
      "description": "Topic path for UPDATE operations"
    },
    "DELETE": {
      "type": "string",
      "description": "Topic path for DELETE operations"
    },
    "ALL": {
      "type": "string",
      "description": "Topic path for ALL operations, if supported by VTN"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

/**
 * JSON Schema for notifierTopicsResponse
 */
export const notifierTopicsResponseSchema = {
  "type": "object",
  "required": [
    "topics"
  ],
  "properties": {
    "topics": {
      "type": "object",
      "description": "MQTT notifier topic names for notifications of subscribable-object operations",
      "required": [
        "UPDATE",
        "DELETE"
      ],
      "properties": {
        "CREATE": {
          "type": "string",
          "description": "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n"
        },
        "UPDATE": {
          "type": "string",
          "description": "Topic path for UPDATE operations"
        },
        "DELETE": {
          "type": "string",
          "description": "Topic path for DELETE operations"
        },
        "ALL": {
          "type": "string",
          "description": "Topic path for ALL operations, if supported by VTN"
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;

// Validation functions
/**
 * Server provided representation of program
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateprogram(data: unknown): ValidationResult<Program> {
  const validate = ajv.compile(programSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Program) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Client provided description of program
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateprogramRequest(data: unknown): ValidationResult<ProgramRequest> {
  const validate = ajv.compile(programRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ProgramRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Server provided representation of report
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatereport(data: unknown): ValidationResult<Report> {
  const validate = ajv.compile(reportSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Report) : undefined,
    errors: validate.errors || []
  };
}

/**
 * report object.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatereportRequest(data: unknown): ValidationResult<ReportRequest> {
  const validate = ajv.compile(reportRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ReportRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Server provided representation of event
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateevent(data: unknown): ValidationResult<Event> {
  const validate = ajv.compile(eventSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Event) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Event object to communicate a Demand Response request to VEN.
If intervalPeriod is present, sets default start time and duration of intervals.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateeventRequest(data: unknown): ValidationResult<EventRequest> {
  const validate = ajv.compile(eventRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as EventRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Server provided representation of subscription
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatesubscription(data: unknown): ValidationResult<Subscription> {
  const validate = ajv.compile(subscriptionSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Subscription) : undefined,
    errors: validate.errors || []
  };
}

/**
 * An object created by a client to receive notification of operations on objects.
Clients may subscribe to be notified when a type of object is created,
updated, or deleted.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatesubscriptionRequest(data: unknown): ValidationResult<SubscriptionRequest> {
  const validate = ajv.compile(subscriptionRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as SubscriptionRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Server provided representation of ven
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateven(data: unknown): ValidationResult<Ven> {
  const validate = ajv.compile(venSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Ven) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Validate venRequest data
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatevenRequest(data: unknown): ValidationResult<VenRequest> {
  const validate = ajv.compile(venRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as VenRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Business Logic provided representation of ven.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateBlVenRequest(data: unknown): ValidationResult<BlVenRequest> {
  const validate = ajv.compile(BlVenRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as BlVenRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * VEN provided representation of ven.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateVenVenRequest(data: unknown): ValidationResult<VenVenRequest> {
  const validate = ajv.compile(VenVenRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as VenVenRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Server provided representation of resource
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateresource(data: unknown): ValidationResult<Resource> {
  const validate = ajv.compile(resourceSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Resource) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Validate resourceRequest data
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateresourceRequest(data: unknown): ValidationResult<ResourceRequest> {
  const validate = ajv.compile(resourceRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ResourceRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Business Logic provided representation of ven resource.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateBlResourceRequest(data: unknown): ValidationResult<BlResourceRequest> {
  const validate = ajv.compile(BlResourceRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as BlResourceRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Business Logic provided representation of ven resource.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateVenResourceRequest(data: unknown): ValidationResult<VenResourceRequest> {
  const validate = ajv.compile(VenResourceRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as VenResourceRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * metadata common to all addressable objects. Values provided by VTN on object creation.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateobjectMetadata(data: unknown): ValidationResult<ObjectMetadata> {
  const validate = ajv.compile(objectMetadataSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ObjectMetadata) : undefined,
    errors: validate.errors || []
  };
}

/**
 * An object defining a temporal window and a list of valuesMaps.
if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateinterval(data: unknown): ValidationResult<Interval> {
  const validate = ajv.compile(intervalSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Interval) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Defines temporal aspects of intervals.
A start of "0001-01-01" or "0001-01-01T00:00:00" may indicate 'now'. See User Guide.
A duration of "P9999Y" may indicate infinity. See User Guide.
A randomizeStart indicates absolute range of client applied offset to start. See User Guide.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateintervalPeriod(data: unknown): ValidationResult<IntervalPeriod> {
  const validate = ajv.compile(intervalPeriodSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as IntervalPeriod) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Represents one or more values associated with a type.

See enumerations in Definitions for defined string values, or use privately defined strings

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatevaluesMap(data: unknown): ValidationResult<ValuesMap> {
  const validate = ajv.compile(valuesMapSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ValuesMap) : undefined,
    errors: validate.errors || []
  };
}

/**
 * A pair of floats typically used as a point on a 2 dimensional grid.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatepoint(data: unknown): ValidationResult<Point> {
  const validate = ajv.compile(pointSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Point) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Contextual information used to interpret event valuesMap values.
E.g. a PRICE payload simply contains a price value, an
associated descriptor provides necessary context such as units and currency.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateeventPayloadDescriptor(data: unknown): ValidationResult<EventPayloadDescriptor> {
  const validate = ajv.compile(eventPayloadDescriptorSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as EventPayloadDescriptor) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Contextual information used to interpret report payload values.
E.g. a USAGE payload simply contains a usage value, an
associated descriptor provides necessary context such as units and data quality.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatereportPayloadDescriptor(data: unknown): ValidationResult<ReportPayloadDescriptor> {
  const validate = ajv.compile(reportPayloadDescriptorSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ReportPayloadDescriptor) : undefined,
    errors: validate.errors || []
  };
}

/**
 * An object that may be used to request a report from a VEN.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatereportDescriptor(data: unknown): ValidationResult<ReportDescriptor> {
  const validate = ajv.compile(reportDescriptorSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ReportDescriptor) : undefined,
    errors: validate.errors || []
  };
}

/**
 * URL safe VTN assigned object ID.
 * 
 * Validation constraints preserved:
 * - @pattern ^[a-zA-Z0-9_-]*$
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateobjectID(data: unknown): ValidationResult<ObjectID> {
  const validate = ajv.compile(objectIDSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ObjectID) : undefined,
    errors: validate.errors || []
  };
}

/**
 * ClientID as provisioned by Auhtentication Service and associated with client's bearer token

 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateclientID(data: unknown): ValidationResult<ClientID> {
  const validate = ajv.compile(clientIDSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ClientID) : undefined,
    errors: validate.errors || []
  };
}

/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
venName is expected to be unique within the scope of a VTN

 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatevenName(data: unknown): ValidationResult<VenName> {
  const validate = ajv.compile(venNameSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as VenName) : undefined,
    errors: validate.errors || []
  };
}

/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateclientName(data: unknown): ValidationResult<ClientName> {
  const validate = ajv.compile(clientNameSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ClientName) : undefined,
    errors: validate.errors || []
  };
}

/**
 * User generated target string.
 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatetarget(data: unknown): ValidationResult<Target> {
  const validate = ajv.compile(targetSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Target) : undefined,
    errors: validate.errors || []
  };
}

/**
 * User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateresourceName(data: unknown): ValidationResult<ResourceName> {
  const validate = ajv.compile(resourceNameSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ResourceName) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Units of measure.
 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateunits(data: unknown): ValidationResult<Units> {
  const validate = ajv.compile(unitsSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Units) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Represents the type of reading.

See enumerations in Definitions for defined string values, or use privately defined strings

 * 
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatereadingType(data: unknown): ValidationResult<ReadingType> {
  const validate = ajv.compile(readingTypeSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ReadingType) : undefined,
    errors: validate.errors || []
  };
}

/**
 * VTN generated object included in request to subscription callbackUrl.

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatenotification(data: unknown): ValidationResult<Notification> {
  const validate = ajv.compile(notificationSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Notification) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Types of objects addressable through API.
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateobjectTypes(data: unknown): ValidationResult<ObjectTypes> {
  const validate = ajv.compile(objectTypesSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ObjectTypes) : undefined,
    errors: validate.errors || []
  };
}

/**
 * datetime in RFC 3339 format
 * 
 * Validation constraints preserved:
 * - @format date-time
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatedateTime(data: unknown): ValidationResult<DateTime> {
  const validate = ajv.compile(dateTimeSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as DateTime) : undefined,
    errors: validate.errors || []
  };
}

/**
 * duration in ISO 8601 format
 * 
 * Validation constraints preserved:
 * - @pattern ^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateduration(data: unknown): ValidationResult<Duration> {
  const validate = ajv.compile(durationSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as Duration) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateclientCredentialRequest(data: unknown): ValidationResult<ClientCredentialRequest> {
  const validate = ajv.compile(clientCredentialRequestSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ClientCredentialRequest) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateclientCredentialResponse(data: unknown): ValidationResult<ClientCredentialResponse> {
  const validate = ajv.compile(clientCredentialResponseSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ClientCredentialResponse) : undefined,
    errors: validate.errors || []
  };
}

/**
 * error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateauthError(data: unknown): ValidationResult<AuthError> {
  const validate = ajv.compile(authErrorSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as AuthError) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Validate authServerInfo data
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validateauthServerInfo(data: unknown): ValidationResult<AuthServerInfo> {
  const validate = ajv.compile(authServerInfoSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as AuthServerInfo) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Provides details of each notifier binding supported
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatenotifiersResponse(data: unknown): ValidationResult<NotifiersResponse> {
  const validate = ajv.compile(notifiersResponseSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as NotifiersResponse) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Details of MQTT binding for messaging protocol support
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatemqttNotifierBindingObject(data: unknown): ValidationResult<MqttNotifierBindingObject> {
  const validate = ajv.compile(mqttNotifierBindingObjectSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as MqttNotifierBindingObject) : undefined,
    errors: validate.errors || []
  };
}

/**
 * MQTT broker anonymous authentication details
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatemqttNotifierAuthenticationAnonymous(data: unknown): ValidationResult<MqttNotifierAuthenticationAnonymous> {
  const validate = ajv.compile(mqttNotifierAuthenticationAnonymousSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as MqttNotifierAuthenticationAnonymous) : undefined,
    errors: validate.errors || []
  };
}

/**
 * MQTT broker OAuth2 Bearer Token authentication details
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatemqttNotifierAuthenticationOauth2BearerToken(data: unknown): ValidationResult<MqttNotifierAuthenticationOauth2BearerToken> {
  const validate = ajv.compile(mqttNotifierAuthenticationOauth2BearerTokenSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as MqttNotifierAuthenticationOauth2BearerToken) : undefined,
    errors: validate.errors || []
  };
}

/**
 * MQTT broker mTLS client certificate authentication details
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatemqttNotifierAuthenticationCertificate(data: unknown): ValidationResult<MqttNotifierAuthenticationCertificate> {
  const validate = ajv.compile(mqttNotifierAuthenticationCertificateSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as MqttNotifierAuthenticationCertificate) : undefined,
    errors: validate.errors || []
  };
}

/**
 * MQTT notifier topic names for notifications of subscribable-object operations
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatenotifierOperationsTopics(data: unknown): ValidationResult<NotifierOperationsTopics> {
  const validate = ajv.compile(notifierOperationsTopicsSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as NotifierOperationsTopics) : undefined,
    errors: validate.errors || []
  };
}

/**
 * Validate notifierTopicsResponse data
 * 
 * Validation constraints preserved:

 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function validatenotifierTopicsResponse(data: unknown): ValidationResult<NotifierTopicsResponse> {
  const validate = ajv.compile(notifierTopicsResponseSchema);
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as NotifierTopicsResponse) : undefined,
    errors: validate.errors || []
  };
}

// Export convenience function to validate any schema by name
export function validateBySchemaName(schemaName: string, data: unknown): ValidationResult<unknown> {
  const validatorMap: Record<string, (data: unknown) => ValidationResult<unknown>> = {
    Program: validateprogram,
    ProgramRequest: validateprogramRequest,
    Report: validatereport,
    ReportRequest: validatereportRequest,
    Event: validateevent,
    EventRequest: validateeventRequest,
    Subscription: validatesubscription,
    SubscriptionRequest: validatesubscriptionRequest,
    Ven: validateven,
    VenRequest: validatevenRequest,
    BlVenRequest: validateBlVenRequest,
    VenVenRequest: validateVenVenRequest,
    Resource: validateresource,
    ResourceRequest: validateresourceRequest,
    BlResourceRequest: validateBlResourceRequest,
    VenResourceRequest: validateVenResourceRequest,
    ObjectMetadata: validateobjectMetadata,
    Interval: validateinterval,
    IntervalPeriod: validateintervalPeriod,
    ValuesMap: validatevaluesMap,
    Point: validatepoint,
    EventPayloadDescriptor: validateeventPayloadDescriptor,
    ReportPayloadDescriptor: validatereportPayloadDescriptor,
    ReportDescriptor: validatereportDescriptor,
    ObjectID: validateobjectID,
    ClientID: validateclientID,
    VenName: validatevenName,
    ClientName: validateclientName,
    Target: validatetarget,
    ResourceName: validateresourceName,
    Units: validateunits,
    ReadingType: validatereadingType,
    Notification: validatenotification,
    ObjectTypes: validateobjectTypes,
    DateTime: validatedateTime,
    Duration: validateduration,
    ClientCredentialRequest: validateclientCredentialRequest,
    ClientCredentialResponse: validateclientCredentialResponse,
    AuthError: validateauthError,
    AuthServerInfo: validateauthServerInfo,
    NotifiersResponse: validatenotifiersResponse,
    MqttNotifierBindingObject: validatemqttNotifierBindingObject,
    MqttNotifierAuthenticationAnonymous: validatemqttNotifierAuthenticationAnonymous,
    MqttNotifierAuthenticationOauth2BearerToken: validatemqttNotifierAuthenticationOauth2BearerToken,
    MqttNotifierAuthenticationCertificate: validatemqttNotifierAuthenticationCertificate,
    NotifierOperationsTopics: validatenotifierOperationsTopics,
    NotifierTopicsResponse: validatenotifierTopicsResponse,
  };
  
  const validator = validatorMap[schemaName];
  if (!validator) {
    return {
      success: false,
      errors: [{ 
        instancePath: '', 
        schemaPath: '', 
        keyword: 'unknown', 
        params: {}, 
        message: `Unknown schema: ${schemaName}`
      } as ErrorObject]
    };
  }
  
  return validator(data);
}