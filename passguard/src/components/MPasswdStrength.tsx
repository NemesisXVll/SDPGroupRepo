import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import zxcvbn from "zxcvbn";

type MPasswordStrengthProps = {
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
  strength?: number;
};

const MPasswordStrength = (props: MPasswordStrengthProps) => {
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

  // function displayStrength(c:any) {
  //   var f = "Very Weak";
  //   var e = "e40808";
  //   if (c == 0) {
  //     f = "Very Weak";
  //   }
  //   if (c == 1) {
  //     f = "Weak";
  //     e = "e40808";
  //   }
  //   if (c == 2) {
  //     f = "Medium";
  //     e = "ffd800";
  //   }
  //   if (c == 3) {
  //     f = "Strong";
  //     e = "2cb117 ";
  //   }
  //   if (c == 4) {
  //     f = "Very Strong";
  //     e = "2cb117";
  //   }
  //   if (c == 5) {
  //     f = "No Password";
  //     e = "D0D0D0";
  //   }
  // }

  // function displayWeakExplanation(matchSequence : any, strength: any) {
  //   var strengthtext = false;
  //   switch (strength) {
  //     case 0:
  //       strengthtext = " very weak ";
  //       break;
  //     case 1:
  //       strengthtext = " weak ";
  //       break;
  //     case 2:
  //       strengthtext = " of medium strength ";
  //       break;
  //   }
  //   var matchSize = matchSequence.length;
  //   var pattern = false;
  //   var dictionary = false;
  //   var word = false;
  //   var matchType = false;
  //   var containsWord = "contains";
  //   var result = new Array();
  //   for (var i = 0; i < matchSize; i++) {
  //     pattern = matchSequence[i].pattern;
  //     thisRes = false;
  //     switch (pattern) {
  //       case "dictionary":
  //         dictionary = dictionaryType(matchSequence[i]);
  //         thisType = dictionary["type"];
  //         thisWord = dictionary["word"];
  //         if (!result[thisType]) {
  //           result[thisType] = new Array();
  //         }
  //         //result[thisType]["count"]++;
  //         result[thisType][thisWord] = true;
  //         break;
  //       case "spatial":
  //         if (matchSequence[i]["graph"] != "dvorak") {
  //           if (
  //             !result[
  //               "combination of characters that are close together on the keyboard"
  //             ]
  //           ) {
  //             result[
  //               "combination of characters that are close together on the keyboard"
  //             ] = new Array();
  //           }
  //           thisWord = matchSequence[i]["matched_word"];
  //           result[
  //             "combination of characters that are close together on the keyboard"
  //           ][thisWord] = true;
  //         }
  //         break;
  //       case "sequence":
  //         if (!result["sequence of characters"]) {
  //           result["sequence of characters"] = new Array();
  //         }
  //         thisWord = matchSequence[i]["matched_word"];
  //         result["sequence of characters"][thisWord] = true;
  //         break;
  //     }
  //   }
  //   //document.getElementById("explanation").innerHTML = dump(result);
  //   //return;
  //   var hasWords = false;
  //   if (matchSize > 0) {
  //     if (matchSize === 1) {
  //       explanation = "Your password is " + strengthtext + " because it is ";
  //     } else {
  //       explanation =
  //         "Your password is " + strengthtext + " because it contains ";
  //     }
  //     matchSize = 0;
  //     for (h in result) {
  //       matchSize++;
  //     }
  //     var andString = " ";
  //     var commaString = ", ";
  //     var thisCount = 0;
  //     //gathered all information, now to translate into words
  //     for (matchType in result) {
  //       thisElem = result[matchType];
  //       count = 0;
  //       for (h in thisElem) {
  //         count++;
  //       }
  //       thisCount++;
  //       if (thisCount >= matchSize && matchSize != 1) {
  //         andString = " and ";
  //       }
  //       if (count > 1) {
  //         explanation += andString + count + " " + matchType + "s";
  //         hasWords = true;
  //       } else {
  //         explanation += andString + " a " + matchType;
  //         hasWords = true;
  //       }
  //       andString = ", ";
  //     }
  //     explanation += ".";
  //   }
  //   // document.getElementById("explanation").innerHTML = dump(result);
  //   document.getElementById("explanation").innerHTML = "";
  //   if (hasWords) document.getElementById("explanation").innerHTML = explanation;
  // }

  // function checkThisPassword(password: string){
  //   var checked = zxcvbn(password);
  //   var strength = checked.score;
  //   if (password == "") strength = 0;
  //   displayStrength(strength);
  //   const matchSequence = checked.sequence; // Fix: Access the 'sequence' property instead of 'match_sequence'
  //   console.log("Password Strength: ", matchSequence);
  //   return true;
  // }

  // checkThisPassword(password);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = testingPasswordStrength(newPassword);
    setScore(result);
    props.onChange ? props.onChange(e) : "";
  };

  return (
    <>
      <div className="relative border-gray-300 flex items-center ">
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
          className={`peer h-10 w-full pl-2 pr-8 
           text-gray-900 placeholder-transparent text-sm border-gray-400
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
          className="ml-1 absolute left-1 -top-6 text-gray-600 text-base peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-blue-600 transition-all font-normal font-['Nunito']"
        >
          {props.label}
        </label>

        <div className="">
          {showPassword ? (
            <FiEyeOff
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black
                  absolute translate-x-[24rem] top-[0.6rem]"
            />
          ) : (
            <FiEye
              onClick={handleShowPassword}
              size="1.3em"
              className="ml-1 text-black
              absolute translate-x-[24rem] top-[0.6rem]"
            />
          )}
        </div>
      </div>

      <div className="text-gray-600 pl-2 mt-1 text-sm font-semibold">
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

export default MPasswordStrength;
