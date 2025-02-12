
// This is using a part of https://github.com/Mermade/oas-kit
// That's a toolkit for OpenAPI 2 - 3 conversion, plus
// spec validation and more
//
// But - this example fails badly.

import validator from 'oas-validator';

if (!(typeof argv?.input === 'string')) {
    throw new Error(`no --input`);
}

import { promises as fsp } from 'node:fs';

const txt = await fsp.readFile(argv?.input, 'utf-8');

const openapi = YAML.parse(txt);

const options = {};
validator.validate(openapi, options)
.then(function(options){
  // options.valid contains the result of the validation, true in this branch
  console.log(options);
})
.catch(function(err){
  console.warn(err.message);
  if (options.context) console.warn('Location',options.context.pop());
});

