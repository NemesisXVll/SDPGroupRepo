-- CreateTable
CREATE TABLE "user" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userData" TEXT NOT NULL,
    "userSalt" TEXT NOT NULL,
    "userDataCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userDataUpdated" DATETIME NOT NULL,
    "userPicture" BLOB
);

-- CreateTable
CREATE TABLE "credential" (
    "credentialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credentialServiceName" TEXT NOT NULL,
    "credentialTitle" TEXT NOT NULL,
    "credentialData" TEXT NOT NULL,
    "credentialUrl" TEXT,
    "credentialIsWeak" BOOLEAN NOT NULL,
    "credentialDateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialDateUpdated" DATETIME NOT NULL,
    "credentialServiceType" TEXT NOT NULL DEFAULT 'Personal',
    "credentialPicture" BLOB,
    "credentialIsFavourite" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "securityQuestion" (
    "securityQuestionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "securityQuestionData" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "securityQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trash" (
    "trashId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trashDateTempDeleted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" INTEGER NOT NULL,
    CONSTRAINT "trash_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credential" ("credentialId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userData_key" ON "user"("userData");

-- CreateIndex
CREATE UNIQUE INDEX "credential_credentialData_key" ON "credential"("credentialData");

-- CreateIndex
CREATE UNIQUE INDEX "credential_userId_key" ON "credential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "securityQuestion_userId_key" ON "securityQuestion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "trash_credentialId_key" ON "trash"("credentialId");
