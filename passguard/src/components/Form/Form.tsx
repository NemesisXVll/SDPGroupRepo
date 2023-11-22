import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
import { useState } from "react";
import CredentialService from "../../utils/credentialService.ts";

const credentialService = new CredentialService();

function Form() {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(false);

  const handleCancelBTN = (e: any) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const handleSaveBTN = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // /*Here u should do something like this to not get actual password value.
    // const password = data.get('password');
    // const hashedPassword = /* perform your encryption or hashing here;
    // Replace the original password with the hashed version
    // data.set('password', hashedPassword);
    // */

    credentialService.createCredential(formData);

    setFormValues(!formValues);
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
          onSubmit={handleSaveBTN}
          className=" flex-col p-3 border-t border-opacity-30"
        >
          <LabelInput
            type="text"
            value="Credential Title"
            id="credentialTitle"
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <LabelDropDown
            type="text"
            id="serviceName"
            list="serviceNames"
            placeholder=""
            value="Service Name"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelDropDown
            type="text"
            id="serviceType"
            list="serviceTypes"
            placeholder=""
            value="Service Type"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelInput
            type="text"
            value="Username / Email"
            id="userName"
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <PasswordStrength
            type={showPassword ? "text" : "password"}
            value="Password"
            id="password"
          ></PasswordStrength>

          <LabelInput
            type="text"
            value="Login Page URL"
            id="loginPageUrl"
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

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
