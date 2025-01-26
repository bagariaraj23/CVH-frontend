/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_address` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointment_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time_slot` on the `Appointment` table. All the data in the column will be lost.
  - The primary key for the `Doctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `license_number` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_address` on the `Doctor` table. All the data in the column will be lost.
  - The primary key for the `Hospital` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `hospital_id` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `registration_id` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_address` on the `Hospital` table. All the data in the column will be lost.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `premium_user` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_address` on the `Patient` table. All the data in the column will be lost.
  - The primary key for the `VerificationRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `VerificationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `request_id` on the `VerificationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_address` on the `VerificationRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletAddress]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletAddress]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletAddress]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Admin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `walletAddress` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Appointment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `patientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlot` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Doctor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `licenseNumber` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Hospital` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `registrationId` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Patient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `VerificationRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patient_id_fkey";

-- DropIndex
DROP INDEX "Admin_wallet_address_key";

-- DropIndex
DROP INDEX "Doctor_license_number_key";

-- DropIndex
DROP INDEX "Doctor_wallet_address_key";

-- DropIndex
DROP INDEX "Hospital_registration_id_key";

-- DropIndex
DROP INDEX "Hospital_wallet_address_key";

-- DropIndex
DROP INDEX "Patient_wallet_address_key";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "admin_id",
DROP COLUMN "created_at",
DROP COLUMN "wallet_address",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "appointment_id",
DROP COLUMN "doctor_id",
DROP COLUMN "patient_id",
DROP COLUMN "time_slot",
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "timeSlot" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_pkey",
DROP COLUMN "created_at",
DROP COLUMN "doctor_id",
DROP COLUMN "license_number",
DROP COLUMN "wallet_address",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_pkey",
DROP COLUMN "created_at",
DROP COLUMN "hospital_id",
DROP COLUMN "registration_id",
DROP COLUMN "wallet_address",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "registrationId" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "created_at",
DROP COLUMN "patient_id",
DROP COLUMN "premium_user",
DROP COLUMN "wallet_address",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "premiumUser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "walletAddress" TEXT,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VerificationRequest" DROP CONSTRAINT "VerificationRequest_pkey",
DROP COLUMN "created_at",
DROP COLUMN "request_id",
DROP COLUMN "wallet_address",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verifiedBy" TEXT,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_walletAddress_key" ON "Admin"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_patientId_key" ON "Appointment"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_walletAddress_key" ON "Doctor"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_walletAddress_key" ON "Hospital"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_walletAddress_key" ON "Patient"("walletAddress");
