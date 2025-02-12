
# Generating JSON Schema with `openapi2jsonschema`

This is a Python tool specifically for generating JSON Schema

```shell
$ pip install openapi2jsonschema
$ openapi2jsonschema -o json ../oadr3.0.1.yaml
```

It is installed using `pip`.  Afterwards it is run as shown.  The `-o` option specifies an output directory.

The result is one JSON file per object, each containing the JSON schema.  The schema files do not have a `$id` field so it's not clear how this can be used in a tool.

See `build-openapi2jsonschema.js`
