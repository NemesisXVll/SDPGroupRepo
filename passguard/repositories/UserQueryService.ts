import prisma from "../client";

export default class UserQueryService {
  //Add Methods Here for Reading
  //Use this example signature --> async getUsers() {}

  //-------------------------User Model--------------------------------------//
  // Find a user by Id
  async findUserById(userId: any) {
    return prisma.user.findUnique({
      where: { userId: userId },
    });
  }
  // Find a user by Data
  async findUserByUserData(userData: any) {
    return prisma.user.findUnique({
      where: { data: JSON.stringify(userData) },
    });
  }

  // Find a user by Email
  async findUserByEmail(email: any) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  // List all users
  async listUsers() {
    return prisma.user.findMany();
  }

  //-------------------------Security Question Model-------------------------//

  // Find a security question by SECURITYQUESTION_ID
  async findSecurityQuestionById(questionId: any) {
    return prisma.securityQuestion.findUnique({
      where: { securityQuestionId: questionId },
    });
  }

  //List All Security Questions for a user id
  async listSecurityQuestionsByUserId(userId: any) {
    return prisma.securityQuestion.findMany({
      where: { userId: userId },
    });
  }

  //-------------------------Credential Model-------------------------//
  //get user credentials by user id
  async getCredentialsByUserId(userId: any) {
    return await prisma.credential.findMany({
      where: {
        userId: userId,
      },
    });
  }

  //get a credential by credential id
  async getCredentialById(credentialId: any) {
    return await prisma.credential.findUnique({
      where: {
        credentialId: credentialId,
      },
    });
  }

  //get credentials by service name
  async getCredentialsByServiceName(serviceName: any) {
    return await prisma.credential.findMany({
      where: {
        serviceName: serviceName,
      },
    });
  }

  //get credentials by service type
  async getCredentialsByServiceType(serviceType: any) {
    return await prisma.credential.findMany({
      where: {
        serviceType: serviceType,
      },
    });
  }

  //get credential by title
  async getCredentialsByTitle(title: any) {
    return await prisma.credential.findMany({
      where: {
        title: title,
      },
    });
  }

  //get credential by URL
  async getCredentialsByUrl(url: any) {
    return await prisma.credential.findMany({
      where: {
        url: url,
      },
    });
  }

  //get credentials with weak passwords
  async getCredentialsWithWeakPasswords() {
    return await prisma.credential.findMany({
      where: {
        isWeak: true,
      },
    });
  }

  //get credentials with reused passwords
  async getCredentialsWithReusedPasswords() {
    return await prisma.credential.findMany({
      where: {
        isReused: true,
      },
    });
  }

  //get credentials with old passwords
  async getCredentialsWithOldPasswords() {
    return await prisma.credential.findMany({
      where: {
        isOld: true,
      },
    });
  }

  //-------------------------Trash Model-------------------------//
  //get trash by trash id
  async getTrashById(trashId: any) {
    return await prisma.trash.findUnique({
      where: {
        trashId: trashId,
      },
    });
  }

  //get credentials that are temporarily deleted from the database
  async getTrash() {
    return await prisma.trash.findMany();
  }

  //get credentials by date deleted from trash database
  async getTrashByDate(date: any) {
    return await prisma.trash.findMany({
      where: {
        dateTempDeleted: date,
      },
    });
  }

  //get credentials that are temporarily deleted after a specific date
  async getTrashAfterDate(date: any) {
    return await prisma.trash.findMany({
      where: {
        dateTempDeleted: {
          gt: date,
        },
      },
    });
  }

  //get credentials that are temporarily deleted before a specific date
  async getTrashBeforeDate(date: any) {
    return await prisma.trash.findMany({
      where: {
        dateTempDeleted: {
          lt: date,
        },
      },
    });
  }
}
