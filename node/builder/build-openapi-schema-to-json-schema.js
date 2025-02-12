
if (!(typeof argv?.input === 'string')) {
    throw new Error(`no --input`);
}
if (!(typeof argv?.output === 'string')) {
    throw new Error(`no --output`);
}

await $`npx "@openapi-contrib/openapi-schema-to-json-schema" \
    --input ${argv.input} \
    --output ${argv.output}`;


