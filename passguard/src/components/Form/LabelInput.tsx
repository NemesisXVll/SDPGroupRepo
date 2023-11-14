import { useState } from "react";

type LabelInputProps = {
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: string;
  id?: string;
  placeholder?: string;
  children?: React.ReactNode;
};
const LabelInput = (props: LabelInputProps) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="mt-1 relative hover:text-blue-300 border-b-2 border-gray-300">
      <input
        id={props.id}
        name={props.id}
        value={value}
        required={props.id === "credentialTitle" ? true : false}
        type={props.type}
        className="pl-2 pr-7 mt-5 peer h-10 w-full text-gray-900 bg-opacity-50
        rounded justify-start items-start gap-14 inline-flex
         placeholder-transparent focus:outline-none focus:border-blue-600"
        placeholder={props.placeholder}
        onChange={handleOnChange}
      />
      <label
        htmlFor={props.id}
        className="p-1 mt-4 absolute left-1 -top-6 font-normal font-['Nunito']
         text-gray-800 text-md peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
          peer-focus:-top-6 peer-focus:text-blue-600 transition-all"
      >
        {props.value}
      </label>
      {props.children}
    </div>
  );
};

export default LabelInput;
