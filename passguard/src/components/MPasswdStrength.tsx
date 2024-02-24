import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Test = {
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

const Test = (props: Test) => {
  const [password, setPassword] = useState(props.value ? props.value : "");
  const [score, setScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const testingPasswordStrength = (password: string) => {
    const atLeastMinimumLength = (password: string) =>
      new RegExp(/(?=.{8,})/).test(password);
    const atLeastOneUppercaseLetter = (password: string) =>
      new RegExp(/(?=.*?[A-Z])/).test(password);
    const atLeastOneLowercaseLetter = (password: string) =>
      new RegExp(/(?=.*?[a-z])/).test(password);
    const atLeastOneNumber = (password: string) =>
      new RegExp(/(?=.*?[0-9])/).test(password);
    const atLeastOneSpecialChar = (password: string) =>
      new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);
    if (!atLeastMinimumLength(password)) {
      return 0;
    }
    let strengthCount = 0;
    if (atLeastOneUppercaseLetter(password)) {
      strengthCount++;
    }
    if (atLeastOneLowercaseLetter(password)) {
      strengthCount++;
    }
    if (atLeastOneNumber(password)) {
      strengthCount++;
    }
    if (atLeastOneSpecialChar(password)) {
      strengthCount++;
    }
    if (strengthCount === 4) {
      return strengthCount;
    }
    return strengthCount;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = testingPasswordStrength(newPassword);
    setScore(result);
    props.onChange ? props.onChange(e) : "";
  };

  return (
    <>
      <div className="mt-1 relative border-gray-300">
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

        <label
          htmlFor={props.id}
          className="p-1 mt-4 absolute left-1 -top-6 text-gray-600 text-base peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-blue-600 transition-all font-normal font-['Nunito']"
        >
          {props.label}
        </label>

        <div className="grid grid-rows-2 grid-cols-2 pr-1">
          {showPassword ? (
            <FiEyeOff
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black
              absolute translate-x-[21rem] top-[2rem]"
            />
          ) : (
            <FiEye
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black
              absolute translate-x-[21rem] top-[2rem]"
            />
          )}
        </div>
      </div>

      <div className="text-base text-gray-600 pl-2 mt-1">
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

      <div className="-mx-1 pl-1 w-full">
        <div className="px-1 grid grid-cols-4 gap-1">
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
    </>
  );
};

export default Test;
