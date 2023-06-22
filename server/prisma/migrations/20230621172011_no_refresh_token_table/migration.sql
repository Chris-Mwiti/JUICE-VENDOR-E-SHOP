/*
  Warnings:

  - You are about to drop the `refreshtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtokens` DROP FOREIGN KEY `RefreshTokens_userId_fkey`;

-- DropTable
DROP TABLE `refreshtokens`;
