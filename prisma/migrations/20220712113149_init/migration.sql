/*
  Warnings:

  - You are about to drop the column `orderId` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `categoryId` on table `Position` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_orderId_fkey";

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "orderId",
ALTER COLUMN "categoryId" SET NOT NULL;

-- DropTable
DROP TABLE "Order";
