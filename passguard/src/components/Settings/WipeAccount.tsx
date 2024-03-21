import Button from "../Form/Button";
import UserService from "../../utils/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useState } from "react";

const userService = new UserService();

interface WipeAccountProps {}

const WipeAccount = (props: WipeAccountProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  const [openModal, setOpenModal] = useState(false);

  async function handleWipeAccount(event: any): Promise<void> {
    console.log("Wipe Account", user);
    navigate("/login");
    await userService.deleteUser(user.userId);
  }

  return (
    <>
      <div className="p-5 flex items-center justify-between bg-gray-300 rounded-xl shadow-md">
        <span className="font-semibold font-nunito">Wipe Account</span>
        <div className="w-[9.5rem]">
          <Button
            value="GenPass"
            style="bg-black text-white hover:bg-yellow-400"
            onClick={() => setOpenModal(true)}
          >
            Wipe Account
          </Button>
        </div>
      </div>

      {openModal && (
        <Modal
          show={openModal}
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
                Are you sure you want to wipe your whole account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button value="Cancel" onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
                <Button value="Save" onClick={handleWipeAccount}>
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default WipeAccount;
