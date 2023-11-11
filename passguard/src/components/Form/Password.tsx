import React, { useState } from "react";
import zxcvbn from "zxcvbn"; // A library for estimating password strength
import infoLogo from "../../assets/icons/form/info.svg";
import eyeLogo from "../../assets/icons/form/eye.svg";
import clipboardLogo from "../../assets/icons/form/clipboard.svg";

type PasswordProps = {
  type?: string;
  value?: string;
  hidden?: boolean;
  id?: string;
  placeholder?: string;
};

const PasswordStrength = (props: PasswordProps) => {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Use the zxcvbn library to estimate the password strength
    const result = zxcvbn(newPassword);
    setScore(result.score);

    console.log(score);

    setFeedback(result.feedback.suggestions.join(" "));
  };

  return (
    <div className="mb-6">
      <div className="mb-6 flex mt-1 relative hover:text-blue-300  border-b-2 border-gray-300">
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          onChange={handlePasswordChange}
          placeholder="*************"
          autoComplete={props.value}
          className="pl-2 mt-5 peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
        />
        <input type="hidden" name="isWeak" value={(score === 0 || score === 1) ? "true" : "false"} />

        <label
          htmlFor={props.id}
          className="p-1 mt-2 absolute left-1 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 transition-all"
        >
          {props.value}
        </label>

        <div className="grid grid-rows-2 grid-cols-2 pr-1">
          <img
            src={infoLogo}
            alt="info.png"
            className="ml-4 col-start-2 w-3 h-6 dark:text-black font-bold bg-neutral-100"
          />
          <img
            src={eyeLogo}
            alt="eye.png"
            className="w-6 h-6 ml-1 dark:text-black font-bold"
          />
          <img
            src={clipboardLogo}
            alt="clipboard.png"
            className="w-6 h-6 ml-1 pb-1 text-gray-800 dark:text-black font-bold border-none outline-none"
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-2">
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
      {feedback && (
        <li className="text-xs text-gray-500 mt-1 w-80">{feedback}</li>
      )}

      <div className="-mx-1">
        <div className="w-96 px-1 grid grid-cols-5 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 mt-2 rounded-xl transition-colors ${
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
