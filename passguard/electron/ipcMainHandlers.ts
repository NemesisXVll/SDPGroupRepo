import { ipcMain } from "electron";
import UserManagementService from "../repositories/UserManagementService";
import UserQueryService from "../repositories/UserQueryService";

const userManagementService = new UserManagementService();
const userQueryService = new UserQueryService();

export const registerIPCMainHandlers = () => {
  ipcMain.on("createCredential", async (event, arg) => {
    await userManagementService.createCredential(arg);
  });

  ipcMain.on("updateCredential", async (event, arg) => {
    await userManagementService.updateCredentialById(arg.credentialId, arg);
  });

  ipcMain.on("deleteCredential", async (event, arg) => {
    await userManagementService.deleteCredentialById(arg.credentialId);
  });

  ipcMain.on("findUserByIdRequest", async (event, arg) => {
    event.sender.send(
      "findUserByIdResponse",
      JSON.stringify(await userQueryService.findUserById(arg))
    );
  });

  ipcMain.on("findCredentialsByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "findCredentialsByUserIdResponse",
      JSON.stringify(await userQueryService.getCredentialsByUserId(arg))
    );
  });

  ipcMain.on("findCredentialByIdRequest", async (event, arg) => {
    event.sender.send(
      "findCredentialByIdResponse",
      JSON.stringify(await userQueryService.getCredentialById(arg))
    );
  });

  ipcMain.on("createUser", async (event, arg) => {
    await userManagementService.createUser(arg);
  });
};
