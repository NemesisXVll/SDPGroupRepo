type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  masterPassword: string;
  confirmPassword: string;
  salt: string;
  picture: string;
};

export const SignUp = async (data: SignUpData): Promise<boolean> => {
  const { email, masterPassword, confirmPassword, ...rest } = data;

  if (masterPassword !== confirmPassword) {
    console.log("Passwords do not match.");
    return false;
  }

  const filteredData = {
    email: email,
    data: JSON.stringify({
      masterPassword: masterPassword,
      firstName: rest.firstName,
      lastName: rest.lastName,
    }),
    salt: crypto.randomUUID(),
    picture: "https://via.placeholder.com/150",
  };

  try {
    const userData: any = await new Promise((resolve) => {
      window.ipcRenderer.send("findUserByEmailRequest", email);
      window.ipcRenderer.once("findUserByEmailResponse", (event, arg) => {
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

type LoginData = {
  email: string;
  password: string;
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
      const parsedData = JSON.parse(userData.data);
      if (parsedData.masterPassword === password) {
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
