# openadr-3-ts-types - Data type declarations and data validation functions for OpenADR v3

The intent for this repository is to serve the OpenADR v3 community with packages data types and data validation for several programming languages.

Pre-built data types, and pre-built data validation functions, should make it easier for folks to write OpenADR v3 applications.  

It is intended, for each programming language of interest, to:

* Auto-generate data types and data validation functions from the concrete OpenADR specifications (OpenAPI and JSON Schema)
* Publish the data types and validation functions as packages in the corresponding package distribution system for each platform

The directories contain:

* Node.js
    * [`builder`](./node/builder/README.md) -- is a collection of build scripts exploring different code auto-generation tools for the Node.js/TypeScript ecosystem
    * [`package`](./node/package/README.md) -- is the package which is published to the npm repository.
    * ['test`](./node/test/README.md) -- Tests
* [`example`](./example) -- contains example code demonstrating how this package is used.


