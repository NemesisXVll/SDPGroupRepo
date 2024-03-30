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
      <h2 className="m-2 font-bold text-lg">Account</h2>
      <div className="p-5  flex items-center justify-between  rounded-xl rounded-b-none bg-gray-100 border border-gray-200 shadow-md">
        <div className="flex flex-col">
          <span className="font-semibold pb-2">Change Account Email</span>
          <span className="font-nunito text-gray-500">
            <span className="font-semibold text-sm">
              Use this feature if you would like to change you PassGuard account
              email.
            </span>
          </span>
        </div>

        <Button
          value="changeEmail"
          style="bg-black text-white hover:bg-yellow-400 min-w-[13rem]"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Change Account Email
        </Button>
      </div>

      {openModal && (
        <SecurityQuestion
          fromLoc="changeEmail"
          closeModal={handleModals}
          openModal={openModal}
        ></SecurityQuestion>
      )}
    </>
  );
};

export default ManageEmail;
