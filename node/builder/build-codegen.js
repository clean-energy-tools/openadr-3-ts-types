

//   https://github.com/fabien0102/openapi-codegen
//   https://www.npmjs.com/package/@openapi-codegen/cli

try {
    await $`npx openapi-codegen gen oadr3 -c openapi-codegen.config.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

// When we're happy with the generated files, copy them into the package sources.

// await $`cp ./codegen-build/oadrSchemas.ts ../package/src/codegen/openADRSchemas.ts`;


