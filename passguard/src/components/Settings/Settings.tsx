import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Label, Tabs, Modal, Toast } from "flowbite-react";
import { useLocation } from "react-router-dom";
import AutoRedirectHook from "../Inactivity/AutoRedirectHook";
import { HiUserCircle } from "react-icons/hi2";
import { PiPasswordFill } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import ManagePassword from "./ManagePassword";
import Button from "../Form/Button";
import CredentialService from "../../utils/credentialService";
import DocumentService from "../../utils/documentService";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTrash } from "react-icons/fa";

type SettingsProps = {};

const Settings = (props: SettingsProps) => {
	useEffect(() => {
		window.history.pushState(null, "", "/login");
		window.onpopstate = function () {
			window.history.pushState(null, "", "/login");
		};
	}, []);

	const location = useLocation();

	const [expanded, setExpanded] = useState(location.state?.expanded);
	const { redirect, setRedirect } = AutoRedirectHook(
		undefined,
		undefined,
		expanded
	);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteOption, setDeleteOption] = useState("");
	const [openToast, setOpenToast] = useState(false);
	const handleWipeAllCredentials = () => {
		const credentialService = new CredentialService();
		credentialService.deleteAllCredentialsByUserId(location.state?.userId);
	};
	const handleWipeAllDocuments = () => {
		const documentService = new DocumentService();
		documentService.deleteAllDocumentsByUserId(location.state?.userId);
	};
	const handleOpenModal = () => {
		setOpenDeleteModal(true);
		if (deleteOption === "wipeCredentials") {
			handleWipeAllCredentials();
		} else if (deleteOption === "wipeDocuments") {
			handleWipeAllDocuments();
		}
		setOpenDeleteModal(false);
		setOpenToast(true);
		setTimeout(() => {
			setOpenToast(false);
		}, 3000);
	};

	return (
		<>
			{redirect}
			<div className="app-container h-screen">
				<div className="navbar">
					<Navbar
						isExpanded={expanded}
						handleExpand={(expanded) => setExpanded(expanded)}
					/>
				</div>

				<div className="TopOfDocument border-b-2">
					<div className="p-2 m-3 TopOfDocument">
						<div className="flex">
							<Label
								value=" ⚙ Settings"
								className="flex p-1 text-xl font-medium mb-2"
								color="dark"
							/>
						</div>
						<Tabs aria-label="Default tabs" style="default">
							<Tabs.Item title="Manage Profile" icon={HiUserCircle}>
								Change personal info here
							</Tabs.Item>
							<Tabs.Item title="Password" icon={PiPasswordFill}>
								<ManagePassword></ManagePassword>
							</Tabs.Item>
							<Tabs.Item
								title="Manage credentials"
								className=""
								icon={GrStorage}
							>
								{openToast && (
									<Toast className="absolute inset-0 h-14 translate-x-[40rem] translate-y-[7.5rem] flex items-center justify-center">
										<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
											<FaCheck className="h-5 w-5" />
										</div>
										<div className="ml-3 text-sm font-normal">
											{deleteOption === "wipeCredentials"
												? "Credentials deleted Successfully"
												: "Documents deleted Successfully"}{" "}
										</div>
										<Toast.Toggle />
									</Toast>
								)}
								<h2 className="m-2 font-bold text-lg">Credentials</h2>
								<div className="p-5 mb-10 flex items-center justify-between  rounded-xl bg-gray-100 border border-gray-200 shadow-md">
									<div className="flex flex-col">
										<span className="font-semibold pb-2">
											Remove All Credentials
										</span>
										<span className="font-nunito text-gray-500">
											<span className="text-red-500 font-bold text-sm">
												⚠️ Warning:
											</span>{" "}
											<span className="font-semibold text-sm">
												This action is irreversible.
											</span>
										</span>
									</div>
									<Button
										value="wipeCredentials"
										style="bg-black text-white hover:bg-yellow-400"
										onClick={() => {
											setOpenDeleteModal(true);
											setDeleteOption("wipeCredentials");
										}}
									>
										Wipe All Credentials
									</Button>
								</div>
								<h2 className="m-2 font-bold text-lg">Documents</h2>
								<div className="p-5 flex items-center justify-between  rounded-xl bg-gray-100 border border-gray-200 shadow-md">
									<div className="flex flex-col">
										<span className="font-semibold pb-2">
											Remove All Documents
										</span>
										<span className="font-nunito text-gray-500">
											<span className="text-red-500 text-sm font-bold">
												⚠️ Warning:
											</span>{" "}
											<span className="font-semibold text-sm">
												This action is irreversible.
											</span>
										</span>
									</div>
									<Button
										value="wipeDocuments"
										style="bg-black text-white hover:bg-yellow-400"
										onClick={() => {
											setOpenDeleteModal(true);
											setDeleteOption("wipeDocuments");
										}}
									>
										Wipe All Documents
									</Button>
								</div>
							</Tabs.Item>
						</Tabs>
					</div>
				</div>
			</div>
			<Modal
				show={openDeleteModal}
				size="md"
				onClose={() => setOpenDeleteModal(false)}
				popup
				dismissible
			>
				<Modal.Header />
				<Modal.Body>
					{" "}
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-nunito text-gray-500 dark:text-gray-400">
							{deleteOption === "wipeCredentials"
								? "Are you sure you want to permanently delete all credentials?"
								: "Are you sure you want to permanently delete all documents?"}
						</h3>
						<div className="flex justify-center gap-4">
							<Button value="Cancel" onClick={() => setOpenDeleteModal(false)}>
								No, cancel
							</Button>
							<Button value="confirmsignout" onClick={handleOpenModal}>
								Delete
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Settings;
