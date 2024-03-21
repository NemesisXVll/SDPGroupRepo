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
    async sendSMS(userId: number, otp: string) { 
        console.log("sendSMS: ", { userId, otp });
        window.ipcRenderer.send("sendSMS", { userId, otp });
    }

}