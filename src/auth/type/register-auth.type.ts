import { z } from "zod";

import { RegisterAuthSchema } from "../schema";

export type RegisterAuthType = z.infer<typeof RegisterAuthSchema>;
