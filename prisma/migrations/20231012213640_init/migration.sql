-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST', 'PLAYER');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('EMOJI_HERO', 'QUOTE_HERO');

-- CreateEnum
CREATE TYPE "MatchDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('STARTED', 'FINISHED_WIN', 'FINISHED_LOSE');

-- CreateEnum
CREATE TYPE "HeroAttr" AS ENUM ('STR', 'AGI', 'INT', 'UNI');

-- CreateEnum
CREATE TYPE "HeroAttackType" AS ENUM ('MELEE', 'RANGED');

-- CreateEnum
CREATE TYPE "HeroRole" AS ENUM ('CARRY', 'DISABLER', 'DURABLE', 'ESCAPE', 'INITIATOR', 'JUNGLER', 'NUKER', 'PUSHER', 'SUPPORT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "birthDate" DATE,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roles" "Role"[] DEFAULT ARRAY['GUEST']::"Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "dotaId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dotaName" TEXT NOT NULL,
    "primaryAttr" "HeroAttr" NOT NULL,
    "attackType" "HeroAttackType" NOT NULL,
    "roles" "HeroRole"[],
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "GameType" NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiHeroGame" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "emojis" TEXT[],
    "difficulty" "MatchDifficulty" NOT NULL DEFAULT 'EASY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER,

    CONSTRAINT "EmojiHeroGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteHeroGame" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "quote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER,

    CONSTRAINT "QuoteHeroGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "emojiHeroGameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'STARTED',
    "score" INTEGER NOT NULL DEFAULT 0,
    "attemptMax" INTEGER DEFAULT 3,
    "attemptTimeMax" INTEGER DEFAULT 60,
    "attemptPerTime" INTEGER DEFAULT 10,
    "attemptPerScore" INTEGER DEFAULT 10,
    "attemptPerScoreDecrement" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "quoteHeroGameId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTry" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "heroId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchTry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_dotaId_key" ON "Hero"("dotaId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_type_key" ON "Game"("type");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiHeroGame" ADD CONSTRAINT "EmojiHeroGame_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiHeroGame" ADD CONSTRAINT "EmojiHeroGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiHeroGame" ADD CONSTRAINT "EmojiHeroGame_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiHeroGame" ADD CONSTRAINT "EmojiHeroGame_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteHeroGame" ADD CONSTRAINT "QuoteHeroGame_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteHeroGame" ADD CONSTRAINT "QuoteHeroGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteHeroGame" ADD CONSTRAINT "QuoteHeroGame_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteHeroGame" ADD CONSTRAINT "QuoteHeroGame_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_emojiHeroGameId_fkey" FOREIGN KEY ("emojiHeroGameId") REFERENCES "EmojiHeroGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_quoteHeroGameId_fkey" FOREIGN KEY ("quoteHeroGameId") REFERENCES "QuoteHeroGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTry" ADD CONSTRAINT "MatchTry_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTry" ADD CONSTRAINT "MatchTry_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
