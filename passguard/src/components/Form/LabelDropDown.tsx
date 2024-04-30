import { Select } from "flowbite-react";
import { serviceNames, serviceTypes } from "../../data/dropdownItems";
import React, { useState } from "react";

type LabelDropDownProps = {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  list?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  viewOnly?: boolean;
};

const LabelDropDown = (props: LabelDropDownProps) => {
  const [value, setValue] = useState(props.value ? props.value : "");

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    props.onChange ? props.onChange(e) : "";
  };

  return (
    <div className="mt-1 relative border-gray-300 hover:text-blue-300">
      {/* <input
        id={props.id}
        name={props.id}
        list={props.list}
        value={value}
        type={props.type}
        maxLength={props.id === "serviceType" ? 25 : 100}
        readOnly={props.viewOnly}
        onChange={handleOnChange}
        className={`pl-2 mt-5 peer h-10 w-full border-gray-400
         text-sm placeholder-transparent
         ${props.viewOnly ? "bg-gray-200 text-gray-500" : " text-black"}
         rounded-lg justify-start items-start gap-14 inline-flex
          focus:outline-none focus:border-blue-600 border-2 dark:bg-darkinset-999 dark:border-darkborder-999 dark:text-darkwhite-999`}
        placeholder={props.placeholder}
      /> */}
      <label
        htmlFor={props.id}
        className="pl-2 mt-4 font-normal font-['Nunito']
		text-gray-800 text-base
		focus:text-blue-600 transition-all dark:text-darktext-999"
      >
        {props.label}
      </label>
      {/* <datalist
        id={props.list}
        className="p-1 mt-2 absolute left-1 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base
		 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5
		  peer-focus:text-blue-600 transition-all max-h-40 overflow-y-auto"
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
      </datalist> */}
      {props.viewOnly ? (
        <input
          id={props.id}
          name={props.id}
          value={value}
          type={props.type}
          maxLength={props.id === "serviceType" ? 25 : 100}
          readOnly={props.viewOnly}
          onChange={handleOnChange}
          className={`
		  p-0 m-0 pl-2 h-10 w-full bg-opacity-50 border-gray-400 dark:text-darksubtext-999
        ${props.viewOnly ? "bg-gray-200 text-gray-500 " : "text-black"}
        rounded-lg  text-sm
        focus:outline-none focus:border-blue-600 border-2 dark:bg-darkinset-999 dark:border-darkborder-999 `}
          placeholder={props.placeholder}
        />
      ) : (
        <Select
          id={props.id}
          name={props.id}
          value={
            value
              ? value
              : props.list === "serviceNames"
                ? serviceNames[serviceNames.length - 1].name
                : serviceTypes[serviceTypes.length - 1].value
          }
          onChange={handleOnChange}
          className={`
		max-h-[200px] h-10 w-full font-normal font-['Nunito'] rounded-xl text-sm focus:text-blue-600 dark:bg-darkbg-999 dark:text-darkwhite-999
		  `}
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
        </Select>
      )}
    </div>
  );
};

export default LabelDropDown;
