

//   https://github.com/fabien0102/openapi-codegen
//   https://www.npmjs.com/package/@openapi-codegen/cli

try {
    await $`npx openapi-codegen gen OADR -c openadr-codegen.config.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`cp ./codegen-build/oadrSchemas.ts ../package/src/codegen/openADRSchemas.ts`;


