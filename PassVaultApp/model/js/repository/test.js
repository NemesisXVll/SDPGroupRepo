import UserManagementService from "./UserManagementService.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const userManagementService = new UserManagementService();

async function main() {
    //Test ur methods here
    userManagementService.createUser();
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
