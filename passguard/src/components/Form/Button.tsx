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
      className={`inline-flex items-center group relative text-white bg-gradient-to-r rounded-md
         hover:bg-gradient-to-bl focus:outline-none hover:text-black
         font-medium text-sm px-4 py-2 text-center transition-all duration-200 ease-out
         ${
           props.value === "Cancel"
             ? "from-black to-black bg-black hover:text-white"
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

      <span>{props.children}</span>
      {/* TOP */}
      <span
        className={`absolute left-0 top-0 h-[2px] w-0 ${
          props.value === "Cancel" ? "bg-blue-400" : "bg-black"
        } transition-all duration-100 group-hover:w-full`}
      />
      {/* RIGHT */}
      <span
        className={`absolute right-0 top-0 h-0 w-[2px] ${
          props.value === "Cancel" ? "bg-blue-400" : "bg-black"
        } transition-all delay-100 duration-100 group-hover:h-full`}
      />
      {/* BOTTOM */}
      <span
        className={`absolute bottom-0 right-0 h-[2px] w-0 ${
          props.value === "Cancel" ? "bg-blue-400" : "bg-black"
        } transition-all delay-200 duration-100 group-hover:w-full`}
      />
      {/* LEFT */}
      <span
        className={`absolute bottom-0 left-0 h-0 w-[2px] ${
          props.value === "Cancel" ? "bg-blue-400" : "bg-black"
        } transition-all delay-300 duration-100 group-hover:h-full`}
      />
    </button>
  );
};

export default Button;
