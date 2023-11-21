import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}

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
        (question) => question.data === securityAnswer
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
        (question) => question.data === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }
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
}
