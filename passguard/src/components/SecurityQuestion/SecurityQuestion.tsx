import React, { useEffect, useState } from "react";
import loginImg from "../../assets/icons/common/appLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Form/Button";
import { FcPrevious } from "react-icons/fc";
import { SignUp } from "../../utils/authService";
import { Modal, ModalHeader } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";

const SecurityQuestion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  async function handleOnClick(event: any): Promise<void> {
    event.preventDefault();

    const signUpResult = await SignUp({
      firstName: user.state.firstName,
      lastName: user.state.lastName,
      email: user.state.email,
      masterPassword: user.state.password,
      confirmPassword: user.state.confirmPassword,
      salt: "",
      picture: "",
    });

    console.log(signUpResult);

    if (signUpResult) {
      setOpenSuccessModal(true);
    } else {
      setErrorMessage("Sign up failed. Please try again.");
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src={loginImg}
            alt="Signup visual"
          />
        </div>
        <div className="bg-gray-100 flex flex-col justify-center">
          <form className="max-w-[400px] min-w-[450px] w-full mx-auto bg-white p-4 shadow-md">
            <FcPrevious
              className="w-8 h-8 hover:text-indigo-600 cursor-pointer"
              onClick={() => navigate("/login", {})}
            ></FcPrevious>
            <div className="flex items-center justify-center">
              <h2 className="text-4xl text-center py-2 font-bold font-nunito">
                📝 Security
              </h2>
              <h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
                Question&nbsp;
              </h2>
            </div>

            {/* Submit Button */}
            <div className="mt-7">
              <Button
                type="submit"
                onClick={handleOnClick}
                value="createAccount"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        show={openSuccessModal}
        size="md"
        popup
        onClose={() => setOpenSuccessModal(false)}
      >
        <Modal.Body className="mt-9">
          <div className="flex justify-center p-3">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h1 className="flex justify-center">Acount Created Successfully</h1>
        </Modal.Body>
        <div className="mx-6 my-4">
          <Button onClick={() => navigate("/login", {})}>Go To Login</Button>
        </div>
      </Modal>
    </>
  );
};

export default SecurityQuestion;
