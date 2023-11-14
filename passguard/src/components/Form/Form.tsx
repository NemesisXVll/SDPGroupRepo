import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
import Credential from "../../../model/Credential.ts";
import clipboardLogo from "../../assets/icons/form/clipboard.svg";
import link from "../../assets/icons/form/externallink.svg";

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
  const credential = new Credential(credentialObj);
  console.log(credential);
  // const userManagementService = new UserManagementService();
  // userManagementService.createCredential(credential);
};

function Form() {
  return (
    <>
      <aside className="flex flex-col h-screen border-l border-zinc-800 border-opacity-30 overflow-x-hidden overflow-y-auto min-w-fit">
        <TopOfForm></TopOfForm>

        <form
          onSubmit={handleSubmit}
          className="h-full bg-neutral-100 p-1 border-t border-zinc-800 border-opacity-30 w-80"
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
              className="absolute translate-x-72 top-8 w-4 h-4"
            />
          </LabelInput>

          <PasswordStrength
            type="password"
            value="Password"
            id="password"
          ></PasswordStrength>

          <div className="generatePasswordBTN flex place-content-center justify-end mt-2">
            <Button value="Generate Password">Generate Password</Button>
          </div>

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
              className="absolute translate-x-72 top-8"
            />
          </LabelInput>

          <div className="flex mt-3 justify-between px-1">
            <Button value="Save" type="submit">
              Save
            </Button>

            <Button value="Cancel">Cancel</Button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default Form;
