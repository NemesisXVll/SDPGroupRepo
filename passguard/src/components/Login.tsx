import React, { useEffect, useRef, useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import { login } from "../utils/authService"; // Adjust the import path as needed
import { useLocation, useNavigate } from "react-router-dom";
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";
import { FaCheckCircle } from "react-icons/fa";
import { Modal, ModalHeader, Toast } from "flowbite-react";
import Captcha from "./Captcha/Captcha";
import { HiCheck, HiX } from "react-icons/hi";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>("");
  const [successFulUserToast, setSuccessFulUserToast] =
    useState<boolean>(false);
  const [loginTries, setLoginTries] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.state?.fromSecurityQuestion) {
      setSuccessFulUserToast(true);
    }
  }, []);

  setTimeout(() => {
    setSuccessFulUserToast(false);
  }, 3000);

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    const data = JSON.parse(
      JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
    );
    const { email, password } = data;
    // Call the login function from authService
    const user = await login({ email, password });
    if (loginTries >= 2 && !user) {
      setOpenModal(true);
      setLoginTries(-1);
    }
    if (user) {
      console.log("User logged in");
      navigate("/otp", { state: { user } });
    } else {
      console.log("Login failed");
      setLoginTries((loginTries) => loginTries + 1);
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  function handleForgotPassword(): void {
    navigate("/forgot-password", {});
  }

  function handleModals(): void {
    setOpenModal(false);
  }

  function handleCreateAccount(): void {
    navigate("/signup", {});
  }

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File Changed");
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.name.endsWith(".db")) {
        new Promise((_resolve) => {
          window.ipcRenderer.send("importDBRequest", file.path);
          window.ipcRenderer.once("importDBResponse", (_event, arg) => {
            const parsedData = JSON.parse(arg);
            if (parsedData) {
              setOpenSuccessModal(true);
            } else {
              console.log("Import Failed");
            }
          });
        });
      } else {
        setOpenErrorModal(true);
        console.log("Invalid file type");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src={loginImg}
            alt="Login visual"
          />
        </div>

        {openModal ? (
          <Captcha closeModal={handleModals} modalVal={openModal}></Captcha>
        ) : (
          ""
        )}
        <div className="bg-gray-100 flex flex-col justify-center">
          <form
            className="max-w-[400px] min-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex items-center justify-center flex-col">
              <div className="flex">
                <h2 className="text-4xl text-center py-2 font-bold font-nunito">
                  👋 Welcome&nbsp;
                </h2>
                <h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
                  back&nbsp;
                </h2>
                <h2 className="text-4xl text-center py-2 font-bold font-nunito">
                  !
                </h2>
              </div>

              <p className="text-sm text-gray-600 font-nunito">
                Enter your credential to login
              </p>
            </div>

            <LabelInput
              type="text"
              required={true}
              value={email}
              label="Email"
              id="email"
              placeholder=""
            ></LabelInput>

            <LabelInput
              type={showPassword ? "text" : "password"}
              value={password}
              required={true}
              label="Password"
              id="password"
              placeholder=""
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
              <div className="flex mt-1">
                <CgDanger className="w-4 h-5 text-red-500" />
                <p className="text-red-500 text-sm">&nbsp; {errorMessage}</p>
              </div>
            )}

            <div className="mt-2">
              <a
                onClick={handleForgotPassword}
                href="#"
                className="text-indigo-600 text-sm hover:text-indigo-500 font-nunito font-semibold"
              >
                Forgot Password?
              </a>
            </div>

            <div className="mt-3">
              <Button value="Login" type="submit">
                Login
              </Button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-4 font-normal font-nunito">
              Don't have an account?
              <a
                onClick={handleCreateAccount}
                href="#"
                className="text-indigo-600 text-sm hover:text-indigo-500  font-nunito font-semibold"
              >
                &nbsp; Create an account
              </a>
            </p>

            <p className="text-center text-gray-600 text-sm mt-1 font-normal font-nunito">
              Do you want to import your credentials?
              <a
                onClick={handleImportClick}
                className="text-indigo-600 text-sm hover:text-indigo-500 hover:cursor-pointer font-normal font-nunito cursor-default font-semibold"
              >
                &nbsp; Import
              </a>
              <input
                type="file"
                accept=".db"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </p>

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
                <h1 className="flex justify-center">
                  Import Completed Successfully
                </h1>
              </Modal.Body>
              <div className="mx-6 my-4">
                <Button
                  value="Login"
                  onClick={() => setOpenSuccessModal(false)}
                >
                  Continue
                </Button>
              </div>
            </Modal>

            <Modal
              dismissible
              show={openErrorModal}
              size="md"
              popup
              onClose={() => setOpenErrorModal(false)}
            >
              <ModalHeader></ModalHeader>
              <Modal.Body>
                <div className="flex justify-center p-3">
                  <CgDanger
                    className="
                text-5xl text-red-500
                "
                  />
                </div>
                <h1 className="flex justify-center text-center font-nunito">
                  Please upload a valid PassGuard .db file
                </h1>
              </Modal.Body>
              <div className="mx-6 my-4">
                <Button value="Login" onClick={() => setOpenErrorModal(false)}>
                  Continue
                </Button>
              </div>
            </Modal>
          </form>
          {successFulUserToast && (
            <div className="fixed bottom-4 flex justify-end w-full">
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  User Added Successfully
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
