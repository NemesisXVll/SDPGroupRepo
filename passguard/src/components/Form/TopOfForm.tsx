import trashLogo from "../../assets/icons/form/bluetrash.svg";
import starLogo from "../../assets/icons/form/yellowstar.svg";
import servicelogo from "../../assets/icons/form/servicelogo.svg";

function TopOfForm() {
  return (
    <>
      <div className="flex place-items-center pt-4 box-border shadow-sm bg-neutral-100 h-min w-80">
        <div className="w-28">
          <img className="" src={servicelogo} alt="image description" />
        </div>

        <div className="pl-2">
          <h1 className="MainXAccount text-zinc-800 text-xl font-bold font-['Nunito'] leading-normal">
            Main X Account
          </h1>
          <h2 className="SocialMedia w-32 h-3 text-neutral-500 text-xs font-normal font-['Inter'] leading-none">
            Social Media
          </h2>
        </div>

        <div className="flex flex-col pl-5">
          <i className="pb-5">
            <img src={trashLogo} alt="trashlogo.svg" />
          </i>
          <i className="pb-11">
            <img src={starLogo} alt="starlogo.svg" className="w-6 h-6" />
          </i>
        </div>
      </div>
    </>
  );
}

export default TopOfForm;
