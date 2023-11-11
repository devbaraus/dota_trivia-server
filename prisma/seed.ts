import { GameStatus, GameType, HeroAttackType, HeroAttr, HeroRole, PrismaClient, Role } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

async function createGame() {
  const game = {
    name: "Emoji Hero",
    description: "Guess the hero by the emoji",
    type: GameType.EMOJI_HERO,
    status: GameStatus.ACTIVE,
    createdById: 1,
  };

  await prisma.game.upsert({
    where: { type: game.type },
    update: {},
    create: game,
  });
}

async function createUsers() {
  const users = [
    {
      username: process.env.APP_ADMIN_USERNAME,
      email: process.env.APP_ADMIN_EMAIL,
      passwordHash: process.env.APP_ADMIN_PASSWORD,
      roles: [Role.ADMIN],
    },
    {
      username: process.env.APP_PLAYER_USERNAME,
      email: process.env.APP_PLAYER_EMAIL,
      passwordHash: process.env.APP_PLAYER_PASSWORD,
      roles: [Role.PLAYER],
    },
    {
      username: process.env.APP_GUEST_USERNAME,
      email: process.env.APP_GUEST_EMAIL,
      passwordHash: process.env.APP_GUEST_PASSWORD,
      roles: [Role.GUEST],
    },
  ];

  for (const user of users) {
    user.passwordHash = await argon.hash(user.passwordHash, {
      secret: Buffer.from(process.env.APP_SECRET),
    });

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

async function fetchHeroes() {
  let heroes = await fetch("https://api.opendota.com/api/heroStats").then(res => res.json());

  heroes = heroes.map(item => {
    const primaryAttr = item.primary_attr == "all" ? HeroAttr.UNI : HeroAttr[item.primary_attr.toUpperCase()];
    const avatar = `https://api.opendota.com${item.img}`;

    return {
      name: item.localized_name,
      dotaId: item.id,
      dotaName: item.name,
      primaryAttr,
      avatar,
      attackType: HeroAttackType[item.attack_type.toUpperCase()],
      roles: {
        set: item.roles.map(role => HeroRole[role.toUpperCase()]),
      },
    };
  });

  return heroes;
}

export async function main() {
  await createUsers();
  await createGame();

  for (const hero of await fetchHeroes()) {
    await prisma.hero.upsert({
      where: { dotaId: hero.dotaId },
      update: {},
      create: hero,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
