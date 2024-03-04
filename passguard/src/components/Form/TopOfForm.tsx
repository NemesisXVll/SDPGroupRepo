import { useState } from "react";
import trashLogo from "../../assets/icons/form/bluetrash.svg";
import starLogo from "../../assets/icons/form/yellowstar.svg";
import { FaRegTrashAlt } from "react-icons/fa";
import { serviceNames } from "../../data/dropdownItems";
import CredentialService from "../../utils/credentialService";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const credentialService = new CredentialService();

function TopOfForm(props: any) {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteCredential = () => {
    setOpenModal(false);
    console.log("Trashing Credential", props.credential.credentialId);

    if (props.credential.credentialId) {
      credentialService.trashCredentialById(props.credential.credentialId);
    }
    props.credDeleted();

    setOpenModal(false);
  };

  return (
    <>
      <div className="flex items-center pt-4 box-border shadow-sm bg-neutral-100 h-min w-80">
        <div className="w-20">
          <img
            className=""
            src={`
            ${
              serviceNames.find(
                (service: any) =>
                  service.name ===
                  (props.credential.serviceName
                    ? props.credential.serviceName
                    : props.data.serviceName)
              )?.image || serviceNames[9].image
            }
            `}
            alt="image description"
          />
        </div>

        <div className="w-44 mr-4">
          <h1 className="MainXAccount text-zinc-800 font-bold font-['Nunito'] leading-normal text-sm whitespace-nowrap">
            {props.credential.title
              ? props.credential.title
              : props.data.credentialTitle}
          </h1>
          <h2 className="SocialMedia h-3 text-neutral-500 text-xs font-normal leading-none">
            {props.credential.serviceType
              ? props.credential.serviceType
              : props.data.serviceType}
          </h2>
        </div>

        <div id="logos" className="flex">
          <i>
            <img src={starLogo} alt="starlogo.svg" className="w-5 h-5" />
          </i>

          {/* <i className="">
            <img
              src={trashLogo}
              alt="trashlogo.svg"
              className="w-5 h-5 -translate-y-8 text-blue-900"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </i> */}

          <FaRegTrashAlt onClick={() => setOpenModal(true)}
            className={`w-5 h-5 -translate-y-8 ${props.credential.credentialId ? "text-blue-800" : "text-gray-600"}`}
          ></FaRegTrashAlt>

          <Modal
            show={openModal && props.credential.credentialId}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              {" "}
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to trash this credential?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteCredential}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          
        </div>
      </div>
    </>
  );
}

export default TopOfForm;
