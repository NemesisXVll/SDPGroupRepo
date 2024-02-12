import blueinfo from "../assets/icons/stats/blueinfo.svg";
import redinfo from "../assets/icons/stats/redinfo.svg";
import refresh from "../assets/icons/stats/refresh.svg";
import yellowinfo from "../assets/icons/stats/yellowinfo.svg";
import React, { useEffect, useState } from "react";
import CredentialService from "../utils/credentialService";
import { useLocation } from "react-router-dom";

const credentialService = new CredentialService();

//I could comapre here instead

const Stats = () => {
	const [totalCredentials, setTotalCredentials] = useState<number>(0);
	const [totalWeakPasswords, setTotalWeakPasswords] = useState<number>(0);
	const [totalOldPasswords, setTotalOldPasswords] = useState<number>(0);
	const [totalReusedPasswords, setTotalReusedPasswords] = useState<number>(0);
	const [refreshCount, setRefreshCount] = useState<number>(0);

	const location = useLocation();
	const user = location.state.user;

	useEffect(() => {
		const fetchData = async () => {
			try {
				 await credentialService.checkOldPasswordStatus(user.userId)
				const total = await credentialService.getTotalCredentialsCountByUserId(
					user.userId
				);
				setTotalCredentials(total);
				const totalWeak =
					await credentialService.getWeakPasswordsCountByUserIdRequest(
						user.userId
					);
				setTotalWeakPasswords(totalWeak);
				const totalReused =
					await credentialService.getReusedPasswordsCountByUserIdRequest(
						user.userId
					);
				setTotalReusedPasswords(totalReused);
				const totalOld =
					await credentialService.getOldPasswordsCountByUserIdRequest(
						user.userId
					);
				setTotalOldPasswords(totalOld);
			} catch (error) {
				console.error("Error fetching credentials:", error);
			}
		};
		fetchData();
	}, [refreshCount]);
	const handleRefreshClick = () => {
		setRefreshCount((refreshCount) => refreshCount + 1);
	};
	let weakWidth=0, reusedWidth=0, oldWidth = 0;
	if (totalCredentials != 0) {
		 weakWidth = (totalWeakPasswords / totalCredentials) * 1000;
		 reusedWidth = (totalReusedPasswords / totalCredentials) * 1000;
		 oldWidth = (totalOldPasswords / totalCredentials) * 1000;
	}

	return (
		<div className="w-full p-2 h-fit m-3">
			<div className="flex">
				<h5 className="p-1 text-xl font-medium">Password Analysis </h5>
					<button onClick={handleRefreshClick}>
					<img src={refresh} alt="refresh-icon" />
					</button>
				
			</div>

			<div className="flex items-center ">
				<div className="flex-row w-60 h-fit m-1">
					<div className="flex">
						{weakWidth != 0 ? (
							<div
								className="flex p-2 bg-red-500 rounded-l-md h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
								style={{ width: `${weakWidth}%` }}
							>
								Weak
							</div>
						) : null}
						{reusedWidth != 0 ? (
							<div
								className="flex p-2 bg-sky-700 h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
								style={{ width: `${reusedWidth}%` }}
							>
								Reused
							</div>
						) : null}
						{oldWidth != 0 ? (
							<div
								className="flex p-2 bg-yellow-400 rounded-r-md h-8 text-center text-xs justify-center items-center text-white font-nunito font-bold"
								style={{ width: `${oldWidth}%` }}
							>
								Old
							</div>
						) : null}
					</div>
				</div>
				<div className="analysis-container text-center flex justify-evenly  w-full">
					<div>
						<div className="flex">
							<img src={redinfo} alt="info-icon" className="w-3" />
							<p className="text-xs font-nunito font-bold p-1">
								{totalWeakPasswords} Weak Passwords
							</p>
						</div>
						<p className="text-xs font-nunito font-light">
							You should change this
						</p>
					</div>
					<div>
						<div className="flex">
							<img src={blueinfo} alt="info-icon" className="w-3" />
							<p className="text-xs font-nunito font-bold p-1">
								{totalReusedPasswords} Reused Passwords
							</p>
						</div>
						<p className="text-xs font-nunito font-light">
							Create unique password
						</p>
					</div>
					<div>
						<div className="flex">
							<img src={yellowinfo} alt="info-icon" className="w-3" />
							<p className="text-xs font-nunito font-bold p-1">
								{totalOldPasswords} Old Passwords
							</p>
						</div>
						<p className="text-xs font-nunito font-light">
							Update your password
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;
