export default class CredentialService {
  async createCredential(formData: any) {
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
        : "https://" + formData.get("loginPageUrl")
    );
    formData.set("userId", "1");
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
      isWeak: this.stringToBoolean(credentialObj.isWeak),
      isReused: false,
      serviceType: credentialObj.serviceType,
      picture: "https://via.placeholder.com/150",
      userId: this.convertStringToInt(credentialObj.userId),
    };

    window.ipcRenderer.send("createCredential", data);
  }

  async findUserById(userId: any) {
    return new Promise((resolve) => {
      window.ipcRenderer.send("findUserByIdRequest", userId);
      window.ipcRenderer.once("findUserByIdResponse", (event, arg) => {
        const parsedData = JSON.parse(arg);
        resolve(parsedData);
      });
    });
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

  stringToBoolean(value: string): boolean | null {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === "true") {
      return true;
    } else if (lowerCaseValue === "false") {
      return false;
    }
    return null;
  }

  convertStringToInt(value: string): number | null {
    const parsedValue = parseInt(value, 10);

    // Check if parsing was successful
    if (isNaN(parsedValue)) {
      return null; // Return null if the conversion fails
    }

    return parsedValue;
  }
}
