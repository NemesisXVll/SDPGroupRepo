import React, { useEffect, useState } from "react";
import loginImg from "../../assets/icons/common/appLogo.svg";
import LabelInput from "../Form/LabelInput";
import Button from "../Form/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { unlock } from "../../utils/authService";
import { useLocation, useNavigate } from "react-router-dom";

function LockPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const handleUnlockSubmit = async (event: any) => {
    event.preventDefault();
    const data = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );
    const { email, password } = data;
    // Call the login function from authService
    const user = await unlock(password, location.state.user.userId);
    if (user) {
      console.log("User logged in");
      navigate(location.state.beforeLockLocation, {
        replace: true,
        state: { user, expanded: location.state.expanded },
      });
    } else {
      console.log("Login failed");
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  function handleOnChange(event: any): void {}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Login visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] min-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={handleUnlockSubmit}
        >
          <h2 className="text-xl text-center py-6 font-bold font-['Nunito']">
            App Locked due to Inactivity
          </h2>
          <div className="flex justify-center">
            <CiLock className="text-7xl text-red-500"></CiLock>
          </div>

          <LabelInput
            type={showPassword ? "text" : "password"}
            value={password}
            required={true}
            label="Password"
            id="password"
            placeholder=""
            onChange={handleOnChange}
          >
            <div className="grid grid-rows-2 grid-cols-2">
              {showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  size="1.3em"
                  className="ml-1 text-black
                  absolute translate-x-[20.8rem] top-[1.9rem]"
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(!showPassword)}
                  size="1.3em"
                  className="ml-1 text-black
                  absolute translate-x-[20.8rem] top-[1.9rem]"
                />
              )}
            </div>
          </LabelInput>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="mt-7">
            <Button value="Login" type="submit">
              Unlock
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LockPage;