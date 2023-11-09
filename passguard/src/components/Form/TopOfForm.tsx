import trashLogo from "../../assets/icons/form/bluetrash.svg";
import starLogo from "../../assets/icons/form/yellowstar.svg";

function TopOfForm() {
  return (
    <>
      <div className="flex justify-between place-items-center p-1 box-border shadow-sm bg-neutral-100 h-min rounded-tr-3xl">
        <div className="mr-3 w-20">
          <img
            className="hex w-20 h-24 shadow-2xl"
            src="https://www.basicthinking.com/wp-content/uploads/2023/07/twitter-logo-x.jpg"
            alt="image description"
          />
        </div>

        <div className="pr-1">
          <h2 className="font-bold text-black">Main X Account</h2>
          <h2 className="text-slate-800 text-sm">Social Media</h2>
        </div>

        <div className="flex flex-col">
          <i className="pb-2">
            <img src={trashLogo} alt="trashlogo.svg" />
          </i>
          <i className="pt-2">
            <img src={starLogo} alt="starlogo.svg" className="w-6 h-6" />
          </i>
        </div>
      </div>
    </>
  );
}

export default TopOfForm;
