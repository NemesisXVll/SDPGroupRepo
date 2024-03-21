export default class UserService {
  async getUserDataById(userId: number) {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send("getUserDataByIdRequest", userId);
        window.ipcRenderer.once("getUserDataByIdResponse", (event, arg) => {
          const parsedData = JSON.parse(JSON.parse(arg));
          resolve(parsedData);
        });
      });
    } catch (error) {
      console.error("Error getting user data", error);
      return {};
    }
  }
  async findUserByEmail(email: string) {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send("findUserByEmailRequest", email);
        window.ipcRenderer.once("findUserByEmailResponse", (event, arg) => {
          const parsedData = JSON.parse(arg);
          resolve(parsedData);
        });
      });
    } catch (error) {
      console.error("Error finding user by email", error);
      return {};
    }
  }

  async updateUser(
    userId: number,
    data: any,
    salt: string,
    masterPassword: string
  ) {
    try {
      const dataObj = {
        userId: userId,
        salt: salt,
        masterPassword: masterPassword,
        data: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          picture: data.picture,
        }),
      };

      return new Promise((resolve) => {
        window.ipcRenderer.send("updateUserRequest", dataObj);
        window.ipcRenderer.once("updateUserResponse", (event, arg) => {
          const parsedData = JSON.parse(arg);
          resolve(parsedData);
        });
      });
    } catch (error) {
      console.error("Error updating user", error);
      return {};
    }
  }

  async deleteUser(userId: number) {
    try {
      return new Promise((resolve) => {
        window.ipcRenderer.send("deleteUserRequest", userId);
        window.ipcRenderer.once("deleteUserResponse", (event, arg) => {
          const parsedData = JSON.parse(arg);
          console.log("parsedData", parsedData);
          resolve(parsedData);
        });
      });
    } catch (error) {
      console.error("Error deleting user", error);
      return {};
    }
  }
}
