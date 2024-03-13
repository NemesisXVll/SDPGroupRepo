import { ipcMain } from "electron";
import UserManagementService from "../repositories/UserManagementService";
import UserQueryService from "../repositories/UserQueryService";

const userManagementService = new UserManagementService();
const userQueryService = new UserQueryService();

export const registerIPCMainHandlers = () => {

  ipcMain.on("importDBRequest", async (event, arg) => {
    event.sender.send(
      "importDBResponse",
      JSON.stringify(await userManagementService.importDB(arg))
    );
  });

  ipcMain.on("createCredential", async (event, arg) => {
    await userManagementService.createCredential(arg);
  });
  ipcMain.on("updateCredential", async (event, arg) => {
    await userManagementService.updateCredentialById(arg.credentialId, arg);
  });

  ipcMain.on("trashCredentialById", async (event, arg) => {
    await userManagementService.trashCredentialById(arg);
  });
  ipcMain.on("recoverCredentialById", async (event, arg) => {
    await userManagementService.recoverCredentialById(arg);
  });

  ipcMain.on("findUserByIdRequest", async (event, arg) => {
    event.sender.send(
      "findUserByIdResponse",
      JSON.stringify(await userQueryService.findUserById(arg))
    );
  });

  ipcMain.on("findUserByEmailRequest", async (event, arg) => {
    event.sender.send(
      "findUserByEmailResponse",
      JSON.stringify(await userQueryService.findUserByEmail(arg))
    );
    console.log(
      "findUserByEmailResponse: ",
      await userQueryService.findUserByEmail(arg)
    );
  });

  ipcMain.on("getUserDataByIdRequest", async (event, arg) => {
    event.sender.send(
      "getUserDataByIdResponse",
      JSON.stringify(await userQueryService.getUserDataById(arg))
    );
  });

  ipcMain.on("findCredentialsByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "findCredentialsByUserIdResponse",
      JSON.stringify(await userQueryService.getCredentialsByUserId(arg))
    );
  });

  ipcMain.on("getTotalCredentialsCountByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "getTotalCredentialsCountByUserIdResponse",
      JSON.stringify(
        await userQueryService.getTotalCredentialsCountByUserId(arg)
      )
    );
  });
  ipcMain.on("getWeakPasswordsCountByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "getWeakPasswordsCountByUserIdResponse",
      JSON.stringify(await userQueryService.getWeakPasswordsCountByUserId(arg))
    );
  });
  ipcMain.on("getOldPasswordsCountByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "getOldPasswordsCountByUserIdResponse",
      JSON.stringify(await userQueryService.getOldPasswordsCountByUserId(arg))
    );
  });

  ipcMain.on("createUser", async (event, arg) => {
    console.log("createUser: ", arg);
    await userManagementService.createUser(arg);
  });

  ipcMain.on("deleteCredential", async (event, arg) => {
    await userManagementService.deleteCredentialById(arg);
  });

  ipcMain.on("findCredentialByIdRequest", async (event, arg) => {
    event.sender.send(
      "findCredentialByIdResponse",
      JSON.stringify(await userQueryService.getCredentialById(arg))
    );
  });

  ipcMain.on("getPasswordByCredentialIdRequest", async (event, arg) => {
    const data = JSON.parse(
      JSON.stringify(await userQueryService.getDataByCredentialId(arg))
    );
    const password = data.data.password;
    event.sender.send(
      "getPasswordByCredentialIdResponse",
      JSON.stringify(password)
    );
  });
  ipcMain.on("updateCredentialValidityRequest", async (event, arg) => {
    await userManagementService.updateCredentialValidityById(arg);
  });
  ipcMain.on("getReusedPasswordsCountByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "getReusedPasswordsCountByUserIdResponse",
      JSON.stringify(
        await userQueryService.getReusedPasswordsCountByUserId(arg)
      )
    );
  });
  ipcMain.on("getTrashedCredentialsByUserIdRequest", async (event, arg) => {
    event.sender.send(
      "getTrashedCredentialsByUserIdResponse",
      JSON.stringify(await userQueryService.getTrashedCredentialsByUserId(arg))
    );
  });
};

ipcMain.on("createDocument", async (event, arg) => {
  await userManagementService.createDocument(arg);
});
ipcMain.on("deleteDocumentById", async (event, arg) => {
  await userManagementService.deleteDocumentById(arg);
});
ipcMain.on("findDocumentsByUserIdRequest", async (event, arg) => {
  event.sender.send(
    "findDocumentsByUserIdResponse",
    JSON.stringify(await userQueryService.getDocumentsByUserId(arg))
  );
});
