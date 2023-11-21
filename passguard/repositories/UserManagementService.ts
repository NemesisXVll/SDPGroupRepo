import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserManagementService {
  //Add Methods Here for Creating, Updating, and Deleting
  //Use this example signature --> async createUser() {}

  //   async createUser() {
  //     console.log("You called the repo");
  //     const user = await prisma.user.create({
  //       data: {
  //         email: "Clicked",
  //         name: "NotClicked",
  //         age: 1,
  //       },
  //     });
  //   }

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

  //delete a credential by credential id
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
