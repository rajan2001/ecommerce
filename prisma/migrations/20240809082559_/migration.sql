/*
  Warnings:

  - You are about to drop the column `billboardId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_billboardId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "billboardId";
