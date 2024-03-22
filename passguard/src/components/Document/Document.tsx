import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../CredentialSection/grid.css";
import { useLocation } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { Label, Modal, Toast } from "flowbite-react";
import Button from "../Form/Button";
import DocumentModal from "./DocumentModal";
import DocumentCard from "./DocumentCard";
import DocumentService from "../../utils/documentService";
import useAutoRedirect from "../Inactivity/AutoRedirectHook";
import { HiCheck } from "react-icons/hi2";
import { HiX } from "react-icons/hi";

const documentService = new DocumentService();

type DocumentProps = {};

const Document = (props: DocumentProps) => {
	useEffect(() => {
		window.history.pushState(null, "", "/login");
		window.onpopstate = function () {
			window.history.pushState(null, "", "/login");
		};
	}, []);

	const location = useLocation();
	const user = location.state.user;

	const [openWarningModal, setOpenWarningModal] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [expanded, setExpanded] = useState(location.state?.expanded);
	const [currentDocuments, setCurrentDocuments] = useState<any>([]);
	const [sync, setSync] = useState<boolean>(false);
	const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
	const { redirect, setRedirect } = useAutoRedirect(
		undefined,
		undefined,
		expanded
	);

	const handleDeleteClick = (documentId: number) => {
		console.log("Deleting Document", documentId);
		documentService.deleteDocumentById(documentId);
		setShowDeleteToast(true);
		setTimeout(() => {
			setShowDeleteToast(false);
		}, 3000);
		const updateDocuments = currentDocuments.map((item: any) => {
			if (item.credentialId === documentId) {
				item.isTrashed = true;
			}
			return item;
		});
		setCurrentDocuments(updateDocuments);
		setSync((sync) => !sync);
		console.log("Syncing", sync);
	};

	const handleSearch = () => {
		const input = document.getElementById("searchInput");
		if (input) {
			input.addEventListener("keyup", (e) => {
				const inputElement = e.target as HTMLInputElement;
				const searchString = inputElement.value.toLowerCase();
				const filteredDocuments = currentDocuments.filter((document: any) => {
					return document.name.toLowerCase().includes(searchString);
				});
				setCurrentDocuments(filteredDocuments);
			});
		}
	};

	useEffect(() => {
		console.log("Fetching Documents");
		const fetchData = async () => {
			try {
				setTimeout(async () => {
					const result = await documentService.findDocumentsByUserId(
						user.userId
					);
					setCurrentDocuments(result);
				}, 999);
			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		};
		fetchData();
		return () => {
			window.ipcRenderer.removeAllListeners("findDocumentsByIdResponse");
		};
	}, [openModal, sync]);

	function handleAddDocument(event: any): void {
		setOpenModal(true);
	}

	const documentsLength = currentDocuments.length;

	const injectCard = () => {
		return currentDocuments.map((item: any, index: React.Key) => (
			<DocumentCard
				onDeleteClick={() => handleDeleteClick(item.documentId)}
				key={index}
				index={index}
				id={item.documentId.toString()}
				category={item.category}
				name={item.name}
				path={item.path}
				type={item.type}
			></DocumentCard>
		));
	};

	function handleModals(): void {
		setOpenModal(false);
	}

	function handleWarningModal(): void {
		setOpenModal(false);
		setOpenWarningModal(true);
	}

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
							<CgFileDocument className="mt-2  text-xl" />
							<Label
								value="Documents"
								className="flex p-1 font-medium mb-2 text-xl"
								color="dark"
							/>
						</div>

						{openModal ? (
							<DocumentModal
								warningModal={handleWarningModal}
								closeModal={handleModals}
								modalVal={openModal}
							></DocumentModal>
						) : (
							""
						)}

						<div className="w-fit ml-1">
							<Button onClick={handleAddDocument} value="Add Document">
								<FaPlus className="mr-1" />
								Add Document
							</Button>
						</div>
					</div>
				</div>

				<div className="credentials overflow-auto ml-4 mt-8 ">
					<div className="sticky top-0 z-10 flex items-center justify-start p-4 gap-3">
						<h3 className="text-xl font-medium w-56">
							My Documents ({documentsLength})
						</h3>
						<div>
							<div id="search-container" className="relative w-80">
								<input
									id="searchInput"
									type="text"
									placeholder="Search"
									onClick={handleSearch}
									className="font-nunito ml-2 w-full h-8 p-4 text-s rounded-xl border-2 transition-all duration-300 shadow-md focus:shadow-lg focus:outline-none focus:border-blue-600"
								/>
							</div>
							<div className="absolute left-[52rem]">
								{showDeleteToast && (
									<Toast>
										<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
											<HiX className="h-5 w-5 text-red-500" />
										</div>
										<div className="ml-3 text-sm font-nunito">
											Document has been deleted.
										</div>
										<Toast.Toggle />
									</Toast>
								)}
							</div>
						</div>
					</div>
					<div className="cards p-3 gap-5">{injectCard()}</div>
				</div>
			</div>

			<Modal
				dismissible
				show={openWarningModal}
				size="md"
				popup
				onClose={() => setOpenWarningModal(false)}
			>
				<Modal.Header className="p-5">
					<h1 className="text-center">⚠️ Delete Source File</h1>
				</Modal.Header>
				<Modal.Body>
					<h1 className="font-nunito">
						PassGuard will keep an encrypted copy of this file in your vault.
						For added security, delete the source file from your computer.
					</h1>
				</Modal.Body>
				<div className="mx-6 my-2">
					<Button value="Save" onClick={() => setOpenWarningModal(false)}>
						Close
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default Document;
