import prisma from "../client";
import UserQueryService from "./UserQueryService";
import { encryptData, hashPassword, generateSalt } from "./Security/Encryption";
import * as fs from "fs";
import * as path from "path";

const userQueryService = new UserQueryService();
export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}

  //-------------------------User Model-------------------------//
  // async signUp(userData: any, userSalt: any) {
  //   try {
  //     // Check if a user with the provided USER_DATA already exists
  //     const existingUser = await prisma.user.findUnique({
  //       where: { data: userData },
  //     });

  //     if (existingUser) {
  //       throw new Error("User with this USER_DATA already exists");
  //     }

  //     // Create the new user with the provided USER_DATA, USER_SALT, and a default USER_PICTURE
  //     const user = await prisma.user.create({
  //       data: {
  //         data: userData,
  //         salt: userSalt,
  //         picture: null, // Replace with the actual picture data if available
  //       },
  //     });

  //     return user.userId;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async importDB(dbPath: any) {
    try {
      console.log("Importing DB...");
      fs.copyFileSync(dbPath, path.join(__dirname, "../prisma/dev.db"));
      return true;
    } catch (error) {
      console.error("Error importing DB", error);
      return false;
    }
  }

  async createDocument(document: any) {
    const masterPassword = await userQueryService.getUserMasterPasswordById(
      document.userId
    );
    const encryptedData = encryptData(document.path, masterPassword);
    try {
      const newDocument = await prisma.document.create({
        data: {
          ...document,
          path: encryptedData,
        },
      });
      return newDocument;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocumentById(documentId: any) {
    try {
      const deletedDocument = await prisma.document.delete({
        where: { documentId: documentId },
      });
      return deletedDocument;
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
      const salt = generateSalt();
      const hashedPassword = await hashPassword(user.masterPassword, salt);
      const encryptedData = encryptData(user.data, hashedPassword);

      const newUser = await prisma.user.create({
        data: {
          ...user,
          data: encryptedData,
          masterPassword: hashedPassword,
          salt: salt,
        },
      });
      // console.log("User created....", newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user", error);
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
    const isReused = await this.checkForReusedPasswordOnCreation(credential);
    const masterPassword = await userQueryService.getUserMasterPasswordById(
      credential.userId
    );
    const encryptedData = encryptData(credential.data, masterPassword);
    if (isReused) {
      credential.isReused = true;
    }
    try {
      const newCredential = await prisma.credential.create({
        data: {
          ...credential,
          data: encryptedData,
        },
      });
      // console.log("credential created....",credential);
      return newCredential;
    } catch (error) {
      throw error;
    }
  }
  async trashCredentialById(credentialId: number) {
    await this.checkForReusedPasswordOnDeletion(credentialId);
    try {
      const trashedCredential = await prisma.credential.update({
        where: { credentialId: credentialId },
        data: {
          credentialId: credentialId,
          isTrashed: true,
          dateTrashed: new Date().toISOString(),
        },
      });
      return trashedCredential;
    } catch (error) {
      throw error;
    }
  }
  async recoverCredentialById(credentialId: number) {
    const recoveredCredential =
      await userQueryService.getCredentialById(credentialId);
    const preparedCredential = { ...recoveredCredential };
    preparedCredential.data = JSON.stringify(preparedCredential.data);
    const isReused =
      await this.checkForReusedPasswordOnCreation(preparedCredential);
    if (isReused) {
      await prisma.credential.update({
        where: { credentialId: credentialId },
        data: { isReused: true, isTrashed: false },
      });
    } else {
      try {
        const recoveredCredential = await prisma.credential.update({
          where: { credentialId: credentialId },
          data: { isTrashed: false },
        });
        return recoveredCredential;
      } catch (error) {
        throw error;
      }
    }
  }
  async deleteCredentialById(credentialId: number) {
    await this.checkForReusedPasswordOnDeletion(credentialId);
    console.log("deleting credential", credentialId);
    try {
      const deletedCredential = await prisma.credential.delete({
        where: { credentialId: credentialId },
      });
      console.log("credential deleted....");
      return deletedCredential;
    } catch (error) {
      throw error;
    }
  }

  async updateCredentialById(credentialId: any, credential: any) {
    const stillReused = await this.checkForReusedPasswordOnUpdate(credential);
    const masterPassword = await userQueryService.getUserMasterPasswordById(
      credential.userId
    );
    const encryptedData = encryptData(credential.data, masterPassword);
    try {
      const updatedCredential = await prisma.credential.update({
        where: { credentialId: credentialId },
        data: {
          ...credential,
          data: encryptedData,
          isReused: stillReused,
        },
      });
      console.log("credential updated....");
      return updatedCredential;
    } catch (error) {
      console.error("Error updating credential", error);
    }
  }
  async updateCredentialValidityById(credentialId: any) {
    try {
      const updatedCredential = await prisma.credential.update({
        where: { credentialId: credentialId },
        data: { isOld: true },
      });
      // Ensure that updatedCredential is a valid object
      if (updatedCredential && typeof updatedCredential === "object") {
        return updatedCredential;
      } else {
        console.error("Invalid response from database:", updatedCredential);
        // Handle the invalid response appropriately
      }
    } catch (error) {
      console.error("Error updating credentials' validity", error);
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
  async checkForReusedPasswordOnCreation(credential?: any) {
    const password = JSON.parse(credential.data).password;
    const allCredentials = await userQueryService.getAllCurrentCredentials();
    const existingCredentials = allCredentials.filter((cred) => {
      const credData = JSON.parse(cred.data);
      return credData.password === password;
    });
    if (existingCredentials.length > 0) {
      for (const cred of existingCredentials) {
        await prisma.credential.update({
          where: { credentialId: cred.credentialId },
          data: { isReused: true },
        });
      }
      return true;
    }
    return false;
  }
  async checkForReusedPasswordOnDeletion(credentialId: any) {
    const data = await userQueryService.getDataByCredentialId(credentialId);
    if (!data) return;
    const password = JSON.parse(JSON.stringify(data.data)).password;
    const allCredentials = await userQueryService.getAllCurrentCredentials();
    const existingCredentials = allCredentials.filter((cred) => {
      const credData = JSON.parse(cred.data);
      return credData.password === password;
    });
    if (existingCredentials.length == 2) {
      // 2 because the one being deleted is also included
      for (const cred of existingCredentials) {
        await prisma.credential.update({
          where: { credentialId: cred.credentialId },
          data: { isReused: false },
        });
      }
    }
  }
  async checkForReusedPasswordOnUpdate(credential: any) {
    const newPassword = JSON.parse(credential.data).password; // new password
    const isChanged = await this.isPasswordChanged(
      credential.credentialId,
      newPassword
    );
    if (!isChanged) {
      // console.log("Password not changed");
      return;
    }
    //Check if old password was reused
    const allCredentials = await userQueryService.getAllCurrentCredentials();
    // console.log("new pass: ", newPassword);
    await this.isOldPasswordReused(credential.credentialId, allCredentials);

    const stillReused = await this.checkForReusedPasswordOnCreation(credential); // check if new password is still reused
    if (stillReused) {
      // console.log("Password still reused");
      return true;
    } else {
      // console.log("Password not reused");
      return false;
    }
  }
  async isPasswordChanged(credentialId: any, newPassword: any) {
    const oldData = await userQueryService.getDataByCredentialId(credentialId);
    // console.log("old data", oldData);
    const oldPassword = JSON.parse(JSON.stringify(oldData?.data)).password;
    // console.log("old pass", oldPassword);
    // console.log("new pass", newPassword);
    if (oldPassword === newPassword) {
      return false;
    }
    return true;
  }

  async isOldPasswordReused(credentialId: any, allCredentials: any) {
    // next checking which credentials had the old password and updating them accordingly
    const oldData = await userQueryService.getDataByCredentialId(credentialId);
    const oldPassword = JSON.parse(JSON.stringify(oldData?.data)).password;
    // console.log("old pass", oldPassword);
    const existingCredentials = allCredentials.filter((cred: any) => {
      const credData = JSON.parse(cred.data);
      return credData.password === oldPassword;
    });
    if (existingCredentials.length == 2) {
      // 2 because the one being updated is also included
      for (const cred of existingCredentials) {
        // console.log(
        // 	"exactly one other credential with old pass found",
        // 	cred.credentialId
        // );
        await prisma.credential.update({
          where: {
            credentialId: cred.credentialId,
          },
          data: { isReused: false },
        });
      }
    }
  }
}
