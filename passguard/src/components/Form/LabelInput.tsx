import { useState } from "react";

type LabelInputProps = {
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: string;
  id?: string;
  placeholder?: string;
};
const LabelInput = (props: LabelInputProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="mt-1 relative hover:text-blue-300 border-b-2 border-gray-300">
      <input
        id={props.id}
        name={props.id}
        value={value}
        required={props.required}
        type={props.type}
        className="pl-2 mt-5 peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
        placeholder={props.placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          console.log(value);
        }}
      />
      <label
        htmlFor={props.id}
        className="p-1 mt-2 absolute left-1 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 transition-all"
      >
        {props.value}
      </label>
    </div>
  );
};

export default LabelInput;