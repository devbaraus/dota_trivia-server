import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { EmojiHeroGame, Game, Match, MatchTry, Role, User } from "@prisma/client";

import { Action } from "./enum";

type Subjects = InferSubjects<User | Match | MatchTry | EmojiHeroGame | Game> | "all";

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);

    if (user.roles.includes(Role.ADMIN)) {
      can(Action.MANAGE, "all"); // read-write access to everything
    } else {
      can(Action.READ, "all"); // read-only access to everything
    }

    // can(Action.UPDATE, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
