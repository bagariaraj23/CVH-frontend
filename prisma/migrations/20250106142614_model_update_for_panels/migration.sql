-- Drop existing foreign keys to avoid dependency issues during table drops
ALTER TABLE "Doctor" DROP CONSTRAINT IF EXISTS "Doctor_id_fkey";
ALTER TABLE "Hospital" DROP CONSTRAINT IF EXISTS "Hospital_id_fkey";
ALTER TABLE "Patient" DROP CONSTRAINT IF EXISTS "Patient_id_fkey";
ALTER TABLE "VerificationRequest" DROP CONSTRAINT IF EXISTS "VerificationRequest_userId_fkey";

-- Drop all existing tables
DROP TABLE IF EXISTS "Doctor" CASCADE;
DROP TABLE IF EXISTS "Hospital" CASCADE;
DROP TABLE IF EXISTS "Patient" CASCADE;
DROP TABLE IF EXISTS "VerificationRequest" CASCADE;
DROP TABLE IF EXISTS "Admin" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Appointment" CASCADE;

-- Drop existing enums
DROP TYPE IF EXISTS "Role";
DROP TYPE IF EXISTS "Status";

-- Create enums
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR', 'HOSPITAL', 'PATIENT');
CREATE TYPE "Status" AS ENUM ('pending', 'verified', 'not_verified');

-- Create Admin table
CREATE TABLE "Admin" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "walletAddress" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create User table
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "walletAddress" TEXT NOT NULL UNIQUE,
    "role" "Role" DEFAULT 'PATIENT' NOT NULL,
    "status" "Status" DEFAULT 'pending' NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Doctor table
CREATE TABLE "Doctor" (
    "id" UUID PRIMARY KEY,
    "walletAddress" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "details" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "Doctor_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create Hospital table
CREATE TABLE "Hospital" (
    "id" UUID PRIMARY KEY,
    "walletAddress" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "details" TEXT,
    "verified" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "Hospital_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create Patient table
CREATE TABLE "Patient" (
    "id" UUID PRIMARY KEY,
    "walletAddress" TEXT UNIQUE,
    "name" TEXT NOT NULL,
    "premiumUser" BOOLEAN DEFAULT FALSE,
    "details" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "Patient_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create VerificationRequest table
CREATE TABLE "VerificationRequest" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL UNIQUE,
    "walletAddress" TEXT NOT NULL UNIQUE,
    "role" "Role" DEFAULT 'PATIENT' NOT NULL,
    "details" TEXT,
    "status" "Status" DEFAULT 'pending' NOT NULL,
    "licenseNumber" TEXT,
    "specialization" TEXT,
    "address" TEXT,
    "registrationId" TEXT,
    "name" TEXT,
    "premiumUser" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "verifiedBy" TEXT,
    CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create Appointment table
CREATE TABLE "Appointment" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "patientId" UUID UNIQUE NOT NULL,
    "doctorId" UUID NOT NULL,
    "timeSlot" TIMESTAMP NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "User_status_idx" ON "User"("status");
