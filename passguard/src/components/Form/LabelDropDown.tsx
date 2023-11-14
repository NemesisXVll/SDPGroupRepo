import { serviceNames, serviceTypes } from "../../data/dropdownItems";
import { useState } from "react";

type LabelDropDownProps = {
  type?: string;
  onChange?: string;
  id?: string;
  list?: string;
  placeholder?: string;
  value?: string;
};

const LabelDropDown = (props: LabelDropDownProps) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="mt-1 relative hover:text-blue-300">
      <input
        id={props.id}
        name={props.id}
        list={props.list}
        value={value}
        type={props.type}
        onChange={handleOnChange}
        className="pl-2 mt-5 peer h-10 w-full
         text-gray-900 text-xs placeholder-transparent
         rounded-lg justify-start items-start gap-14 inline-flex
          focus:outline-none focus:border-blue-600 border-2"
        placeholder={props.placeholder}
      />
      <label
        htmlFor={props.id}
        className="p-1 mt-4 absolute left-1 -top-6 text-gray-600 text-md peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-blue-600 transition-all font-normal font-['Nunito']"
      >
        {props.value}
      </label>
      <datalist
        id={props.list}
        className="p-1 mt-2 absolute left-1 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 transition-all"
      >
        {props.list === "serviceNames"
          ? serviceNames.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))
          : serviceTypes.map((service) => (
              <option key={service.id} value={service.value}>
                {service.value}
              </option>
            ))}
      </datalist>
    </div>
  );
};

export default LabelDropDown;
