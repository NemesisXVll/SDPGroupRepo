import { Modal } from "flowbite-react";
import Kebab from "../CredentialSection/Kebab";
import Button from "../Form/Button";
import { useState } from "react";
import fileTypeItems from "../../data/filetypes";

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

  const fileType = fileTypeItems.find(
    (item) => item.extension === props.type
  )?.icon;
  
  console.log(fileType);

  return (
    <>
      <div
        id={props.id}
        className={`
              relative flex cursor-pointer flex-col justify-end rounded-3xl hover:scale-105 transition-all duration-300`}
      >
        <div className="rounded-2xl bg-white shadow-lg border-2 h-72 w-52">
          <div className="TopOfCard flex items-center justify-between border-b-2 p-3">
            <div>
              <h3 className="font-nunito break-words text-sm font-bold">
                {props.name}
              </h3>
              <h3 className="font-nunito font-medium break-words text-xs">
                {props.category}
              </h3>
            </div>

            <Kebab
              onDeleteClick={() => props.onDeleteClick(props.index)}
              isCard={true}
            ></Kebab>
          </div>

          <div
            onDoubleClick={() => setOpenModal(!openModal)}
            className="flex items-center justify-center mt-5"
          >
            {fileType}
          </div>

          <div className="absolute bottom-3 ml-10">
            <div className="">
              <Button onClick={() => setOpenModal(!openModal)}>View</Button>
            </div>
          </div>
        </div>
      </div>

      {openModal ? (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="font-nunito font-medium break-words text-sm">
            {props.name} - {props.category}
          </Modal.Header>
          <Modal.Body>
            <div
              onDoubleClick={() => setOpenModal(!openModal)}
              className="flex items-center justify-center"
            >
              {fileType}
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
