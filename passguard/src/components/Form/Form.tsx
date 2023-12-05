import Button from "./Button.tsx";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";
import { useState } from "react";
import CredentialService from "../../utils/credentialService.ts";

const credentialService = new CredentialService();

type FormProps = {
  formSubmitted: () => void;
  onBTNClick: (showForm: boolean) => void;
  editable?: boolean;
  credentialObj?: {
    credentialId: string;
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

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    if (props.credentialObj?.title) {
      credentialService.updateCredential(
        props.credentialObj.credentialId,
        formData
      );
    } else {
      console.log("create");
      credentialService.createCredential(formData);
    }
    setFormValues(!formValues);
    props.formSubmitted();
    props.onBTNClick(false);
  };

  return (
    <>
      <aside
        className={`items-center flex flex-col border-l border-t  border-opacity-30 overflow-x-hidden overflow-hidden h-screen`}
      >
        <TopOfForm></TopOfForm>

        <form
          onSubmit={handleSubmitForm}
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
              <Button value="Update" type="submit">
                {props.editable ? "Update" : "Edit"}
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
