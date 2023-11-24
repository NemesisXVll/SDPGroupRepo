import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}

  //-------------------------User Model-------------------------//
  async signUp(userData: any, userSalt: any) {
    try {
      // Check if a user with the provided USER_DATA already exists
      const existingUser = await prisma.user.findUnique({
        where: { data: userData },
      });

      if (existingUser) {
        throw new Error("User with this USER_DATA already exists");
      }

      // Create the new user with the provided USER_DATA, USER_SALT, and a default USER_PICTURE
      const user = await prisma.user.create({
        data: {
          data: userData,
          salt: userSalt,
          picture: null, // Replace with the actual picture data if available
        },
      });

      return user.userId;
    } catch (error) {
      throw error;
    }
  }

  async checkSecurityAnswer(userData: any, securityAnswer: any) {
    try {
      // Find the user by USER_DATA and include the SECURITYQUESTION
      const user = await prisma.user.findUnique({
        where: { data: userData },
        include: {
          securityquestions: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.securityquestions.find(
        (question: { data: any }) => question.data === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }

  async login(userData: any, securityAnswer: any) {
    try {
      // Find the user by USER_DATA and include the SECURITYQUESTION
      const user = await prisma.user.findUnique({
        where: { data: userData },
        include: {
          securityquestions: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.securityquestions.find(
        (question: { data: any }) => question.data === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: any) {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userId: any) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { userId: userId },
      });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(userId: any, user: any) {
    try {
      const updatedUser = await prisma.user.update({
        where: { userId: userId },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------Credential Model-------------------------//
  async createCredential(credential: any) {
    try {
      const newCredential = await prisma.credential.create({
        data: credential,
      });
      return newCredential;
    } catch (error) {
      throw error;
    }
  }

  async deleteCredentialById(credentialId: any) {
    try {
      const deletedCredential = await prisma.credential.delete({
        where: { credentialId: credentialId },
      });
      return deletedCredential;
    } catch (error) {
      throw error;
    }
  }

  async updateCredentialById(credentialId: any, credential: any) {
    try {
      const updatedCredential = await prisma.credential.update({
        where: { credentialId: credentialId },
        data: credential,
      });
      return updatedCredential;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------Security Question Model-------------------------//
  async createSecurityQuestion(securityQuestion: any) {
    try {
      const newSecurityQuestion = await prisma.securityQuestion.create({
        data: securityQuestion,
      });
      return newSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  async deleteSecurityQuestionById(securityQuestionId: any) {
    try {
      const deletedSecurityQuestion = await prisma.securityQuestion.delete({
        where: { securityQuestionId: securityQuestionId },
      });
      return deletedSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  async updateSecurityQuestionById(
    securityQuestionId: any,
    securityQuestion: any
  ) {
    try {
      const updatedSecurityQuestion = await prisma.securityQuestion.update({
        where: { securityQuestionId: securityQuestionId },
        data: securityQuestion,
      });
      return updatedSecurityQuestion;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------Trash Model-------------------------//
  async createTrash(trash: any) {
    try {
      const newTrash = await prisma.trash.create({
        data: trash,
      });
      return newTrash;
    } catch (error) {
      throw error;
    }
  }

  async deleteTrashById(trashId: any) {
    try {
      const deletedTrash = await prisma.trash.delete({
        where: { trashId: trashId },
      });
      return deletedTrash;
    } catch (error) {
      throw error;
    }
  }

  async updateTrashById(trashId: any, trash: any) {
    try {
      const updatedTrash = await prisma.trash.update({
        where: { trashId: trashId },
        data: trash,
      });
      return updatedTrash;
    } catch (error) {
      throw error;
    }
  }
}
