import React, { useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../utils/authService"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    const data = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );
    const { email, password } = data;
    // Call the login function from authService
    const user = await login({ email, password });
    if (user) {
      console.log("User logged in");
      navigate("/home", { state: { user } });
    } else {
      console.log("Login failed");
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  function handleCreateAccount(): void {
    navigate("/signup");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Login visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={handleLoginSubmit}
        >
          <h2 className="text-4xl text-center py-6 font-bold font-['Nunito']">
            PassGuard
          </h2>

          <LabelInput
            type="text"
            value={email}
            label="Email"
            id="email"
            placeholder=""
            onChange="handleOnChange"
          ></LabelInput>

          <LabelInput
            type={showPassword ? "text" : "password"}
            value={password}
            label="Password"
            id="password"
            placeholder=""
            onChange="handleOnChange"
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute translate-x-[21.2rem] translate-y-8"
            >
              {showPassword ? (
                <FiEyeOff size="1.3em" />
              ) : (
                <FiEye size="1.3em" />
              )}
            </button>
          </LabelInput>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="mt-7">
            <Button value="Login" type="submit">
              Login
            </Button>
          </div>

          <p className="text-center mt-8 font-normal font-['Nunito']">
            Don't have an account?
            <a
              onClick={handleCreateAccount}
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-normal font-['Nunito']"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
