import twitterCard from "./testCardItems";
import dots from "../../assets/icons/common/verticalDots.svg";
import { MouseEventHandler } from "react";
import Kebab from "./Kebab";

type CardProps = {
  key: React.Key;
  id: string;
  picture?: string;
  title: string;
  username: string;
  dateCreated: string;
  dateUpdated: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const Card = (props: CardProps) => {
  return (
    <div
      onClick={props.onClick}
      id={props.id}
      className="flex bg-black h-48 w-52 max-w-xs flex-col justify-end rounded-3xl hover:bg-yellow-400 hover:scale-105 transition-all duration-350"
    >
      <div className="rounded-2xl h-36 w-full bg-neutral-100 shadow-2xl">
        <div className="flex items-center justify-evenly">
          <img
            src={twitterCard.logo}
            className=""
          />
          <h3 className="font-nunito font-medium break-words">
            {props.title}
          </h3>
          <Kebab></Kebab>
        </div>
        <div className=" flex flex-col text-center gap-1">
          <p className="text-xs font-medium font-nunito break-words">
            {props.username}
          </p>
          <p className="text-xs font-nunito font-light break-words">
            Created: {props.dateCreated}
          </p>
          <p className="text-xs font-nunito font-light break-words">
            Last updated: {props.dateUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
