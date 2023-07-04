/*
  Warnings:

  - A unique constraint covering the columns `[productId,sessionId]` on the table `CartItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CartItems_productId_sessionId_key` ON `CartItems`(`productId`, `sessionId`);
