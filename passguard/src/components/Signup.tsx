import React, { useState } from "react";
import loginImg from "../assets/icons/login/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../utils/authService";
import { useNavigate } from "react-router-dom";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  const handleSignUpClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, confirmPassword } = state;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const signUpResult = SignUp({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      masterPassword: state.password,
      confirmPassword: state.confirmPassword,
      salt: "",
      picture: "",
    });

    if (signUpResult) {
      navigate("/login"); // Navigate to login page after successful signup
    } else {
      // Sign up failed - handle the error, maybe show a message to the user
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = state;

  function handleLoginClick(): void {
    navigate("/login");
  }

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
          onSubmit={handleSignUpClick}
        >
          <h2 className="text-4xl font-bold text-center py-6">SignUp</h2>

          {/* First Name Field */}
          <div className="flex flex-col py-2">
            <label htmlFor="firstName">First Name</label>
            <input
              required={true}
              className="border p-2"
              name="firstName"
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name Field */}
          <div className="flex flex-col py-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              required={true}
              className="border p-2"
              name="lastName"
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input
              required={true}
              className="border p-2"
              name="email"
              id="email"
              type="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col py-2 relative">
            <label htmlFor="password">Password</label>
            <input
              required={true}
              className="border p-2 pl-3 pr-10"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={togglePasswordVisibility}
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
              required={true}
              className="border p-2 pl-3 pr-10"
              name="confirmPassword"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              aria-label="Toggle confirm password visibility"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute translate-x-80 translate-y-9"
            >
              {showConfirmPassword ? (
                <FiEyeOff size="1.3em" />
              ) : (
                <FiEye size="1.3em" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Create Account
          </button>

          <p className="text-center mt-8">
            Already have an account?
            <a
              onClick={handleLoginClick}
              href="#"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
