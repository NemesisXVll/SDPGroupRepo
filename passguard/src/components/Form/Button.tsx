import React from "react";
import buttonsArr from "../../data/buttons.tsx";

type FormProps = {
  type?: "button" | "submit" | "reset";
  value?: string;
  style?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

// interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
//   hasIcon?: boolean;

// }

const Button = (props: FormProps) => {
  return (
    <button
      type={props.type}
      value={props.value}
      onClick={props.onClick}
      className={`inline-flex items-center text-white bg-gradient-to-r rounded-3xl 
         hover:bg-gradient-to-bl focus:outline-none hover:text-black text-base 
         leading-normal tracking-tight font-semibold text-center
          transition-all duration-200 ease-out justify-center px-4 py-2 min-w-[8rem]
         ${
           props.value === "Cancel"
             ? "bg-black hover:text-black hover:bg-yellow-400"
             : "from-cyan-500 to-blue-500"
         }
         duration-[400ms]
         `}
    >
      {buttonsArr.map((item, index) =>
        item.icon !== "" && item.value === props.value ? (
          <img key={index} src={item.icon} alt={item.value} className="pr-1" />
        ) : (
          ""
        )
      )}
        {props.children}
    </button>
  );
};

export default Button;
