import { z } from "nestjs-zod/z";

import { EmojiHeroZod } from "../zod";

export const EmojiHeroSchema = z.object(EmojiHeroZod);
