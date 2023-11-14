import { PrismaClient } from "@prisma/client";
import Credential from "../Credential.ts";

const prisma = new PrismaClient();

export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}
  async signUp(userData: any, userSalt: any) {
    try {
      // Check if a user with the provided USER_DATA already exists
      const existingUser = await prisma.user.findUnique({
        where: { USER_DATA: userData },
      });

      if (existingUser) {
        throw new Error("User with this USER_DATA already exists");
      }

      // Create the new user with the provided USER_DATA, USER_SALT, and a default USER_PICTURE
      const user = await prisma.user.create({
        data: {
          USER_DATA: userData,
          USER_SALT: userSalt,
          USER_PICTURE: null, // Replace with the actual picture data if available
        },
      });

      return user.USER_ID;
    } catch (error) {
      throw error;
    }
  }
  async checkSecurityAnswer(userData: any, securityAnswer: any) {
    try {
      // Find the user by USER_DATA and include the SECURITYQUESTION
      const user = await prisma.user.findUnique({
        where: { USER_DATA: userData },
        include: {
          SECURITYQUESTION: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.SECURITYQUESTION.find(
        (question: { SECURITYQUESTION_DATA: any }) =>
          question.SECURITYQUESTION_DATA === securityAnswer
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
        where: { USER_DATA: userData },
        include: {
          SECURITYQUESTION: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if there is a matching security answer
      const matchingSecurityAnswer = user.SECURITYQUESTION.find(
        (question: { SECURITYQUESTION_DATA: any }) =>
          question.SECURITYQUESTION_DATA === securityAnswer
      );

      if (!matchingSecurityAnswer) {
        throw new Error("Incorrect security question answer");
      }

      return user; // Return the user if the answer is correct
    } catch (error) {
      throw error;
    }
  }

  //add a new credential to the database
  async createCredential(credential: Credential) {
    try {
      const newCredential = await prisma.CREDENTIAL.create({
        data: credential,
      });
      return newCredential;
    } catch (error) {
      throw error;
    }
  }

  //delete a credential by credential id
  async deleteCredentialById(credentialId: any) {
    try {
      const deletedCredential = await prisma.CREDENTIAL.delete({
        where: { CREDENTIAL_ID: credentialId },
      });
      return deletedCredential;
    } catch (error) {
      throw error;
    }
  }
}