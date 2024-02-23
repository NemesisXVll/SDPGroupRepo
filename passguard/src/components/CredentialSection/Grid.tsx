// Grid.tsx
import "./grid.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import CredentialService from "../../utils/credentialService";
import AddButton from "../Form/AddButton";

const credentialService = new CredentialService();
export interface CredentialData {
	credentialId: string;
	credentialTitle: string;
	credentialUsername: string;
	dateCreated: string;
	dateUpdated: string;
}
type GridProps = {
	userId: number;
	onCardClick: (credentialData: CredentialData, updateClicked: boolean) => void;
	onAddClick: () => void;
	onFormSubmit: boolean;
};

const Grid = (props: GridProps) => {
	const [currentCredentials, setCurrentCredentials] = useState<any>([]);
	const [filteredCondition, setFilteredCondition] = useState<string>(
		"(item) => !item.isTrashed"
	);

	const handleCardClick = (
		credentialData: CredentialData,
		updateClicked: boolean
	) => {
		props.onCardClick(credentialData, updateClicked);
	};
	const handleDeleteClick = (credentialId: number) => {
		credentialService.trashCredentialById(credentialId);

		const updatedCredentials = currentCredentials.map((item: any) => {
			if (item.credentialId === credentialId) {
				item.isTrashed = true;
			}
			return item;
		});
		setCurrentCredentials(updatedCredentials);
	};
	const handlePermanentRemoveClick = (credentialId: number) => {
		credentialService.deleteCredential(credentialId);
		const updatedCredentials = currentCredentials.filter((item: any) => {
			return item.credentialId !== credentialId;
		});
		setCurrentCredentials(updatedCredentials);
	};
	const handleRecoverClick = (credentialId: number) => {
		credentialService.recoverCredentialById(credentialId);
		const updatedCredentials = currentCredentials.map((item: any) => {
			if (item.credentialId === credentialId) {
				item.isTrashed = false;
			}
			return item;
		});
		setCurrentCredentials(updatedCredentials);
	};
	const handleSearch = () => {
		const input = document.getElementById("searchInput");
		if (input) {
			input.addEventListener("keyup", (e) => {
				const inputElement = e.target as HTMLInputElement;
				const searchString = inputElement.value.toLowerCase();
				const filteredCredentials = currentCredentials.filter(
					(credential: any) => {
						return credential.title.toLowerCase().includes(searchString);
					}
				);
				setCurrentCredentials(filteredCredentials);
			});
		}
	};
	const handleFilterChange = (event: any) => {
		const filter = event.target.value;
		let filterCondition;

		if (filter === "current") {
			filterCondition = "(item) => !item.isTrashed"; // Return true for all items
		} else if (filter === "weak") {
			filterCondition = "(item) => !item.isTrashed && item.isWeak";
		} else if (filter === "old") {
			filterCondition = "(item) => !item.isTrashed && item.isOld";
		} else if (filter === "reused") {
			filterCondition = "(item) => !item.isTrashed && item.isReused";
		} else if (filter === "strong") {
			filterCondition =
				"(item) => !item.isTrashed && !item.isWeak && !item.isOld && !item.isReused";
		} else if (filter === "trash") {
			filterCondition = "(item) => item.isTrashed";
		} else {
			filterCondition = "() => true";
		}
		setFilteredCondition(filterCondition);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				setTimeout(async () => {
					const result = await credentialService.findCredentialsByUserId(
						props.userId
					);
					setCurrentCredentials(result);
				}, 100);
			} catch (error) {
				console.error("Error fetching credentials:", error);
			}
		};
		fetchData();
		return () => {
			window.ipcRenderer.removeAllListeners("findCredentialsByIdResponse");
		};
	}, [props.onFormSubmit || filteredCondition]);

	const credentialsLength = currentCredentials.filter(eval(filteredCondition)).length;

	const injectCard = () => {
		return currentCredentials
			.filter(eval(filteredCondition))
			.map((item: any, index: any) => (
				<Card
					onClick={() => handleCardClick(item, false)}
					onUpdateClick={() => handleCardClick(item, true)}
					onDeleteClick={() => handleDeleteClick(item.credentialId)}
					onRecoverClick={() => handleRecoverClick(item.credentialId)}
					onPermanentRemoveClick={() =>
						handlePermanentRemoveClick(item.credentialId)
					}
					key={index}
					index={index}
					id={item.credentialId.toString()}
					title={item.title}
					username={JSON.parse(item.data).userName}
					dateCreated={item.dateCreated.toString().slice(0, 10)}
					dateUpdated={item.dateUpdated.toString().slice(0, 10)}
					isWeak={item.isWeak}
					isOld={item.isOld}
					isReused={item.isReused}
					isTrashed={item.isTrashed}
				></Card>
			));
	};
	return (
		<>
			<div className="sticky top-0 bg-neutral-100 z-10 flex items-center justify-start p-4 gap-3">
				<h3 className="text-xl font-medium p-1">
					Credentials ({credentialsLength})
				</h3>
				<div>
					<div id="search-container" className="relative w-80">
						<input
							id="searchInput"
							type="text"
							placeholder="Search"
							className=" font-nunito ml-2 w-full h-8 p-4 text-xs rounded-xl border-2 transition-all duration-300 shadow-md focus:shadow-lg focus:outline-none focus:border-blue-600"
							onClick={handleSearch}
						/>
					</div>
				</div>
				<AddButton onClick={props.onAddClick}></AddButton>
				<div id="filter-container">
					<select
						name="filter"
						id="filter"
						className="rounded-md p-2 bg-white border-2 border-gray-300"
						onChange={handleFilterChange}
					>
						<option value="current">Current</option>
						<option value="trash">Trash</option>
						<option value="weak">Weak</option>
						<option value="old">Old</option>
						<option value="reused">Reused</option>
					</select>
				</div>
			</div>
			<div className="cards p-3 gap-5">{injectCard()}</div>
		</>
	);
};

export default Grid;
