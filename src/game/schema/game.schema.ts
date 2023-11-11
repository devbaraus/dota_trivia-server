import { z } from "nestjs-zod/z";

import { GameZod } from "../zod";

export const GameSchema = z.object(GameZod);
