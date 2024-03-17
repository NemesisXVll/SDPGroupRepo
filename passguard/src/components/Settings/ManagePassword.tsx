import { useState } from "react";
import { Modal } from "flowbite-react";
import Button from "../Form/Button";
import Input from "../Form/LabelInput";
import LabelInput from "../Form/LabelInput";

const ManagePassword = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleChangePassword = () => {
		// Handle change password logic here
		console.log("Change Password");
	};
	const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
		setCurrentPassword(e.target.value);
	
	}
	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};
	const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmNewPassword(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword !== confirmNewPassword) {
			console.log("Passwords do not match");
			return;
		}
		handleChangePassword();
		closeModal();
	
	}

	return (
		<>
			<h2 className="m-2 font-bold text-lg">Master Password</h2>
			<div className="p-5 flex items-center justify-between bg-gray-300 rounded-xl shadow-md">
				<span className="font-semibold font-nunito">
					Change Master Password
				</span>
				<Button
					value="ChangeMaster"
					style="bg-black text-white hover:bg-yellow-400"
					onClick={openModal}
				>
					Change Password
				</Button>
			</div>
			<Modal show={isModalOpen} onClose={closeModal} dismissible>
				<Modal.Body>
					<form
						className="max-w-[400px] w-full mx-auto bg-white p-4 border border-gray-300 shadow-md"
						onSubmit={handleSubmit}
					>
						<h2 className="text-2xl font-nunito font-bold border-b-4 p-2 mb-3">
							🔑 Setup New Password
						</h2>
						<LabelInput
							type="password"
							required={true}
							value={currentPassword}
							label="Current Password"
							id="new-password"
							placeholder="Enter New Password"
							onChange={handleNewPasswordChange}
						/>

						<LabelInput
							type="password"
							required={true}
							value={newPassword}
							label="New Password"
							id="new-password"
							placeholder="Enter New Password"
							onChange={handleNewPasswordChange}
						/>

						<LabelInput
							type="password"
							required={true}
							// value={confirmPassword}
							label="Confirm Password"
							id="confirm-password"
							placeholder="Re-enter New Password"
							// onChange={handleConfirmPasswordChange}
						/>

						{errorMessage && <p className="text-red-500 text-sm mt-2">{}</p>}

						<div className="mt-7">
							<Button value="Update" type="submit">
								Update Password
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ManagePassword;
