import twitterCard from "./testCardItems";
import dots from "../assets/icons/common/verticalDots.svg";



const  Card = () =>{
return (
    <div className="flex bg-black h-48 w-52 max-w-xs flex-col justify-end rounded-3xl hover:bg-yellow-400 hover:scale-105 transition-all duration-350">
    <div className="rounded-2xl h-36 w-full bg-neutral-100 shadow-2xl">
            <div className="flex items-center justify-evenly">
            
        <img src={twitterCard.logo} className="-translate-y-7 translate-x-32 w-16" />
        <h3 className="-m-10 font-nunito font-medium break-words">My facebook account</h3>
        <img src={dots} alt="options point" className="w-8 h-5 ml-auto" />
      </div>
      <div className=" flex flex-col text-center gap-1">
        <p className="text-xs font-medium font-nunito break-words">
          {twitterCard.accountName}@gmail.com
        </p>
        <p className="text-xs font-nunito font-light break-words">
          Created: {twitterCard.dateCreated}
        </p>
        <p className="text-xs font-nunito font-light break-words">
          Last updated: {twitterCard.lastDateUpdated}
        </p>
      </div>
    </div>
  </div>
);
};

export default  Card;