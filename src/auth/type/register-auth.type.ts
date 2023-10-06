import { z } from "zod";

import { RegisterAuthSchema } from "@/auth/schema/register-auth.schema";

export type RegisterAuthType = z.infer<typeof RegisterAuthSchema>;
