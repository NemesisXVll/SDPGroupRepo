import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import Button from "./Form/Button";

const PasswordGeneratorModal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(12); // Default password length
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeSpecialSymbols, setIncludeSpecialSymbols] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true); // New state for including numbers

	useEffect(() => {
		generatePassword();
	}, [
		includeUppercase,
		includeLowercase,
		includeSpecialSymbols,
		includeNumbers,
		passwordLength,
	]);

	const generatePassword = () => {
		// Validate at least one checkbox is selected
		if (
			!includeUppercase &&
			!includeLowercase &&
			!includeSpecialSymbols &&
			!includeNumbers
		) {
			return;
		}

		let characters = "";
		if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
		if (includeSpecialSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
		if (includeNumbers) characters += "0123456789"; // Include numbers if selected

		let password = "";
		for (let i = 0; i < passwordLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			password += characters[randomIndex];
		}

		setGeneratedPassword(password);
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		if (!modalOpen) {
			generatePassword();
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(generatedPassword);
	};

	const getCharacterStyle = (char:any) => {
		if (/[A-Z]/.test(char)) {
			return { color: "black" }; // Uppercase characters
		} else if (/[a-z]/.test(char)) {
			return { color: "black" }; // Lowercase characters
		} else if (/[0-9]/.test(char)) {
			return { color: "blue" }; // Numbers
		} else {
			return { color: "red" }; // Symbols
		}
	};

	return (
		<>
			<Button value="GenPass" onClick={toggleModal}>
				🔑 Generate Password
			</Button>
			<Modal
				show={modalOpen}
				size="lg"
				onClose={toggleModal}
				dismissible
				// Added to show close button in modal header
			>
				<div className="p-4">
					<div className="p-2">
						<h1 className="text-2xl font-nunito font-bold border-b-4">
							Password <span className="">Generator</span>
						</h1>
						<br />
						<h2 className="text-lg font-nunito font-semibold p-1">
							Current Length:{" "}
							<span className="font-bold text-blue-500">{passwordLength}</span>
						</h2>
						<div className="flex  justify-center items-center border bg-gray-200 text-blue-500 border-gray-300 p-2 w-full rounded-2xl text-center text-lg font-bold font-nunito">
							{generatedPassword.split("").map((char, index) => (
								<span key={index} style={getCharacterStyle(char)}>
									{char}
								</span>
							))}
						</div>
					</div>
					<div className="flex justify-between items-center p-2 border rounded-lg border-gray-400 mb-5 mt-2 ">
						<span className="font-bold text-blue-500">8</span>
						<input
							type="range"
							value={passwordLength}
							min={8}
							max={30}
							step={1}
							onChange={(e) => setPasswordLength(Number(e.target.value))}
							className="border border-gray-300  w-full ml-2 mr-2 rounded"
						/>
						<span className="font-bold text-blue-500">30</span>
					</div>
					<div className="flex justify-between items-center p-2 border rounded-lg border-gray-400 m-2">
						<label className="font-nunito font-medium">Include Uppercase</label>
						<input
							type="checkbox"
							checked={includeUppercase}
							onChange={() => setIncludeUppercase(!includeUppercase)}
						/>
					</div>
					<div className="flex justify-between items-center p-2 border rounded-lg border-gray-400 m-2">
						<label className="font-nunito font-medium">Include Lowercase</label>
						<input
							type="checkbox"
							checked={includeLowercase}
							onChange={() => setIncludeLowercase(!includeLowercase)}
						/>
					</div>
					<div className="flex justify-between items-center p-2 border rounded-lg border-gray-400 m-2">
						<label className="font-nunito font-medium">
							Include Special Symbols
						</label>
						<input
							type="checkbox"
							checked={includeSpecialSymbols}
							onChange={() => setIncludeSpecialSymbols(!includeSpecialSymbols)}
						/>
					</div>
					<div className="flex justify-between items-center p-2 border rounded-lg border-gray-400 m-2">
						<label className="font-nunito font-medium">Include Numbers</label>
						<input
							type="checkbox"
							checked={includeNumbers}
							onChange={() => setIncludeNumbers(!includeNumbers)}
						/>
					</div>
				</div>
				<div className="mb-5 w-full flex items-center justify-center p-5">
					<Button value="GenCopy" onClick={copyToClipboard}>
						Copy to Clipboard
					</Button>
					<Button value="GenConfirm" onClick={copyToClipboard}>
						Confirm
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default PasswordGeneratorModal;
