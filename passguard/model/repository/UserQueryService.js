import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserManagementService {
  //Add Methods Here for Reading
  //Use this example signature --> async getUsers() {}
  // Find a user by USER_ID
  async findUserById(userId) {
    return prisma.user.findUnique({
      where: { USER_ID: userId },
    });
  }
  // Find a user by USER_DATA
  async findUserByUserData(userData) {
    return prisma.user.findUnique({
      where: { USER_DATA: userData },
    });
  }

  // Find a security question by SECURITYQUESTION_ID
  async findSecurityQuestionById(questionId) {
    return prisma.securityQuestion.findUnique({
      where: { SECURITYQUESTION_ID: questionId },
    });
  }

  // Find a security question by user's USER_ID
  async findSecurityQuestionByUserId(userId) {
    return prisma.securityQuestion.findFirst({
      where: { USER_ID: userId },
    });
  }

  // List all users
  async listUsers() {
    return prisma.user.findMany();
  }

  // List all security questions for a user
  async listSecurityQuestionsByUserId(userId) {
    return prisma.user
      .findUnique({
        where: { USER_ID: userId },
      })
      .securityQuestion();
  }

  //get user credentials by user id
  async getCredentialsByUserId(userId) {
    return await prisma.CREDENTIAL.findMany({
      where: {
        USER_ID: userId,
      },
    });
  }

  //get a credential by credential id
  async getCredentialById(credentialId) {
    return await prisma.CREDENTIAL.findUnique({
      where: {
        CREDENTIAL_ID: credentialId,
      },
    });
  }

  //get credentials by service
  async getCredentialsByService(service) {
    return await prisma.CREDENTIAL.findMany({
      where: {
        CREDENTIAL_SERVICE: service,
      },
    });
  }

  //get credential by title
  async getCredentialsByTitle(title) {
    return await prisma.CREDENTIAL.findMany({
      where: {
        CREDENTIAL_TITLE: title,
      },
    });
  }

  //get credential by URL
  async getCredentialsByUrl(url) {
    return await prisma.CREDENTIAL.findMany({
      where: {
        CREDENTIAL_URL: url,
      },
    });
  }

  //get trash by trash id
  async getTrashById(trashId) {
    return await prisma.TRASH.findUnique({
      where: {
        TRASH_ID: trashId,
      },
    });
  }

  //get credentials that are temporarily deleted from the database
  async getTrash() {
    return await prisma.TRASH.findMany();
  }

  //get credentials by date deleted from trash database
  async getTrashByDate(date) {
    return await prisma.TRASH.findMany({
      where: {
        TRASH_DATETEMPDELETED: date,
      },
    });
  }

  //get credentials that are temporarily deleted after a specific date
  async getTrashAfterDate(date) {
    return await prisma.TRASH.findMany({
      where: {
        TRASH_DATETEMPDELETED: {
          gt: date,
        },
      },
    });
  }

  //get credentials that are temporarily deleted before a specific date
  async getTrashBeforeDate(date) {
    return await prisma.TRASH.findMany({
      where: {
        TRASH_DATETEMPDELETED: {
          lt: date,
        },
      },
    });
  }
}
