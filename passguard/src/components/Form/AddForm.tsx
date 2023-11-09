import Button from "./Button";
import LabelInput from "./LabelInput.tsx";
import LabelDropDown from "./LabelDropDown.tsx";
import PasswordStrength from "./Password.tsx";
import TopOfForm from "./TopOfForm.tsx";

function AddForm() {
  return (
    <>
      <aside className="flex flex-col h-screen origin-top-left border-l border-zinc-800 border-opacity-30">
        <TopOfForm></TopOfForm>

        <form className="box-border shadow-sm h-screen bg-neutral-100 min-w-max p-1 border-t border-zinc-800 border-opacity-30 rounded-br-3xl">
          <LabelInput
            type="text"
            required
            value="Credential Title"
            id="credential-title"
            onChange="handleOnChange"
            placeholder="main x account"
          ></LabelInput>

          <LabelDropDown
            type="text"
            id="service-name"
            list="serviceNames"
            placeholder="X (Dropdown list and custom)"
            value="Service Name"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelDropDown
            type="text"
            id="service-type"
            list="serviceTypes"
            placeholder="Social Media (Dropdown list and custom)"
            value="Service Type"
            onChange="handleOnChange"
          ></LabelDropDown>

          <LabelInput
            type="text"
            required
            value="Username / Email"
            id="user-name"
            onChange="handleOnChange"
            placeholder="abc@123.com"
          ></LabelInput>

          <PasswordStrength
            type="password"
            value="Password"
            id="password"
          ></PasswordStrength>

          <div className="generatePasswordBTN flex place-content-center justify-end mt-2">
            {/* <button className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold rounded-full p-2">
            <img src={keyLogo} alt="" />
            Generate Password
          </button> */}

            <Button value="Generate Password">Generate Password</Button>
          </div>

          <LabelInput
            type="url"
            value="Login Page URL"
            id="login-page-url"
            onChange="handleOnChange"
            placeholder="https://www.x.com/login"
          ></LabelInput>

          <div className="cancelAndSaveBTN flex mt-10 justify-evenly pb-2 ">
            {/* <button
            type="submit"
            className="bg-gray-950 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full w-32"
          >
            Cancel
          </button> */}
            <Button value="Cancel">Cancel</Button>
            {/* <button
            type="reset"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
          >
            Save
          </button> */}
            <Button value="Save">Save</Button>
          </div>
        </form>
      </aside>
    </>
  );
}

export default AddForm;
