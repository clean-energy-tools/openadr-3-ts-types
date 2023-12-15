import { Program, parseProgram } from "../../package/dist/index.js";

const program: Program = parseProgram.parse({
    programName: 'Program-99',
});

console.log(program);
