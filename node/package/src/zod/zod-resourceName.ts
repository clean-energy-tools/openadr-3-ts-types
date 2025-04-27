import { z } from "zod";

export default z.string().min(1).max(128).describe("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data");
