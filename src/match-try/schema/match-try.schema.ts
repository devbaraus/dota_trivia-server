import { z } from "nestjs-zod/z";

import { MatchTryZod } from "../zod";

export const MatchTrySchema = z.object(MatchTryZod);
