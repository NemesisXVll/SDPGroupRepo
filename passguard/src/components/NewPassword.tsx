import React, { useState } from "react";
import loginImg from "../assets/icons/common/appLogo.svg"; 
import LabelInput from "./Form/LabelInput";
import Button from "./Form/Button";

import { useNavigate } from "react-router-dom";

const NewPassword: React.FC = () => {
  

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
    //  add logic to replace the password  the password
    console.log("Password updated successfully.");
    
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
          className="max-w-[400px] w-full mx-auto bg-white p-4 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-center py-6 font-bold font-['Nunito']">
            Set New Password
          </h2>

          <LabelInput
            type="password"
            required={true}
            value={newPassword}
            label="New Password"
            id="new-password"
            placeholder="Enter New Password"
            onChange={handleNewPasswordChange}
          />

          <LabelInput
            type="password"
            required={true}
            value={confirmPassword}
            label="Confirm Password"
            id="confirm-password"
            placeholder="Re-enter New Password"
            onChange={handleConfirmPasswordChange}
            

          />

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="mt-7">
            <Button value="Update Password" type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
