import { AppAbility } from "./casl-ability.factory";

export * from "./casl.module";
export * from "./casl-ability.factory";
export * from "./enum";
export * from "./guard";
export * from "./decorator";

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
