import { useState } from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";

type LabelInputProps = {
  type?: string;
  required?: boolean;
  label?: string;
  value?: string;
  onChange?: string;
  id?: string;
  placeholder?: string;
  children?: React.ReactNode;
  viewOnly?: boolean;
};
const LabelInput = (props: LabelInputProps) => {
  const [value, setValue] = useState(props.value ? props.value : "");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="mt-1 relative border-gray-300">
      <input
        id={props.id}
        name={props.id}
        value={value}
        required={props.id === "credentialTitle" ? true : false}
        type={props.type}
        className={`pl-2 pr-7 mt-5 peer h-10 w-full text-gray-900 text-xs bg-opacity-50
        ${props.viewOnly ? "bg-slate-100" : ""}
        rounded-lg justify-start items-start gap-14 inline-flex 
         placeholder-transparent focus:outline-none focus:border-blue-600 border-2`}
        placeholder={props.placeholder}
        onChange={handleOnChange}
        readOnly={props.viewOnly}
      />
      <label
        htmlFor={props.id}
        className="p-1 mt-4 absolute left-1 -top-6 font-normal font-['Nunito']
         text-gray-800 text-md peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
          peer-focus:-top-6 peer-focus:text-blue-600 transition-all"
      >
        {props.label}
      </label>
      {props.children ? (
        props.children
      ) : props.id === "userName" ? (
        <HiOutlineClipboardDocument
          size="1.3em"
          className="absolute translate-x-60 top-8 text-black"
          onClick={() => {
            {
              props.value
                ? navigator.clipboard.writeText(props.value)
                : navigator.clipboard.writeText(value);
            }
          }}
        />
      ) : props.id === "loginPageUrl" ? (
        <HiOutlineExternalLink
          size="1.3em"
          className="absolute translate-x-60 top-8 text-black"
          onClick={() => {
            props.value
              ? window.open(props.value, "MyWindow", "width=1200 ,height=800 ")
              : "";
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LabelInput;
