import zxcvbn from "zxcvbn";
import { serviceNames } from "../data/dropdownItems";

export default class CredentialService {
  async createCredential(formData: any, userId: number) {
    /*Here u should do something like this to not get actual password value.
      const password = data.get('password');
      const hashedPassword = /* perform your encryption or hashing here;
      Replace the original password with the hashed version
      data.set('password', hashedPassword);
      */

    formData.set(
      "loginPageUrl",
      formData.get("loginPageUrl") === "" ? "" : formData.get("loginPageUrl")
    );

    formData.set("userId", userId.toString()); //Need to change this to the actual user id
    const credentialObj = JSON.parse(
      JSON.stringify(Object.fromEntries(formData.entries()))
    );

    const data = {
      serviceName: credentialObj.serviceName,
      title: credentialObj.credentialTitle,
      data: JSON.stringify({
        userName: credentialObj.userName,
        password: credentialObj.password,
      }),
      url: credentialObj.loginPageUrl,
      isWeak: this.checkPasswordStrength(credentialObj.password),
      isReused: false,
      isTrashed: false,
      serviceType: credentialObj.serviceType,
      picture:
        serviceNames.find(
          (service: any) => service.name === credentialObj.serviceName
        )?.image || serviceNames[9].image,
      userId: this.convertStringToInt(credentialObj.userId),
    };

    console.log(data);

    window.ipcRenderer.send("createCredential", data);
  }

  async trashCredentialById(credentialId: number) {
    window.ipcRenderer.send("trashCredentialById", credentialId);
  }
  async recoverCredentialById(credentialId: number) {
    window.ipcRenderer.send("recoverCredentialById", credentialId);
  }
  async deleteCredential(credentialId: number) {
    window.ipcRenderer.send("deleteCredential", credentialId);
  }

  async updateCredential(credentialId: string, formData: any, userId: number) {
    /*Here u should do something like this to not get actual password value.
      const password = data.get('password');
      const hashedPassword = /* perform your encryption or hashing here;
      Replace the original password with the hashed version
      data.set('password', hashedPassword);
      */

    formData.set(
      "loginPageUrl",
      formData.get("loginPageUrl") === ""
        ? ""
        : formData.get("loginPageUrl")
    );
    formData.set("userId", userId.toString());
    const credentialObj = JSON.parse(
      JSON.stringify(Object.fromEntries(formData.entries()))
    );
    const oldCredential = await this.findCredentialById(credentialId);
    const oldPass = await this.getPasswordByCredentialId(credentialId);

    //Check if password has been updated
    if (oldPass != credentialObj.password)
      credentialObj.dateUpdated = new Date().toISOString();
    else credentialObj.dateUpdated = oldCredential.dateUpdated;

    const data = {
      credentialId: credentialId,
      serviceName: credentialObj.serviceName,
      title: credentialObj.credentialTitle,
      data: JSON.stringify({
        userName: credentialObj.userName,
        password: credentialObj.password,
      }),
      url: credentialObj.loginPageUrl,
      isWeak: this.checkPasswordStrength(credentialObj.password),
      // isReused: false,
      serviceType: credentialObj.serviceType,
      picture:
        serviceNames.find(
          (service: any) => service.name === credentialObj.serviceName
        )?.image || serviceNames[9].image,
      userId: this.convertStringToInt(credentialObj.userId),
      dateUpdated: credentialObj.dateUpdated,
    };

    // console.log(data);

    window.ipcRenderer.send("updateCredential", data);
  }

