
//    https://www.npmjs.com/package/typeconv

try {
    await $`cp ../oadr3.0.1.yaml .`;
    await $`npx typeconv -f oapi -t jsc -o typeconv oadr3.0.1.yaml`;
    await $`npx typeconv -f oapi -t ts -o typeconv oadr3.0.1.yaml`;
    await $`rm oadr3.0.1.yaml`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`mkdir -p ../package/src/typeconv`;
await $`cp typeconv/oadr3.0.1.json ../package/src/typeconv/oadr3.0.1.json`;

