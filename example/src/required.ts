
import { z } from 'zod';

type E = {
    programID: string;
    eName?: string;
};

// Establish that programID is required
// const badE: E = {};
// Property 'programID' is missing in type '{}' but required in type 'E'.
const goodE: E = { programID: '99' }
// No error

const parseE = z.object({
    programID: z
                .string()
                .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                .min(1)
                .max(128)
                .describe("URL safe VTN assigned object ID."),
    eName: z.string().default('ZILCH').optional()
}).required({ programID: true }); // { programID: true });

// Generate Zod's view of the type described by the schema
type tE = z.infer<typeof parseE>;

// This is the type shown when hovering the mouse over `tE`
// Notice that programID is shown as optional.
// No addition of .required() in the parseE definition changes this
//
// type tE = {
//     programID?: string;
//     eName?: string;
// }

// tE should require programID, therefore this should give
// the same error as above
const badE2: tE = { programID: '00' };
// No error

const e: E = parseE.parse({
    // Commenting this out results in a parse error
    // saying that programID is required 
    programID: 'Program-ID-99'
});

console.log(e);
