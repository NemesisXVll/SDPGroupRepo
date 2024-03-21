import { Card, FileInput, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../utils/userService";
import LabelInput from "../Form/LabelInput";
import Button from "../Form/Button";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

const userService = new UserService();

type ManageUserProfileProps = {
  userUpdated?: () => void;
};

const ManageUserProfile = (props: ManageUserProfileProps) => {
  const location = useLocation();
  const user = location.state.user;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  });
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [cancelBTNFlag, setCancelBTNFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userService.getUserDataById(user.userId).then((data: any) => {
      setUserData(data);
    });
  }, [cancelBTNFlag]);

  function handleOnChange(event: any): void {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  }

  function handleUpdateUser(event: any): void {
    setShowUpdateButton(false);
    setShowSaveButton(true);
    setEditable(true);
  }

  function handleFileInput(event: any): void {
    if (event.target.files[0].size > 1000000) {
      setErrorMessage("File size is too large");
      return;
    }
    setErrorMessage("");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUserData({
        ...userData,
        [event.target.id]: reader.result,
      });
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  async function handleSaveBTN(event: any): Promise<void> {
    event.preventDefault();
    console.log("Save button clicked");
    if (
      userData.firstName.match(/[^a-zA-Z]/) ||
      userData.lastName.match(/[^a-zA-Z]/)
    ) {
      setErrorMessage(
        "First Name and Last Name cannot contain numbers or symbols"
      );
      return;
    }

    if (errorMessage === "File size is too large") {
      return;
    }

    setShowModal(true);

    if (props.userUpdated) {
      props.userUpdated();
    }

    setShowSaveButton(false);
    setErrorMessage("");
    setEditable(false);
    setShowUpdateButton(true);
  }

  function handleCancelBTN(event: any): void {
    setCancelBTNFlag(!cancelBTNFlag);
    setShowSaveButton(false);
    setEditable(false);
    setShowUpdateButton(true);
  }

  return (
    <>
      <Card className="max-w-[44rem] mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-end">
            <div>
              {showUpdateButton ? (
                <Button value="Update" type="submit" onClick={handleUpdateUser}>
                  Update
                </Button>
              ) : (
                <Button value="Cancel" type="button" onClick={handleCancelBTN}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <img
            alt="User Profile Picture"
            src={userData.picture}
            className="mb-3 rounded-full shadow-lg mx-auto w-36 h-36"
          />

          <div className="mx-auto ">
            <h1 className="text-lg font-medium text-center text-gray-900 dark:text-white">
              {userData.firstName} {userData.lastName}
            </h1>
            <h5 className="text-xs font-medium text-center text-gray-900 dark:text-white">
              Date Created: {user.dateCreated.toString().slice(0, 10)}
            </h5>
          </div>

          <form onSubmit={handleSaveBTN}>
            <div className="mt-4 flex-row w-96 mx-auto">
              <LabelInput
                value={userData.firstName}
                onChange={handleOnChange}
                type="text"
                required={true}
                viewOnly={!editable}
                label="First Name"
                id="firstName"
              ></LabelInput>
              <LabelInput
                value={userData.lastName}
                onChange={handleOnChange}
                type="text"
                required={true}
                viewOnly={!editable}
                label="Last Name"
                id="lastName"
              ></LabelInput>
              <LabelInput
                value={userData.email}
                onChange={handleFileInput}
                type="text"
                viewOnly={true}
                label="Email"
                id="email"
              ></LabelInput>

              {editable && (
                <div>
                  <div className="mb-1 block mt-2">
                    <label
                      htmlFor="picture"
                      className="p-2 font-normal font-['Nunito']
           text-gray-800 text-base peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
            peer-focus: peer-focus:text-blue-600 transition-all"
                    >
                      Upload Profile Picture
                    </label>
                  </div>
                  <FileInput
                    accept="image/jpeg, image/png, image/gif, image/svg+xml"
                    id="picture"
                    className="font-nunito"
                    onChange={handleFileInput}
                  />
                  <div className="flex">
                    <IoInformationCircleOutline className="mt-[0.3rem] text-gray-500 "></IoInformationCircleOutline>
                    <p className="text-gray-500 text-sm mt-1 ml-2zz">
                      Files allowed (jpg, jpeg, gif, png, svg), Max Size: 1MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="flex ml-[6.3rem]">
                <CgDanger className="w-4 h-5 text-red-500" />
                <p className="text-red-500 text-sm">&nbsp; {errorMessage}</p>
              </div>
            )}

            {showSaveButton && (
              <div className="w-96 mx-auto mt-4">
                <Button value="Save" type="submit">
                  Save
                </Button>
              </div>
            )}
          </form>
        </div>
      </Card>

      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <Modal.Body className="mt-9">
          <div className="flex justify-center p-3">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h1 className="flex justify-center">Account Updated Successfully</h1>
        </Modal.Body>
        <div className="mx-6 my-4">
          <Button
            value="Login"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ManageUserProfile;
