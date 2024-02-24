import React, { useRef, useState } from "react";
import zxcvbn from "zxcvbn"; // A library for estimating password strength
import infoLogo from "../../assets/icons/form/info.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import Button from "./Button";
import GeneratePassword from "../GenPass";

type PasswordProps = {
  type?: string;
  value?: string;
  required?: boolean;
  hidden?: boolean;
  id?: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  viewOnly?: boolean;
  name?: string;
};

const PasswordStrength = (props: PasswordProps) => {
  const [password, setPassword] = useState(props.value ? props.value : "");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Use the zxcvbn library to estimate the password strength
    const result = zxcvbn(newPassword);
    setScore(result.score);

    setFeedback(result.feedback.suggestions.join(" "));

    props.onChange ? props.onChange(e) : "";
  };

  const handleGeneratePasswordBTN = (e: any) => {
    // e.preventDefault();
  };

  return (
    <div className="">
      <div className="mb-3 flex mt-1 relative hover:text-blue-300">
        <input
          readOnly={props.viewOnly}
          type={showPassword ? "text" : "password"}
          name={props.id}
          id={props.id}
          required={props.required}
          value={password}
          onChange={handlePasswordChange}
          placeholder=""
          autoComplete={props.label}
          className={`mt-5 peer h-10 w-full pl-2 pr-1
           text-gray-900 placeholder-transparent text-sm
           ${props.viewOnly ? "bg-slate-100" : ""}
           rounded-lg border-2 justify-start items-start gap-14 inline-flex
           focus:outline-none
           ${
             score <= 0 && password.length > 0
               ? "border border-red-500"
               : score === 1
                 ? "border border-yellow-500"
                 : score === 2
                   ? "border border-orange-500"
                   : score === 3
                     ? "border border-lime-500"
                     : score === 4
                       ? "border border-green-500"
                       : "focus:border-blue-600"
           }
           `}
        />

        <input
          type="hidden"
          name="isWeak"
          value={score === 0 || score === 1 ? "true" : "false"}
        />

        <label
          htmlFor={props.id}
          className="p-1 mt-4 absolute left-1 -top-6 text-gray-600 text-base peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-blue-600 transition-all font-normal font-['Nunito']"
        >
          {props.label}
        </label>

        <div className="grid grid-rows-2 grid-cols-2 pr-1">
          <img
            src={infoLogo}
            alt="info.png"
            className="ml-4 col-start-2 w-3 h-6"
          />

          {showPassword ? (
            <FiEyeOff
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black"
            />
          ) : (
            <FiEye
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black"
            />
          )}
          <HiOutlineClipboardDocument
            size="1.3em"
            className="ml-1 text-black"
            onClick={() => {
              {
                props.value
                  ? navigator.clipboard.writeText(props.value)
                  : navigator.clipboard.writeText(password);
              }
            }}
          />
        </div>
      </div>

      {/* <div className="generatePasswordBTN flex place-content-center justify-end mt-2">

        <Button type="button" value="Generate Password">
          Generate Password
        </Button>
      </div> */}

      <button className="btn btn-danger" onClick={() => setOpen(true)}>
        Generate password
      </button>
      <GeneratePassword open={open} onClose={() => setOpen(false)}>
        {" "}
      </GeneratePassword>

      <div className="text-sm text-gray-600 pl-2">
        Status:{" "}
        <span
          className={`${
            score <= 0
              ? "text-red-500"
              : score === 1
                ? "text-yellow-500"
                : score === 2
                  ? "text-orange-500"
                  : score === 3
                    ? "text-lime-500"
                    : score === 4
                      ? "text-green-500"
                      : ""
          }`}
        >
          {score <= 0 && password.length > 0
            ? "Very Weak"
            : score === 1
              ? "Weak"
              : score === 2
                ? "Moderate"
                : score === 3
                  ? "Strong"
                  : score === 4
                    ? "Very Strong"
                    : ""}
        </span>
      </div>
      {/* {feedback && <li className="text-xs text-gray-500 mt-1 w-16">{feedback}</li>} */}

      <div className="-mx-1 pl-1 w-full">
        <div className="px-1 grid grid-cols-5 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 mt-1 rounded-xl transition-colors ${
                i < score
                  ? score <= 0
                    ? "bg-red-500"
                    : score === 1
                      ? "bg-yellow-500"
                      : score === 2
                        ? "bg-orange-500"
                        : score === 3
                          ? "bg-lime-500"
                          : score === 4
                            ? "bg-green-500"
                            : "bg-red-800"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
