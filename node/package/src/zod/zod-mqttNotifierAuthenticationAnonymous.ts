import { z } from "zod";

export default z.object({ "method": z.literal("ANONYMOUS").describe("Specifies anonymous authentication") }).describe("MQTT broker anonymous authentication details");
