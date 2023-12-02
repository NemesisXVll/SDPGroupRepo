import "./kebab.scss";
import { useState, useEffect, useRef } from "react";

interface KebabState {
  Kebab: boolean;
}

type KebabProps = {
  onUpdateClick: () => void;
};

const Kebab: React.FC<KebabProps> = (props: KebabProps) => {
  const [isOpen, setIsOpen] = useState<KebabState>({
    Kebab: false,
  });
  const kebabRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setIsOpen({
      Kebab: !isOpen.Kebab,
    });
  };

  const handleClickOnUpdate = () => {
    props.onUpdateClick();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
      setIsOpen({
        Kebab: false,
      });
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="kebab" ref={kebabRef}>
      <div className="kebab z-10" onClick={handleOnClick}>
        <figure></figure>
        <figure
          className={`${isOpen.Kebab ? "middle active" : "middle"}`}
        ></figure>
        <p className={`${isOpen.Kebab ? "cross active" : "cross"}`}>x</p>
        <figure></figure>
        <ul
          className={`bg-black rounded-lg w-fit ${
            isOpen.Kebab ? "dropdown active" : "dropdown"
          }`}
        >
          <li key="1" id="1" className="text-xs" onClick={handleClickOnUpdate}>
            <p>Update</p>
          </li>
          <li key="2" id="2" className="text-xs">
            <p>Delete</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Kebab;
