/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `VerificationRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "email" TEXT,
ALTER COLUMN "walletAddress" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_email_key" ON "VerificationRequest"("email");
