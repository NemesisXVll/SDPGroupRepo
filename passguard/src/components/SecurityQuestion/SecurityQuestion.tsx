import React, { useEffect, useState } from "react";
import loginImg from "../../assets/icons/common/appLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Form/Button";
import { FcPrevious } from "react-icons/fc";
import { SignUp } from "../../utils/authService";
import { Modal, ModalHeader } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { CiCircleChevLeft } from "react-icons/ci";
import { AiTwotoneMail } from "react-icons/ai";
import LabelInput from "../Form/LabelInput";
import UserService from "../../utils/userService";

const userService = new UserService();

type SecurityQuestionProps = {
  openModal: any;
  closeModal?: () => void;
  fromLoc?: string;
};

const SecurityQuestion = (props: SecurityQuestionProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(
    props.openModal
  );
  const [showSecQuestion, setShowSecQuestion] = useState<boolean>(true);
  const [showNewEmail, setShowNewEmail] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  async function handleOnClick(event: any): Promise<void> {
    event.preventDefault();

    if (
      props.fromLoc === "forgetPassEmailOTP" ||
      props.fromLoc === "forgetPassSMSOTP"
    ) {
      navigate("/new-password", { state: { user, fromForgetPass: true } });
    }

    if (location.pathname === "/otp") {
      const signUpResult = await SignUp({
        firstName: user.state.firstName,
        lastName: user.state.lastName,
        email: user.state.email,
        masterPassword: user.state.password,
        confirmPassword: user.state.confirmPassword,
        picture: user.state.picture,
      });
      if (signUpResult) {
        setOpenSuccessModal(true);
      } else {
        console.log("Sign up failed");
      }
      navigate("/login", { state: { fromSecurityQuestion: true } });
    }

    if (location.pathname === "/settings") {
      setShowSecQuestion(false);
      setShowNewEmail(true);
    }
  }

  async function handleSubmitNewEmail(event: any): Promise<void> {
    event.preventDefault();

    await userService.getUserDataById(user.userId).then((res: any) => {
      navigate("/otp", {
        state: {
          user: {
            id: user.userId,
            data: res,
            email: email,
            masterPassword: user.masterPassword,
            salt: user.salt,
          },
          fromSettings: true,
        },
      });
    });
  }

  return (
    <>
      <Modal
        show={openSuccessModal}
        size="lg"
        popup
        onClose={() => {
          if (props.closeModal) {
            props.closeModal();
          }
          setShowSecQuestion(true);
          setShowNewEmail(false);
        }}
      >
        {location.pathname === "/settings" && <ModalHeader></ModalHeader>}

        {showSecQuestion &&
          (location.pathname === "/otp" ||
            location.pathname === "/settings" ||
            location.pathname === "/sms") && (
            <div className="">
              <form className="w-full mx-auto p-4 shadow-md">
                <div className="flex items-center justify-center">
                  <h2 className="text-4xl text-center py-2 font-bold font-nunito">
                    📝 Security
                  </h2>
                  <h2 className="text-4xl text-center py-2 font-bold font-nunito text-yellow-400">
                    Question&nbsp;
                  </h2>
                </div>

                {/* Security Questions */}
                <div className="mt-4">
                  <select className="w-full p-2 border rounded mb-2 text-sm">
                    <option id="Q1">
                      name of a college you applied to but didn’t attend?
                    </option>
                    <option id="Q2">
                      {" "}
                      What was the name of your first stuffed toy?
                    </option>
                    <option id="Q3">
                      Where was the destination of your most memorable school
                      field trip?
                    </option>
                  </select>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-4 "
                    placeholder="Your answer"
                    id="answer1"
                  />

                  <select className="w-full p-2 border rounded mb-2 text-sm">
                    <option id="Q4">
                      What was your maths teacher's surname in your 8th year of
                      school?
                    </option>
                    <option id="Q5">
                      name of the first school you remember attending?
                    </option>
                    <option id="Q6">
                      What was your driving instructor's first name?
                    </option>
                  </select>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Your answer"
                    id="answer2"
                  />
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
          )}

        {showNewEmail && (
          <div className="flex flex-col justify-center pb-3">
            <form
              className="max-w-[400px] w-full mx-auto  p-4 shadow-md"
              onSubmit={handleSubmitNewEmail} // Prevent form submission
            >
              <div className="flex justify-center items-center">
                <AiTwotoneMail className="text-4xl" />
                <div className="flex items-center justify-center">
                  <h2 className="text-3xl text-center pl-2 py-2 font-bold font-nunito">
                    Enter your new&nbsp;
                  </h2>
                  <h2 className="text-3xl text-center py-2 font-bold font-nunito text-yellow-400">
                    email&nbsp;
                  </h2>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                We will send you a verification code to verify your email.
              </p>
              <div className="mt-4">
                <LabelInput
                  type="text"
                  value={email}
                  required={true}
                  label="Email"
                  id="email"
                  placeholder=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></LabelInput>
              </div>

              <div className="mt-10">
                <Button type="submit" value="sendVerification">
                  Send verification code
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      {/* <Modal
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
          <Button value="Login" onClick={() => navigate("/login", {})}>
            Go To Login
          </Button>
        </div>
      </Modal> */}
    </>
  );
};

export default SecurityQuestion;
