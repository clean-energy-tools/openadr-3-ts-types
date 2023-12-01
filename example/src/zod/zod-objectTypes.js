import { z } from "zod";

export default z
  .enum(["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"])
  .describe("Types of objects addressable through API.");
