import twitterCard from "./testCardItems";
import { MouseEventHandler } from "react";
import Kebab from "./Kebab";

type CardProps = {
	index: React.Key;
	id: string;
	picture?: string;
	title: string;
	username: string;
	dateCreated: string;
	dateUpdated: string;
	isWeak: boolean;
	isOld: boolean;
	isReused: boolean;
	isTrashed: boolean;
	onClick: MouseEventHandler<HTMLDivElement>;
	onUpdateClick: (key: React.Key) => void;
	onDeleteClick: (key: React.Key) => void;
	onRecoverClick: (key: React.Key) => void;
	onPermanentRemoveClick: (key: React.Key) => void;
};
const Card = (props: CardProps) => {
	const credentialStatus = (): string => {
		if (props.isWeak) {
			if (props.isReused && props.isOld) {
				return "bg-gradient-to-r from-red-500 via-sky-700 to-purple-400";
			} else if (props.isReused) {
				return "bg-gradient-to-r from-red-500 to-sky-700";
			} else if (props.isOld) {
				return "bg-gradient-to-r from-red-500 to-purple-500";
			} else {
				return "bg-red-500";
			}
		} else if (props.isReused) {
			if (props.isOld) {
				return "bg-gradient-to-r from-sky-700 to-purple-500";
			} else if (!props.isOld && !props.isWeak) {
				return "bg-gradient-to-r from-sky-700 to-green-500";
			}
		} else if (props.isWeak) {
			return "bg-purple-500";
		}
		return "bg-green-500";
	};
	return (
		<div
			id={props.id}
			className={`relative ${credentialStatus()} 
      flex cursor-pointer h-48 w-52 max-w-xs flex-col justify-end rounded-3xl hover:scale-105 transition-all duration-300`}
			onClick={props.onClick}
		>
			<img
				src={props.picture}
				className="w-16 translate-x-32 translate-y-10"
				alt="logo"
			/>
			<div className="rounded-2xl h-36 w-full bg-neutral-100 shadow-2xl">
				<div className="flex items-center justify-between p-4 h-12">
					<h3 className="font-nunito font-medium break-words text-sm">
						{props.title}
					</h3>
					<Kebab
						onUpdateClick={() => props.onUpdateClick(props.index)}
						onDeleteClick={() => props.onDeleteClick(props.index)}
						onRecoverClick={() => props.onRecoverClick(props.index)}
						onPermanentRemoveClick={() =>
							props.onPermanentRemoveClick(props.index)
						}
						isTrashed={props.isTrashed}
					></Kebab>
				</div>
				<div className=" flex flex-col text-center items-center justify-center gap-1 h-24 ">
					<p className="text-xs font-medium font-nunito break-words">
						{props.username}
					</p>
					<p className="text-xs font-nunito font-light break-words">
						Created: {props.dateCreated}
					</p>
					<p className="text-xs font-nunito font-light break-words">
						Last updated: {props.dateUpdated}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
