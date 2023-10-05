import { Test, TestingModule } from "@nestjs/testing";

import { EmojiGameService } from "./emoji-game.service";

describe("EmojiGameService", () => {
  let service: EmojiGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmojiGameService],
    }).compile();

    service = module.get<EmojiGameService>(EmojiGameService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
