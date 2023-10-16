-- CreateTable
CREATE TABLE "USER" (
    "USER_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "USER_MASTERPASSWORD" TEXT NOT NULL,
    "USER_FNAME" TEXT NOT NULL,
    "USER_LNAME" TEXT NOT NULL,
    "USER_EMAIL" TEXT NOT NULL,
    "USER_SALT" TEXT NOT NULL,
    "USER_CREATEDDATE" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "USER_LASTUPDATEDDATE" DATETIME,
    "USER_PICTURE" BLOB
);

-- CreateTable
CREATE TABLE "CREDENTIAL" (
    "CREDENTIAL_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CREDENTIAL_SOFTWARENAME" TEXT NOT NULL,
    "CREDENTIAL_TITLE" TEXT NOT NULL,
    "CREDENTIAL_USERNAME" TEXT,
    "CREDENTIAL_EMAIL" TEXT,
    "CREDENTIAL_PASSWORD" TEXT NOT NULL,
    "CREDENTIAL_KEY" TEXT NOT NULL,
    "CREDENTIAL_URL" TEXT,
    "CREDENTIAL_NOTES" TEXT,
    "CREDENTIAL_STRENGTHMETER" INTEGER NOT NULL,
    "CREDENTIAL_DATECREATED" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CREDENTIAL_DATEUPDATED" DATETIME NOT NULL,
    "CREDENTIAL_MEDIATYPE" TEXT NOT NULL DEFAULT 'General',
    "CRDENTIAL_PICTURE" BLOB,
    "CREDENTIAL_ISFAVOURITE" BOOLEAN NOT NULL DEFAULT false,
    "USER_ID" INTEGER NOT NULL,
    CONSTRAINT "CREDENTIAL_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "USER" ("USER_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SECURITYQUESTION" (
    "SECURITYQUESTION_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SECURITYQUESTION_QUESTION" TEXT NOT NULL,
    "SECURITYQUESTION_ANSWERSALT" TEXT NOT NULL,
    "SECURITYQUESTION_ANSWERHASH" TEXT NOT NULL,
    "USER_ID" INTEGER NOT NULL,
    CONSTRAINT "SECURITYQUESTION_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "USER" ("USER_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TRASH" (
    "TRASH_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TRASH_ISRECOVERED" BOOLEAN NOT NULL DEFAULT false,
    "CREDENTIAL_ID" INTEGER NOT NULL,
    CONSTRAINT "TRASH_CREDENTIAL_ID_fkey" FOREIGN KEY ("CREDENTIAL_ID") REFERENCES "CREDENTIAL" ("CREDENTIAL_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_USER_EMAIL_key" ON "USER"("USER_EMAIL");

-- CreateIndex
CREATE UNIQUE INDEX "CREDENTIAL_CREDENTIAL_KEY_key" ON "CREDENTIAL"("CREDENTIAL_KEY");