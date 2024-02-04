type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  masterPassword: string;
  confirmPassword: string;
  salt: string;
  picture: string;
};

export const SignUp = (data: SignUpData): boolean => {
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

  // Hashing the password before storing it should be done on the server side
  // For now, we'll skip it and save the data directly
  //save the information in json format without confirmation

  console.log(filteredData);

  window.ipcRenderer.send("createUser", filteredData);

  console.log("Account created successfully!");
  return true;
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
