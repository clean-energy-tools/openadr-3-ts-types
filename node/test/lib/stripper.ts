
// Source: https://github.com/hapijs/joi/issues/2735
// This file is for exploring the
// stripUnknown and allowUnknown options.
// The second should throw errors on
// unknown data.
// The first should strip them.

// In this example, both work correctly.

import Joi from 'joi';

const schema = Joi.object({
    foo: Joi.string(),
    items: Joi.array().items(Joi.object({
        bar: Joi.string(),
    })),
})
// .prefs({
//     allowUnknown: false,
//     stripUnknown: true,
// })

const options = {
    // abortEarly: false,
    // allowUnknown: false,
   stripUnknown: true,
}

const input = {
    foo:  'five', // 5, // invalid value
    unknownValue: 'strip',
    items: [
        {
            bar: 'bar five', // 5, // invalid value
            // stripValue: 'strip'
        },
    ],
}

const { error, value } = schema.validate(input, options)
console.log(error);
console.log(value);

// { foo: 5, items: [{ bar: 5, stripValue: 'strip' }]

