import { Test, TestingModule } from "@nestjs/testing";

import { EmojiGameController } from "./emoji-game.controller";
import { EmojiGameService } from "./emoji-game.service";

describe("EmojiGameController", () => {
  let controller: EmojiGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmojiGameController],
      providers: [EmojiGameService],
    }).compile();

    controller = module.get<EmojiGameController>(EmojiGameController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
