type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = (data: SignUpData): boolean => {
  const { email, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Hashing the password before storing it should be done on the server side
  // For now, we'll skip it and save the data directly

  //save the information in json format without confirmation
  const { confirmPassword: _, ...userDetailsWithoutConfirm } = data;
  localStorage.setItem(email, JSON.stringify(userDetailsWithoutConfirm));
  alert("Account created successfully!");
  return true;
};

type LoginData = {
  email: string;
  password: string;
};

export const login = ({ email, password }: LoginData): boolean => {
  const userDataString = localStorage.getItem(email);
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.password === password) {
      alert("Logged in successfully!");
      return true;
    } else {
      alert("Incorrect password. Please try again.");
    }
  } else {
    alert("No account found with this email. Please sign up.");
  }
  return false;
};