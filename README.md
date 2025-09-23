# openadr-3-types - Data type declarations and data validation functions for OpenADR v3

This repository serves the OpenADR v3 community with data type declarations and data validation functions for several programming languages.

The goals are:

* Provide a code package for every major programming platform
* Each code package includes:
    * Data type definitions matching the schema objects defined in the `components/schemas` section of the OpenADR 3 specification
    * Data type definitions matching the request parameters for each endpoint under `paths` in the specification
    * Data type definitions matching the return type of all endpoints
    * Data validation functions that take a generic object, validate that it is of a certain type, and return a typed object instance
* API documentation for publishing on a GitHub Pages website
* Support developing OpenADR 3 applications

As much as possible the content of this repository is the result of auto-generated code deriving all information from the OpenADR v3 specification.  Therefore, for each programming language of interest, the repository includes tools to auto-generate data types and data validation functions.  The resulting code is to be organized in a structure for publishing to the package management system for each programming platform.

The result should be data type packages in the package distribution system for each major programming platform.

The current status is:

Directory                      | Language | Discussion
-------------------------------|----------|-------------------
[`golang`](./golang/README.md) | Go       | Untested
[`java`](./java/README.md)     | Java SE  | Untested
[`node`](./node/README.md)     | Node.js  | Untested
[`python](./python/README.md)  | Python   | Untested
[`rust`](./rust/README.md)     | Rust     | Untested
[`zig`](./zig/README.md)       | Zig      | Untested

Each directory contains a `builder` directory containing scripts to run code generation tools to produce the code for each platform.

As it stands, each directory contains what looks like a complete code package, but none of this code has been used in application code.

The code and tooling in these directories were all generated in a couple days of intense interaction with ClaudeAI.  There may be hallucinations.  I (David Herron) had previously tried to implement this vision by hand, and after a couple months of part-time work had given up on implementing just Node.js.


