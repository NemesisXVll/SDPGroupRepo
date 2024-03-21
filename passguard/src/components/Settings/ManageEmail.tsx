import { useState } from "react";
import Button from "../Form/Button";
import SecurityQuestion from "../SecurityQuestion/SecurityQuestion";

const ManageEmail = () => {
  const [openModal, setIsModalOpen] = useState(false);

  function handleModals(): void {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="p-5 flex items-center justify-between bg-gray-300 rounded-xl shadow-md">
        <span className="font-semibold font-nunito">Change Account Email</span>
        <Button
          value="ChangeMaster"
          style="bg-black text-white hover:bg-yellow-400 w-[9.7rem]"
          onClick={() => {
            console.log("Change Email");
            setIsModalOpen(true);
          }}
        >
          Change E-mail
        </Button>
      </div>

      {openModal && (
        <SecurityQuestion
          closeModal={handleModals}
          openModal={openModal}
        ></SecurityQuestion>
      )}
    </>
  );
};

export default ManageEmail;
