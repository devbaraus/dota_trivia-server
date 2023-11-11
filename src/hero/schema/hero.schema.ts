import { z } from "nestjs-zod/z";

import { HeroZod } from "../zod";

export const HeroSchema = z.object(HeroZod);
