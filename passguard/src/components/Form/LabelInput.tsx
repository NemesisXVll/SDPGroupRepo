import React, { useState } from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Tooltip } from "flowbite-react";
import redinfo from "../../assets/icons/stats/redinfo.svg";
type LabelInputProps = {
  type?: string;
  required?: boolean;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  placeholder?: string;
  children?: React.ReactNode;
  viewOnly?: boolean;
  status?: boolean;
};
const LabelInput = (props: LabelInputProps) => {
  const [value, setValue] = useState(props.value ? props.value : "");
  const [isHTTPS, setIsHTTPS] = useState(
    props.value?.includes("http") ? true : false
  );

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    props.onChange ? props.onChange(e) : "";
  };

  return (
    <div className="mt-1 relative border-gray-300 flex items-center">
      <input
        id={props.id}
        name={props.id}
        value={value}
        required={props.required}
        type={props.type}
        maxLength={props.id === "credentialTitle" ? 25 : 100}
        className={`pl-2 pr-8 mt-5 peer h-10 w-full  bg-opacity-50 border-gray-400
        ${props.viewOnly ? "bg-gray-200 text-gray-500" : "text-black"} ${props.status == false ? "border-red-500" : ""}
        rounded-lg justify-start items-start gap-14 inline-flex text-sm
         placeholder-transparent focus:outline-none focus:border-blue-600 border-2`}
        placeholder={props.placeholder}
        onChange={handleOnChange}
        readOnly={props.viewOnly}
      />
      {props.status == false ? (
        <div className="absolute top-16 flex items-center">
          <img src={redinfo} className="w-3 m-1" />
          <p className="text-red-500 text-sm">Invalid Email</p>
        </div>
      ) : (
        ""
      )}
      <label
        htmlFor={props.id}
        className="p-1 mt-4 absolute left-1 -top-6 font-normal font-['Nunito']
         text-gray-800 text-base peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
          peer-focus:-top-6 peer-focus:text-blue-600 transition-all"
      >
        {props.label}
      </label>
      {props.children ? (
        props.children
      ) : props.id === "userName" ? (
        <Tooltip content="Copied to Clipboard!" trigger="click" arrow={false}>
          <HiOutlineClipboardDocument
            size="1.3em"
            className="absolute text-black translate-x-60"
            onClick={() => {
              {
                props.value
                  ? navigator.clipboard.writeText(props.value)
                  : navigator.clipboard.writeText(value);
              }
            }}
          />
        </Tooltip>
      ) : props.id === "loginPageUrl" ? (
        <HiOutlineExternalLink
          size="1.3em"
          className="absolute text-black translate-x-60 top-7"
          onClick={() => {
            isHTTPS
              ? window.open(props.value, "MyWindow", "width=1200 ,height=800 ")
              : window.open(
                  "https://" + props.value,
                  "MyWindow",
                  "width=1200 ,height=800 "
                );
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LabelInput;
