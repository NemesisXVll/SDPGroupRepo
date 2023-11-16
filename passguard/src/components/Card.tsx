import facebookCard from "./testCardItems";
import '../test.css';
import dots from "../assets/icons/common/verticalDots.svg";



const  Card = () =>{
return(
    
    <div className="firstBox ">


        <div className="innerBox rounded-3xl ">

            <div className="cardHeader flex justify-evenly items-center   ">
                {/* <img src="../assets/facebookHexa.svg" alt="logo" className="logo" /> */}
                <img src={facebookCard.logo}  id='' className=" w-20  "/>
                <h3>{facebookCard.appname}</h3>
                <img src={dots} alt="options point" id="options" className="w-8 h-6 "/>
            </div>
            <div className="cardDetails flex flex-col place-content-center w-full grow  ">
                <p className="accountName cardDetail dark:text-black p-1">{facebookCard.accountName}@gmail.com</p>
                <p className="created cardDetail dark:text-black p-1">Created: {facebookCard.dateCreated}</p>
                <p className="updated cardDetail dark:text-black p-1">Last updated: {facebookCard.lastDateUpdated}</p>
            </div>
        


        </div>
    </div>
);
};

export default  Card;