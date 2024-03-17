import React, { useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUp } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";
import MPasswdStrength from "./MPasswdStrength";
import { FileInput, Label, Modal, ModalHeader, Tooltip } from "flowbite-react";
import { FcPrevious } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";
import { CgDanger } from "react-icons/cg";
import zxcvbn from "zxcvbn";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showConfirmPassword: boolean;
}

interface PasswordState {
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
  length: boolean;
  match: boolean;
  repeatedChar: boolean;
  sequentialChar: boolean;
  contextSpecific: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showConfirmPassword: false,
  });
  const [passwordState, setPasswordState] = useState<PasswordState>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    length: false,
    match: false,
    repeatedChar: false,
    sequentialChar: false,
    contextSpecific: false,
  });

  const toggleConfirmPasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  const handleSignUpClick = async (event: any) => {
    event.preventDefault();
    const state = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );

    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (
      !lettersOnlyRegex.test(state.firstName) ||
      !lettersOnlyRegex.test(state.lastName)
    ) {
      setErrorMessage("First and Last Name must contain only letters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (state.password !== state.confirmPassword) {
      setErrorMessage("Passwords do not match.");
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

    if (passwordState.contextSpecific) {
      setErrorMessage(
        "Password cannot contain your first name, last name, or email."
      );
      return;
    }

    if (passwordState.repeatedChar) {
      setErrorMessage(
        "Password cannot contain repeated characters (e.g. aaaa)."
      );
      return;
    }

    if (passwordState.sequentialChar) {
      setErrorMessage(
        "Password cannot contain sequential characters (e.g. 1234)."
      );
      return;
    }

    console.log(state.email);
    navigate("/otp", {
      state: {
        user: { email: state.email, firstName: state.firstName },
        fromSignup: true,
      },
    });

    // const signUpResult = SignUp({
    //   firstName: state.firstName,
    //   lastName: state.lastName,
    //   email: state.email,
    //   masterPassword: state.password,
    //   confirmPassword: state.confirmPassword,
    //   salt: "",
    //   picture: "",
    // });

    // if (await signUpResult) {
    //   setOpenSuccessModal(true);
    // } else {
    //   setErrorMessage("Sign up failed. Please try again.");
    // }
  };

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    showConfirmPassword,
  } = state;

  function handleLoginClick(): void {
    navigate("/login", { replace: true });
  }

  function handleOnPasswordChange(event: any): void {
    const newPassword = event.target.value;
    setState((prevState) => ({
      ...prevState,
      password: newPassword,
    }));

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;

    const upperCase = upperCaseRegex.test(newPassword);
    const lowerCase = lowerCaseRegex.test(newPassword);
    const number = numberRegex.test(newPassword);
    const specialChar = specialCharRegex.test(newPassword);
    const length = newPassword.length >= 8;
    const match = confirmPassword === newPassword;
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

    if (firstName !== "" && lastName !== "" && email !== "") {
      if (
        newPassword.toLowerCase().includes(firstName.toLowerCase()) ||
        newPassword.toLowerCase().includes(lastName.toLowerCase()) ||
        newPassword.toLowerCase().includes(email.toLowerCase())
      ) {
        contextSpecific = true;
      }
    }

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
      match,
      repeatedChar,
      sequentialChar,
      contextSpecific,
    });

    console.log(passwordState);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Signup visual"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] min-w-[450px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={handleSignUpClick}
        >
          <FcPrevious
            className="w-8 h-8 hover:text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login", {})}
          ></FcPrevious>
          <div className="flex items-center justify-center">
            <h2 className="text-4xl text-center py-2 font-bold font-nunito">
              📝 Sign
            </h2>
            <h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
              Up&nbsp;
            </h2>
          </div>

          {/* First Name Field */}
          <LabelInput
            required={true}
            type="text"
            value={firstName}
            label="First Name"
            id="firstName"
            placeholder=""
            onChange={(event) => {
              setState((prevState) => ({
                ...prevState,
                firstName: event.target.value,
              }));
            }}
          ></LabelInput>

          {/* Last Name Field */}
          <LabelInput
            required={true}
            type="text"
            value={lastName}
            label="Last Name"
            id="lastName"
            placeholder=""
            onChange={(event) => {
              setState((prevState) => ({
                ...prevState,
                lastName: event.target.value,
              }));
            }}
          ></LabelInput>

          {/* Email Field */}
          <LabelInput
            required={true}
            type="email"
            value={email}
            label="Email"
            id="email"
            placeholder=""
            onChange={(event) => {
              setState((prevState) => ({
                ...prevState,
                email: event.target.value,
              }));
            }}
          ></LabelInput>

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
                    {passwordState.length ? (
                      <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                    ) : (
                      <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                    )}
                    A longer password (min. 8 chars.)
                  </li>
                  <li className="mt-1 flex items-center">
                    {passwordState.number ? (
                      <FcCheckmark className="me-2 h-5 w-5 text-green-400 dark:text-green-500" />
                    ) : (
                      <HiXMark className="me-2 h-5 w-5 text-gray-300 dark:text-gray-400" />
                    )}
                    A number (e.g. 123)
                  </li>
                </ul>
              </div>
            }
          >
            {/* Password Field */}
            <div className="w-[26.2rem]">
              <MPasswdStrength
                required={true}
                value={password}
                strength={passwordStrength}
                label="Password"
                id="password"
                placeholder=""
                onChange={handleOnPasswordChange}
              ></MPasswdStrength>
            </div>
          </Tooltip>

          {/* Confirm Password Field */}
          <LabelInput
            required={true}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            label="Confirm Password"
            id="confirmPassword"
            placeholder=""
          >
            <div className="">
              {showConfirmPassword ? (
                <FiEyeOff
                  onClick={toggleConfirmPasswordVisibility}
                  size="1.3em"
                  className="ml-1 text-black
                  absolute translate-x-[24rem] top-[1.9rem]"
                />
              ) : (
                <FiEye
                  onClick={toggleConfirmPasswordVisibility}
                  size="1.3em"
                  className="ml-1 text-black
              absolute translate-x-[24rem] top-[1.9rem]"
                />
              )}
            </div>
          </LabelInput>

          <div className="mb-1 block mt-2">
            <label
              htmlFor={"path"}
              className="p-1 font-normal font-['Nunito']
         text-gray-800 text-base peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
          peer-focus: peer-focus:text-blue-600 transition-all"
            >
              Upload Profile Picture
            </label>
          </div>
          <FileInput
            accept="image/jpeg, image/png"
            id="path"
            className="font-nunito"
          />

          {errorMessage && (
            <div className="flex mt-1">
              <CgDanger className="w-4 h-5 text-red-500" />
              <p className="text-red-500 text-sm">&nbsp; {errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-7">
            <Button type="submit" value="createAccount">
              Continue
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8 font-normal font-['Nunito']">
            Already have an account?
            <a
              onClick={handleLoginClick}
              href="#"
              className="text-indigo-600 text-sm hover:text-indigo-500 font-normal font-['Nunito']"
            >
              &nbsp; Login
            </a>
          </p>
        </form>
      </div>
      <Modal
        dismissible
        show={openSuccessModal}
        size="md"
        popup
        onClose={() => setOpenSuccessModal(false)}
      >
        <ModalHeader></ModalHeader>
        <Modal.Body>
          <div className="flex justify-center p-3">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h1 className="flex justify-center">Acount Created Successfully</h1>
        </Modal.Body>
        <div className="mx-6 my-4">
          <Button onClick={() => navigate("/login", {})}>Go To Login</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
