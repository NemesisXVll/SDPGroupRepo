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
      className={`inline-flex items-center group relative text-white bg-gradient-to-r rounded-3xl
         hover:bg-gradient-to-bl focus:outline-none hover:text-black
         font-medium text-sm px-6 py-2 text-center transition-all duration-200 ease-out pt-2 pb-1.5 justify-center
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
          <img key={index} src={item.icon} alt={item.value} className="pr-2" />
        ) : (
          ""
        )
      )}

      <span className="text-center text-white text-base font-semibold font-['Roboto'] leading-normal tracking-tight">
        {props.children}
      </span>
    </button>
  );
};

export default Button;
