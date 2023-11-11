import { z } from "nestjs-zod/z";

import { PlayEmojiHeroZod } from "../zod/play-emoji-hero.zod";

export const PlayEmojiHeroSchema = z.object(PlayEmojiHeroZod);
