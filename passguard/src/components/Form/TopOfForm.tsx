import trashLogo from "../../assets/icons/form/bluetrash.svg";
import starLogo from "../../assets/icons/form/yellowstar.svg";
import servicelogo from "../../assets/icons/form/servicelogo.svg";

function TopOfForm(props: any) {
  const handleDeleteCredential = () => {
    console.log("Delete button clicked");
  };

  return (
    <>
      <div className="flex place-items-center pt-4 box-border shadow-sm bg-neutral-100 h-min w-80">
        <div className="w-20">
          <img className="" src={servicelogo} alt="image description" />
        </div>

        <div className="pl-2">
          <h1 className="MainXAccount text-zinc-800 text-base font-bold font-['Nunito'] leading-normal">
            {props.credential.title
              ? props.credential.title
              : props.data.credentialTitle}
          </h1>
          <h2 className="SocialMedia w-32 h-3 text-neutral-500 text-xs font-normal leading-none">
            {props.credential.serviceType
              ? props.credential.serviceType
              : props.data.serviceType}
          </h2>
        </div>

        <div className="flex justify-between items-center gap-14">
          <i>
            <img src={starLogo} alt="starlogo.svg" className="w-5 h-5" />
          </i>
          <i className="mb-14">
            <img
              src={trashLogo}
              alt="trashlogo.svg"
              className="w-5 h-5"
              onClick={handleDeleteCredential}
            />
          </i>
        </div>
      </div>
    </>
  );
}

export default TopOfForm;
