

//   https://github.com/fabien0102/openapi-codegen
//   https://www.npmjs.com/package/@openapi-codegen/cli

try {
    await $`npx openapi-codegen gen oadr3 -c openapi-codegen.config.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

// When we're happy with the generated files, copy them into the package sources.

await $`cp ./openapi-codegen-2025-02-12/oadr3Schemas.ts ./openapi-codegen-2025-02-12/oadr3Components.ts ../package/src/codegen/`;

console.log('Make sure to edit oadr3Components.ts to remove Fetcher functions');


