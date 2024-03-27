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
import { error } from "console";
import { CgDanger } from "react-icons/cg";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [firstQuestion, setFirstQuestion] = useState<string>("");
  const [secondQuestion, setSecondQuestion] = useState<string>("");
  const [firstQuestionAnswer, setFirstQuestionAnswer] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [secondQuestionAnswer, setSecondQuestionAnswer] = useState<string>("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.history.pushState(null, "", "/login");
    window.onpopstate = function () {
      window.history.pushState(null, "", "/login");
    };
  }, []);

  async function verifySecQuestionAnswers() {
    const isVerified = await userService.verifySecQuestionAnswers(
      user.userId,
      firstQuestionAnswer,
      secondQuestionAnswer
    );
    console.log(isVerified);
    setIsVerified(isVerified);
  }

  async function handleOnClick(event: any): Promise<void> {
    event.preventDefault();
    if (
      props.fromLoc === "forgetPassEmailOTP" ||
      props.fromLoc === "forgetPassSMSOTP"
    ) {
      verifySecQuestionAnswers();
      if (isVerified) {
        navigate("/new-password", { state: { user, fromForgetPass: true } });
      }
    } else if (props.fromLoc === "wipeAccount") {
      verifySecQuestionAnswers();
      console.log(JSON.parse(user.preference).forgetPassOtp);
      if (isVerified) {
        if (JSON.parse(user.preference).forgetPassOtp === "email") {
          navigate("/otp", { state: { user, wipeAccount: true } });
        } else {
          navigate("/sms", { state: { user, wipeAccount: true } });
        }
      }
    } else if (props.fromLoc === "wipeCredentials") {
      verifySecQuestionAnswers();
      console.log(JSON.parse(user.preference).forgetPassOtp);
      if (isVerified) {
        if (JSON.parse(user.preference).forgetPassOtp === "email") {
          navigate("/otp", { state: { user, wipeCredentials: true } });
        } else {
          navigate("/sms", { state: { user, wipeCredentials: true } });
        }
      }
    } else if (props.fromLoc === "wipeDocuments") {
      verifySecQuestionAnswers();
      console.log(JSON.parse(user.preference).forgetPassOtp);
      if (isVerified) {
        if (JSON.parse(user.preference).forgetPassOtp === "email") {
          navigate("/otp", { state: { user, wipeDocuments: true } });
        } else {
          navigate("/sms", { state: { user, wipeDocuments: true } });
        }
      }
    } else if (location.pathname === "/otp") {
      const signUpResult = await SignUp({
        firstName: user.state.firstName,
        lastName: user.state.lastName,
        email: user.state.email,
        masterPassword: user.state.password,
        confirmPassword: user.state.confirmPassword,
        picture: user.state.picture,
      });
      if (signUpResult) {
        const secQuestionObj = {
          firstQuestion: firstQuestion,
          firstQuestionAnswer: firstQuestionAnswer,
          secondQuestion: secondQuestion,
          secondQuestionAnswer: secondQuestionAnswer,
        };
        await userService.createQuestion(
          signUpResult.userId,
          signUpResult.salt,
          secQuestionObj
        );
        setOpenSuccessModal(true);
      } else {
        console.log("Sign up failed");
      }
      navigate("/login", { state: { fromSecurityQuestion: true } });
    }

    if (props.fromLoc === "changeEmail") {
      //Check if input of sec question is like hashed password
      setShowSecQuestion(false);
      setShowNewEmail(true);
    }
  }

  async function handleSubmitNewEmail(event: any): Promise<void> {
    event.preventDefault();

    const isEmailFound = await userService.findUserByEmail(email);

    if (isEmailFound) {
      console.log("Email found");
      setErrorMessage("Email already exists");
      return;
    }

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
                  <select
                    className="w-full p-2 border rounded mb-2 text-sm"
                    onChange={(event) => setFirstQuestion(event.target.value)}
                    name="firstQuestion"
                    id="firstQuestion-select"
                  >
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
                    onChange={(event) =>
                      setFirstQuestionAnswer(event.target.value)
                    }
                    className="w-full p-2 border rounded mb-4 "
                    placeholder="Your answer"
                    id="answer1"
                  />

                  <select
                    className="w-full p-2 border rounded mb-2 text-sm"
                    onChange={(event) => setSecondQuestion(event.target.value)}
                  >
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
                    onChange={(event) =>
                      setSecondQuestionAnswer(event.target.value)
                    }
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
          <div className="flex flex-col justify-center pb-10">
            <form
              className="max-w-[360px] w-full mx-auto"
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

              {errorMessage && (
                <div className="flex mt-1">
                  <CgDanger className="w-4 h-5 text-red-500" />
                  <p className="text-red-500 text-sm">&nbsp; {errorMessage}</p>
                </div>
              )}

              <div className="mt-7">
                <Button type="submit" value="sendVerification">
                  Send verification code
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SecurityQuestion;
