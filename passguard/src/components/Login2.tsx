import React, { useRef, useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../utils/authService"; 
import { useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  

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
      navigate("/home", { state: { user, expanded:true } });
    } else {
      console.log("Login failed");
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  function handleForgotPassword(): void {
   
    navigate("/ForgetOtp");
  }

  function handleCreateAccount(): void {
    navigate("/signup");
  }


  const handleImportClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.db')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
       
        
      } else {
        console.error('Please select a .db file');
      }
    }
  };
  
  

  function handleOnChange(event: any): void {
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
            required={true}
            value={email}
            label="Email"
            id="email"
            placeholder=""
            onChange={handleOnChange}
          ></LabelInput>

          <LabelInput
            type={showPassword ? "text" : "password"}
            value={password}
            required={true}
            label="Password"
            id="password"
            placeholder=""
            onChange={handleOnChange}
          >
             <a
              onClick={handleCreateAccount}
              href="#"
              className="text-indigo-600 hover:text-indigo-500 font-normal font-['Nunito']"
            >
                Forget Password?
            </a>
            <div className="grid grid-rows-2 grid-cols-2 pr-1">
              {showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  size="1.3em"
                  className="ml-1 text-black
              absolute translate-x-[21rem] top-[2rem]"
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(!showPassword)}
                  size="1.3em"
                  className="ml-1 text-black
              absolute translate-x-[21rem] top-[2rem]"
                />
              )}
            </div>
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

         <div className="text-center mt-1">
            <span>Do you want to import your database?</span>
                <a
                    onClick={handleImportClick}
                    className="text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1"
                >
                    Import
                </a>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
