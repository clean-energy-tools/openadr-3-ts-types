
For each object do these tests:

* Read and parse an example object
* Check with .passthrough() whether it accepts objects with extra fields
* Check with .strict() whether it rejects objects with extra fields
* Check that a missing field that has a default is assigned the correct default
* Check that bad data fields are rejected
* Check fields with size limits - too short - too long
* Check fields with numerical range limits - too small - too large


