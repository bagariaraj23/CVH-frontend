/*
  Warnings:

  - You are about to drop the column `documents` on the `VerificationRequest` table. All the data in the column will be lost.
  - Added the required column `details` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationRequest" DROP COLUMN "documents",
ADD COLUMN     "details" TEXT NOT NULL;
