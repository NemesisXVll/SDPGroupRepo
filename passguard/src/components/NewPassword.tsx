import React, { useEffect, useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import MPasswdStrength from "./MPasswdStrength";
import { FcCheckmark } from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import UserService from "../utils/userService";

const userService = new UserService();

interface PasswordState {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
  length: boolean;
  repeatedChar: boolean;
  sequentialChar: boolean;
  contextSpecific: boolean;
}

const NewPassword: React.FC = () => {
  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmNewPass, setshowConfirmNewPass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    length: false,
    repeatedChar: false,
    sequentialChar: false,
    contextSpecific: false,
  });

  const handleNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
    const newPassword = event.target.value;

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;

    const upperCase = upperCaseRegex.test(newPassword);
    const lowerCase = lowerCaseRegex.test(newPassword);
    const number = numberRegex.test(newPassword);
    const specialChar = specialCharRegex.test(newPassword);
    const length = newPassword.length >= 8;
    const repeatedChar = /(.)\1{2,}/.test(newPassword);

    let sequentialChar = false;
    let contextSpecific = false;

    for (let i = 0; i < newPassword.length - 2; i++) {
      if (
        newPassword.charCodeAt(i) === newPassword.charCodeAt(i + 1) - 1 &&
        newPassword.charCodeAt(i) === newPassword.charCodeAt(i + 2) - 2
      ) {
        sequentialChar = true;
      }
    }

    if (newPassword.toLowerCase().includes("passguard")) contextSpecific = true;

    setPasswordStrength(
      (upperCase && lowerCase ? 1 : 0) +
        (number ? 1 : 0) +
        (specialChar ? 1 : 0) +
        (length ? 1 : 0)
    );

    setPasswordState({
      upperCase,
      lowerCase,
      number,
      specialChar,
      length,
      repeatedChar,
      sequentialChar,
      contextSpecific,
    });
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    if (
      !passwordState.upperCase ||
      !passwordState.lowerCase ||
      !passwordState.number ||
      !passwordState.specialChar ||
      !passwordState.length
    ) {
      setErrorMessage("Password does not meet the requirements.");
      return;
    }

    await userService.updateUserMasterPassword(
      location.state.user.userId,
      location.state.user.salt,
      newPassword
    );

    console.log("Password updated successfully.");

    navigate("/login", { state: { fromNewPassword: true } });
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
          className="w-[28rem] mx-auto  p-4  border-gray-300  shadow-md bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className=" font-nunito border-b-4 p-2 mb-3 text-center text-3xl py-4 font-bold ">
            🔑 Setup New Password
          </h2>

          <div className="flex-row mt-2 ">
            <div className="ml-[25rem]">
              <Tooltip
                content={
                  <>
                    <div className="">
                      <ul>
                        <li>To Achieve a Stronger Password</li>
                        <li className="mb-1 flex items-center">
                          {!passwordState.sequentialChar ? (
                            <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                          ) : (
                            <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                          )}
                          No Sequential Characters (e.g. 1234)
                        </li>
                        <li className="mb-1 flex items-center">
                          {!passwordState.repeatedChar ? (
                            <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                          ) : (
                            <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                          )}
                          No Repeated Characters (e.g. aaaa)
                        </li>
                      </ul>
                    </div>
                  </>
                }
                arrow={false}
                placement="top-end"
              >
                <IoInformationCircleOutline className="text-black"></IoInformationCircleOutline>
              </Tooltip>
            </div>

            <Tooltip
              placement="bottom"
              content={
                <div className="">
                  <ul>
                    <li className="mb-1 flex items-center">
                      {passwordState.upperCase && passwordState.lowerCase ? (
                        <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                      ) : (
                        <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                      )}
                      Upper & lower case letters
                    </li>
                    <li className="mb-1 flex items-center">
                      {passwordState.specialChar ? (
                        <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                      ) : (
                        <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                      )}
                      A symbol (e.g. #$&)
                    </li>
                    <li className="flex items-center">
                      {passwordState.number ? (
                        <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                      ) : (
                        <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                      )}
                      A number (e.g. 123)
                    </li>
                    <li className="mt-1 flex items-center">
                      {passwordState.length ? (
                        <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                      ) : (
                        <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                      )}
                      A longer password (min. 8 chars.)
                    </li>
                  </ul>
                </div>
              }
            >
              {/* Password Field */}
              <div className="w-[25.9rem]">
                <MPasswdStrength
                  contextSpecific={passwordState.contextSpecific}
                  sequentialChar={passwordState.sequentialChar}
                  repeatedChar={passwordState.repeatedChar}
                  required={true}
                  value={newPassword}
                  strength={passwordStrength}
                  label="New Password"
                  id="password"
                  placeholder=""
                  onChange={handleNewPasswordChange}
                ></MPasswdStrength>
              </div>
            </Tooltip>
          </div>

          {/* Confirm Password Field */}
          <LabelInput
            onChange={handleConfirmPasswordChange}
            required={true}
            type={showConfirmNewPass ? "text" : "password"}
            value={confirmPassword}
            label="Confirm New Password"
            id="confirmPassword"
            placeholder=""
          >
            <div className="">
              {showConfirmNewPass ? (
                <FiEyeOff
                  onClick={(e: any) => {
                    e.preventDefault();
                    setshowConfirmNewPass(!showConfirmNewPass);
                  }}
                  size="1.3em"
                  className="ml-1 text-black
                  absolute translate-x-[24rem] top-[1.9rem]"
                />
              ) : (
                <FiEye
                  onClick={(e: any) => {
                    e.preventDefault();
                    setshowConfirmNewPass(!showConfirmNewPass);
                  }}
                  size="1.3em"
                  className="ml-1 text-black 
              absolute translate-x-[24rem] top-[1.9rem]"
                />
              )}
            </div>
          </LabelInput>

          {errorMessage && (
            <div className="flex mt-1">
              <CgDanger className="w-4 h-5 text-red-500" />
              <p className="text-red-500 text-sm">&nbsp; {errorMessage}</p>
            </div>
          )}

          <div className="mt-5">
            <Button value="Update" type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
