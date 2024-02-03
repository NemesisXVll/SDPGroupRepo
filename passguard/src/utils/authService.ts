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
    data: JSON.stringify({
      email: email,
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

export const login = ({ email, password }: LoginData): boolean => {

  const userDataString = localStorage.getItem(email);

  // new Promise((resolve) => {
  //   window.ipcRenderer.send("findCredentialByIdRequest", credentialId);
  //   window.ipcRenderer.once("findCredentialByIdResponse", (event, arg) => {
  //     const parsedData = JSON.parse(arg);
  //     resolve(parsedData);
  //   });
  // });

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.password === password) {
      console.log("Logged in successfully!");
      return true;
    } else {
      console.log("Incorrect password. Please try again.");
    }
  } else {
    console.log("No account found with this email. Please sign up.");
  }
  return false;
};

