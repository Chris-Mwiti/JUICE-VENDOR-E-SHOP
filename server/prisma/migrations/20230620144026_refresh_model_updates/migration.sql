/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RefreshTokens_refreshToken_key` ON `RefreshTokens`(`refreshToken`);
