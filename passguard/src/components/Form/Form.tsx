import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
import { useState } from "react";
import CredentialService from "../../utils/credentialService.ts";

const credentialService = new CredentialService();

type FormProps = {
  onBTNClick: (showForm: boolean) => void;
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
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(false);

  const handleCancelBTN = (e: any) => {
    e.preventDefault();
    props.onBTNClick(false);
  };

  const handleUpdateBTN = (e: any) => {
    e.preventDefault();
    console.log(e.target);
    // const formData = new FormData(e.target);
    // credentialService.updateCredential(formData);
    // setFormValues(!formValues);
    // props.onBTNClick(false);
  };

  const handleSaveBTN = async (e: any) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    console.log(formData);
    credentialService.createCredential(formData);
    setFormValues(!formValues);
    props.onBTNClick(false);
  };

  return (
    <>
      <aside
        className={`items-center flex flex-col border-l border-t  border-opacity-30 overflow-x-hidden overflow-hidden h-screen`}
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
            value={props.credentialObj ? props.credentialObj.title : ""}
            viewOnly={!props.editable}
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <LabelDropDown
            type="text"
            id="serviceName"
            value={props.credentialObj ? props.credentialObj.serviceName : ""}
            list="serviceNames"
            viewOnly={!props.editable}
            placeholder=""
            label="Service Name"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelDropDown
            type="text"
            id="serviceType"
            value={props.credentialObj ? props.credentialObj.serviceType : ""}
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
              props.credentialObj?.data
                ? JSON.parse(props.credentialObj?.data).userName
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
              props.credentialObj?.data
                ? JSON.parse(props.credentialObj?.data).password
                : ""
            }
            id="password"
          ></PasswordStrength>

          <LabelInput
            type="text"
            label="Login Page URL"
            value={props.credentialObj ? props.credentialObj.url : ""}
            id="loginPageUrl"
            viewOnly={!props.editable}
            onChange="handleOnChange"
            placeholder=""
          ></LabelInput>

          <div className="flex mt-16 justify-between px-1">
            <Button value="Cancel" onClick={handleCancelBTN}>
              Cancel
            </Button>
            {props.credentialObj?.title ? (
              <Button value="Update" type="submit" onClick={handleUpdateBTN}>
                Update
              </Button>
            ) : (
              <Button value="Save" type="submit">
                Save
              </Button>
            )}
          </div>
        </form>
      </aside>
    </>
  );
}

export default Form;
