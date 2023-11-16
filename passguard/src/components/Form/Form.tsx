import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
// import Credential from "../../../model/Credential.ts";
import clipboardLogo from "../../assets/icons/form/clipboard.svg";
import link from "../../assets/icons/form/externallink.svg";
import { useState } from "react";

// import UserManagementService from "../../../model/repository/UserManagementService.js";

const handleSubmit = (e: any) => {
  e.preventDefault();
  const data = new FormData(e.target);
  /*Here u should do something like this to not get actual password value.
  const password = data.get('password');
  const hashedPassword = /* perform your encryption or hashing here;
  Replace the original password with the hashed version
  data.set('password', hashedPassword);
  */
  data.set(
    "loginPageUrl",
    data.get("loginPageUrl") === "" ? "" : "https://" + data.get("loginPageUrl")
  );
  const credentialObj = JSON.parse(
    JSON.stringify(Object.fromEntries(data.entries()))
  );
  // const credential = new Credential(credentialObj);
  // console.log(credential);
  // const userManagementService = new UserManagementService();
  // userManagementService.createCredential(credential);
};


function Form() {
  const [showForm, setShowForm] = useState(false);

  const handleCancelBTN = (e: any) => {
    e.preventDefault();
    setShowForm(true);
  };
  return (
    <>
      <aside
        className={`items-center flex flex-col border-l border-t  border-opacity-30 overflow-x-hidden overflow-hidden min-w-fit ${
          showForm ? "hidden" : ""
        }`}
      >
        <TopOfForm></TopOfForm>

        <form
          onSubmit={handleSubmit}
          className=" flex-col p-3 border-t border-opacity-30"
        >
          <LabelInput
            type="text"
            value="Credential Title"
            id="credentialTitle"
            onChange="handleOnChange"
            placeholder="main x account"
          ></LabelInput>

          <LabelDropDown
            type="text"
            id="serviceName"
            list="serviceNames"
            placeholder="X (Dropdown list and custom)"
            value="Service Name"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelDropDown
            type="text"
            id="serviceType"
            list="serviceTypes"
            placeholder="Social Media (Dropdown list and custom)"
            value="Service Type"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelInput
            type="text"
            value="Username / Email"
            id="userName"
            onChange="handleOnChange"
            placeholder="abc@123.com"
          >
            <img
              src={clipboardLogo}
              alt="clipboard.png"
              className="absolute translate-x-60 top-8 w-4 h-4"
            />
          </LabelInput>

          <PasswordStrength
            type="password"
            value="Password"
            id="password"
          ></PasswordStrength>

          <LabelInput
            type="text"
            value="Login Page URL"
            id="loginPageUrl"
            onChange="handleOnChange"
            placeholder="https://www.x.com/login"
          >
            <img
              src={link}
              alt="link.png"
              className="absolute translate-x-60 top-8"
            />
          </LabelInput>

          <div className="flex mt-16 justify-between px-1">
            <Button value="Cancel" onClick={handleCancelBTN}>
              Cancel
            </Button>
            <Button value="Save" type="submit">
              Save
            </Button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default Form;
