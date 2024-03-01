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
}