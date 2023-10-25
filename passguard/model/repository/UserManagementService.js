import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UserManagementService {

    //Add Methods Here for Creating, Updating, and Deleting
    //Use this example signature --> async createUser() {}

    //add a new credential to the database
    async createCredential(credential) {
        return await prisma.CREDENTIAL.create({
            data: credential
        })
    }

    //delete a credential by credential id
    async deleteCredentialById(credentialId) {
        return await prisma.CREDENTIAL.delete({
            where: {
                CREDENTIAL_ID: credentialId
            }
        })
    }



}
