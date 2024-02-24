import "../App.css";
import "primereact/resources/primereact.css"; // core css
import Form from "./Form/Form.tsx";
import Navbar from "./Navbar.tsx";
import Stats from "./Stats.tsx";
import Grid from "./CredentialSection/Grid.tsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CredentialData } from "./CredentialSection/Grid.tsx";

function Home() {
	const [showForm, setShowForm] = useState(false);
	const [editInput, setEditInput] = useState(false);
	const [credential, setCredential] = useState<any>([]);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [syncStats, setSyncStats] = useState(false);

	const location = useLocation();
	const user = location.state.user;

	const handleNotifyStats = (): void => {
		console.log("Notifying Stats");
		setSyncStats((syncStats) => !syncStats);
	};

	const handleAddClick = () => {
		setCredential({});
		setShowForm(false);
		setEditInput(true);
		// Introduce a delay before setting ShowForm to true
		setTimeout(() => {
			setShowForm(true);
		}, 0); // Adjust the delay time (in milliseconds) according to your needs
	};
	// Callback function to be passed to Grid
	const handleCardClickInApp = (
		credentialData: CredentialData,
		updateClicked: boolean
	) => {
		setShowForm(false);

		// Introduce a delay before setting ShowForm to true
		setTimeout(() => {
			setShowForm(true);
		}, 0); // Adjust the delay time (in milliseconds) according to your needs
		setCredential(credentialData);
		setEditInput(updateClicked);
	};

	const handleFormBTN = (showForm: boolean) => {
		setShowForm(showForm);
	};

	function handleFormSubmitted(): void {
		setFormSubmitted((formSubmitted) => !formSubmitted);
		setSyncStats((syncStats) => !syncStats);
	}

	return (
		<>
			<div className="app-container h-screen">
				<div className="navbar">
					<Navbar isactive={false}></Navbar>
				</div>

				<div className="stats mb-5">
					<Stats sync={syncStats}></Stats>
				</div>

				<div className="form">
					{showForm ? (
						<Form
							userId={user.userId}
							formSubmitted={handleFormSubmitted}
							credentialObj={credential}
							editable={editInput}
							onBTNClick={handleFormBTN}
						></Form>
					) : (
						""
					)}
				</div>

				<div className="credentials overflow-auto ml-4 mt-3">
					<Grid
						userId={user.userId}
						onCardClick={handleCardClickInApp}
						onAddClick={handleAddClick}
						onFormSubmit={formSubmitted}
						notifyStats={handleNotifyStats}
					></Grid>
				</div>
			</div>
		</>
	);
}

export default Home;