  async findCredentialsByUserId(userId: any): Promise<any> {
    return new Promise((resolve) => {
      window.ipcRenderer.send("findCredentialsByUserIdRequest", userId);
      window.ipcRenderer.once(
        "findCredentialsByUserIdResponse",
        (event, arg) => {
          const parsedData = JSON.parse(arg);
          resolve(parsedData);
        }
      );
    });
  }
  async getPasswordByCredentialId(credentialId: any): Promise<String> {
    return new Promise((resolve) => {
      window.ipcRenderer.send("getPasswordByCredentialIdRequest", credentialId);
      window.ipcRenderer.once(
        "getPasswordByCredentialIdResponse",
        (event, arg) => {
          const password = JSON.parse(arg);
          resolve(password);
        }
      );
    });
  }
  async getTotalCredentialsCountByUserId(userId: any): Promise<number> {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send(
          "getTotalCredentialsCountByUserIdRequest",
          userId
        );
        window.ipcRenderer.once(
          "getTotalCredentialsCountByUserIdResponse",
          (event, arg) => {
            const parsedData = JSON.parse(arg);
            resolve(parsedData);
          }
        );
      });
    } catch (error) {
      console.error("Error counting total credentials", error);
      return 0;
    }
  }
  async getWeakPasswordsCountByUserIdRequest(userId: any): Promise<number> {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send("getWeakPasswordsCountByUserIdRequest", userId);
        window.ipcRenderer.once(
          "getWeakPasswordsCountByUserIdResponse",
          (event, arg) => {
            resolve(arg);
          }
        );
      });
    } catch (error) {
      console.error("Error counting weak passwords", error);
      return 0;
    }
  }
  async getOldPasswordsCountByUserIdRequest(userId: any): Promise<number> {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send("getOldPasswordsCountByUserIdRequest", userId);
        window.ipcRenderer.once(
          "getOldPasswordsCountByUserIdResponse",
          (event, arg) => {
            const parsedData = JSON.parse(arg);
            resolve(parsedData);
          }
        );
      });
    } catch (error) {
      console.error("Error counting old passwords", error);
      return 0;
    }
  }

  async findCredentialById(credentialId: any): Promise<any> {
    return new Promise((resolve) => {
      window.ipcRenderer.send("findCredentialByIdRequest", credentialId);
      window.ipcRenderer.once("findCredentialByIdResponse", (event, arg) => {
        const parsedData = JSON.parse(arg);
        resolve(parsedData);
      });
    });
  }

  checkPasswordStrength(password: string): boolean {
    const result = zxcvbn(password);
    return result.score <= 1 ? true : false;
  }

  convertStringToInt(value: string): number | null {
    const parsedValue = parseInt(value, 10);

    // Check if parsing was successful
    if (isNaN(parsedValue)) {
      return null; // Return null if the conversion fails
    }

    return parsedValue;
  }
  async updateCredentialValidity(credentialId: any): Promise<any> {
    window.ipcRenderer.send("updateCredentialValidityRequest", credentialId);
  }
  async checkOldPasswordStatus(userId: any): Promise<any> {
    const currentDate = new Date();
    const credentials = await this.findCredentialsByUserId(userId);
    for (const credential of credentials) {
      const dateSaved = new Date(credential.dateUpdated);
      const differenceInMilliseconds = Math.abs(
        currentDate.getTime() - dateSaved.getTime()
      );
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      if (differenceInDays >= 1 && credential.isOld == false) {
        await this.updateCredentialValidity(credential.credentialId);
      }
    }
    return true;
  }
  async checkTrashStatus(userId: any): Promise<any> {
    const trashedCredentials = await this.getTrashedCredentialsByUserId(userId);
    const currentDate = new Date();
    for (const credential of trashedCredentials) {
      const dateTrashed = new Date(credential.dateTrashed);
      const differenceInMilliseconds = Math.abs(
        currentDate.getTime() - dateTrashed.getTime()
      );
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      if (differenceInDays >= 2 && trashedCredentials.length > 0) {
        console.log("Deleting outdated trashed credential");
        await this.deleteCredential(credential.credentialId);
      }
    }
  }
  async getTrashedCredentialsByUserId(userId: any): Promise<any> {
    return new Promise((resolve) => {
      window.ipcRenderer.send("getTrashedCredentialsByUserIdRequest", userId);
      window.ipcRenderer.once(
        "getTrashedCredentialsByUserIdResponse",
        (event, arg) => {
          const parsedData = JSON.parse(arg);
          resolve(parsedData);
        }
      );
    });
  }
  async getReusedPasswordsCountByUserIdRequest(userId: any): Promise<number> {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send(
          "getReusedPasswordsCountByUserIdRequest",
          userId
        );
        window.ipcRenderer.once(
          "getReusedPasswordsCountByUserIdResponse",
          (event, arg) => {
            const parsedData = JSON.parse(arg);
            resolve(parsedData);
          }
        );
      });
    } catch (error) {
      console.error("Error counting reused passwords", error);
      return 0;
    }
  }
}
