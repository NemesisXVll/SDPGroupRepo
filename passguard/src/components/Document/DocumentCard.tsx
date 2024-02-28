import { Button, Modal } from "flowbite-react";
import Kebab from "../CredentialSection/Kebab";
import ViewButton from "../Form/Button";
import { useState } from "react";
import fileTypeItems from "../../data/filetypes";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

type DocumentCardProps = {
  index: React.Key;
  onDeleteClick: (key: React.Key) => void;
  id: string;
  name: string;
  type: string;
  category: string;
  path: string;
};

function DocumentCard(props: DocumentCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // const fileType = fileTypeItems.find(
  //   (item) => item.extension === props.type
  // )?.icon;

  return (
    <>
      <div
        id={props.id}
        className={`
              relative flex cursor-pointer flex-col justify-end 
              rounded-3xl hover:scale-105 transition-all duration-300 w-52 max-w-xs`}
      >
        <div className="rounded-2xl bg-white shadow-lg border-2 h-72">
          <div className="TopOfCard flex items-center justify-between border-b-2 p-2">
            <div>
              <h3 className="font-nunito break-words text-sm font-bold">
                {props.name}
              </h3>
              <h3 className="font-nunito font-medium break-words text-xs">
                {props.category}
              </h3>
            </div>

            <Kebab
              onDeleteClick={() => setOpenDeleteModal(true)}
              isCard={true}
            ></Kebab>

            <Modal
              show={openDeleteModal}
              size="md"
              onClose={() => setOpenDeleteModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                {" "}
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this document?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => props.onDeleteClick(props.index)}
                    >
                      {"Yes, I'm sure"}
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setOpenDeleteModal(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          {/* how to display all file types? */}
          <div
            onDoubleClick={() => setOpenModal(!openModal)}
            className="flex items-center justify-center"
          >
            {props.type === "application/pdf" ? (
              <embed
                src={props.path + `#page=1`}
                className="overflow-hidden border-none w-44 h-44 mt-1"
              ></embed>
            ) : (
              <img src={props.path} className="w-44 h-44 mt-1" />
            )}
          </div>

          <div className="absolute w-36 bottom-2 ml-8">
            <div className="">
              <ViewButton onClick={() => setOpenModal(!openModal)}>
                View
              </ViewButton>
            </div>
          </div>
        </div>
      </div>

      {openModal ? (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="font-nunito font-medium break-words text-sm">
            {props.name} - {props.category}
          </Modal.Header>
          <Modal.Body
            className={`${props.type === "application/pdf" ? "overflow-hidden" : ""}`}
          >
            <div
              onDoubleClick={() => setOpenModal(!openModal)}
              className="flex items-center justify-center"
            >
              {props.type === "application/pdf" ? (
                <embed
                  src={props.path}
                  className="w-screen h-screen overflow-hidden"
                ></embed>
              ) : (
                <img src={props.path + `#toolbar=0`} className="w-screen" />
              )}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default DocumentCard;
