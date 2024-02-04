import React from "react";
import loginImg from "../assets/icons/login/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../utils/authService"; // Adjust the import path as needed

// Define the state type for the SignUp component
interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

class Signup extends React.Component<{}, State> {
  state: State = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  };

  //event handler that updates the component's state when a user types into an input field
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  //event handler used to toggle the visibility of the password input field in the form.
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  handleSignUpClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    //this function imported from authService
    const signUpResult = SignUp({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    });

    if (signUpResult) {
      alert("Account created successfully!");
      // Here you could also handle redirection to the login page or clearing the form
    } else {
      // Sign up failed - handle the error, maybe show a message to the user
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
    } = this.state;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src={loginImg}
            alt="Signup visual"
          />
        </div>
        <div className="bg-gray-100 flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
            onSubmit={this.handleSignUpClick}
          >
            <h2 className="text-4xl font-bold text-center py-6">SignUp</h2>

            {/* First Name Field */}
            <div className="flex flex-col py-2">
              <label htmlFor="firstName">First Name</label>
              <input
                className="border p-2"
                name="firstName"
                id="firstName"
                type="text"
                value={firstName}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col py-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="border p-2"
                name="lastName"
                id="lastName"
                type="text"
                value={lastName}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col py-2">
              <label htmlFor="email">Email</label>
              <input
                className="border p-2"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col py-2 relative">
              <label htmlFor="password">Password</label>
              <input
                className="border p-2 pl-3 pr-10"
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={this.handleInputChange}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={this.togglePasswordVisibility}
                className="absolute translate-x-80 translate-y-9"
              >
                {showPassword ? (
                  <FiEyeOff size="1.3em" />
                ) : (
                  <FiEye size="1.3em" />
                )}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col py-2 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="border p-2 pl-3 pr-10"
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                onClick={this.toggleConfirmPasswordVisibility}
                className="absolute translate-x-80 translate-y-9"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size="1.3em" />
                ) : (
                  <FiEye size="1.3em" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Create Account
            </button>

            <p className="text-center mt-8">
              Already have an account?
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
