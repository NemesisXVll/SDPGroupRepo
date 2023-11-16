import React, { useState } from "react";
import loginImg from "../assets/icons/login/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../utils/authService"; // Adjust the import path as needed

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call the login function from authService
    const isLoggedIn = login({ email, password });
    if (isLoggedIn) {
      // User is logged in. Here you can redirect or handle the logged-in state
      console.log("User is logged in");
      // Redirect to dashboard or other appropriate page
    } else {
      // Handle login failure. You could set an error message in state and display it
      console.log("Login failed");
    }
  };

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
          <h2 className="text-4xl font-bold text-center py-6">PassGuard</h2>
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input
              className="border p-2"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2 relative">
            <label htmlFor="password">Password</label>
            <input
              className="border p-2 pl-3 pr-10"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute translate-x-80 translate-y-9"
            >
              {showPassword ? (
                <FiEyeOff size="1.3em" />
              ) : (
                <FiEye size="1.3em" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Login
          </button>
          <p className="text-center mt-8">
            Don't have an account?
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
