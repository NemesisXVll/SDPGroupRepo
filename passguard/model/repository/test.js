import UserManagementService from "./UserManagementService.js";
import UserQueryService from "./UserQueryService.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userManagementService = new UserManagementService();
const userQueryService = new UserQueryService();

async function main() {
  //Test ur methods here
  console.log("Testing methods");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
