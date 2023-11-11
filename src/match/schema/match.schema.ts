import { z } from "nestjs-zod/z";

import { MatchZod } from "../zod";

export const MatchSchema = z.object(MatchZod);
