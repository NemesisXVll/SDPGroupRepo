import bcrypt from "bcryptjs";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  masterPassword: string;
  confirmPassword: string;
  salt: string;
  picture: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const SignUp = async (data: SignUpData): Promise<boolean> => {
  const { email, masterPassword, confirmPassword, ...rest } = data;

  if (masterPassword !== confirmPassword) {
    console.log("Passwords do not match.");
    return false;
  }

  const filteredData = {
    data: JSON.stringify({
      firstName: rest.firstName,
      lastName: rest.lastName,
      email: email,
    }),
    masterPassword: masterPassword,
    picture: "https://via.placeholder.com/150",
  };

  try {
    const userData: any = await new Promise((resolve) => {
      window.ipcRenderer.send("findUserByEmailRequest", email);
      window.ipcRenderer.once("findUserByEmailResponse", (event, arg) => {
        if (!arg) {
          resolve(false);
        }
        const parsedData = JSON.parse(arg);
        resolve(parsedData);
      });
    });
    if (userData) {
      console.log("User already exists");
      return false;
    } else {
      window.ipcRenderer.send("createUser", filteredData);
      console.log("Account created successfully!");
      return true;
    }
  } catch (error) {
    console.error("Error during SignUp:", error);
  }
  return false;
};

export const unlock = async (
  masterPassword: string,
  userId: number
): Promise<any> => {
  const user = new Promise((resolve) => {
    window.ipcRenderer.send("findUserByIdRequest", userId);
    window.ipcRenderer.once("findUserByIdResponse", (event, arg) => {
      const parsedData = JSON.parse(arg);
      resolve(parsedData);
    });
  });

  try {
    const userData: any = await user;

    if (userData) {
      const storedMasterPassword = userData.masterPassword;
      if (bcrypt.compareSync(masterPassword, storedMasterPassword)) {
        console.log("Unlock successful!");
        return userData;
      } else {
        console.log("Incorrect password");
        return false;
      }
    } else {
      console.log("User not found");
      return false;
    }
  } catch (error) {
    console.error("Error during unlock:", error);
    return false;
  }
};

export const login = async ({ email, password }: LoginData): Promise<any> => {
  const user = new Promise((resolve) => {
    window.ipcRenderer.send("findUserByEmailRequest", email);
    window.ipcRenderer.once("findUserByEmailResponse", (event, arg) => {
      const parsedData = JSON.parse(arg);
      resolve(parsedData);
    });
  });

  try {
    const userData: any = await user;

    if (userData) {
      const masterPassword = userData.masterPassword;
      if (bcrypt.compareSync(password, masterPassword)) {
        console.log("Login successful!");
        return userData;
      } else {
        console.log("Incorrect password");
        return false;
      }
    } else {
      console.log("User not found");
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};
