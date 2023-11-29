import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
import { useState } from "react";
import CredentialService from "../../utils/credentialService.ts";

const credentialService = new CredentialService();

type FormProps = {
  editable?: boolean;
  credentialObj?: {
    title: string;
    serviceName: string;
    serviceType: string;
    data: string;
    url: string;
  };
};

function Form(props: FormProps) {
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
        className={`items-center flex flex-col border-l border-t  border-opacity-30 overflow-x-hidden overflow-hidden h-screen ${
          showForm ? "hidden " : ""
        }`}
      >
        <TopOfForm></TopOfForm>

        <form
          onSubmit={handleSaveBTN}
          className=" flex-col p-3 border-t border-opacity-30"
        >
          <LabelInput
            type="text"
            label="Credential Title"
            id="credentialTitle"
            value={
              props.credentialObj?.title && !props.editable
                ? props.credentialObj.title
                : ""
            }
            viewOnly={!props.editable}
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <LabelDropDown
            type="text"
            id="serviceName"
            value={
              props.credentialObj?.serviceName && !props.editable
                ? props.credentialObj.serviceName
                : ""
            }
            list="serviceNames"
            viewOnly={!props.editable}
            placeholder=""
            label="Service Name"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelDropDown
            type="text"
            id="serviceType"
            value={
              props.credentialObj?.serviceType && !props.editable
                ? props.credentialObj.serviceType
                : ""
            }
            list="serviceTypes"
            viewOnly={!props.editable}
            placeholder=""
            label="Service Type"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelInput
            type="text"
            label="Username / Email"
            value={
              props.credentialObj?.data && !props.editable
                ? JSON.parse(props.credentialObj.data).userName
                : ""
            }
            viewOnly={!props.editable}
            id="userName"
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <PasswordStrength
            type={showPassword ? "text" : "password"}
            label="Password"
            viewOnly={!props.editable}
            value={
              props.credentialObj?.data && !props.editable
                ? JSON.parse(props.credentialObj.data).password
                : ""
            }
            id="password"
          ></PasswordStrength>

          <LabelInput
            type="text"
            label="Login Page URL"
            value={
              props.credentialObj?.url && !props.editable
                ? props.credentialObj.url
                : ""
            }
            id="loginPageUrl"
            viewOnly={!props.editable}
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
