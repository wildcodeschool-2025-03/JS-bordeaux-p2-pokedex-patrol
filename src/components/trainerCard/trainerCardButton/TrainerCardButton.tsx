import { useState } from "react";

function TrainerCardButton({ onToggleTrainerCard }) {
	const [activeImage, setActiveImage] = useState(false);
	const handleClick = () => {
		setActiveImage(true);
	};
	return (
		<img
			src="src/assets/images/trainerCard/trainer_card.svg"
			alt="trainer card"
			onClick={onToggleTrainerCard}
			onKeyDown={(e) => e.key === "Enter" && handleClick()}
		/>
	);
}

export default TrainerCardButton;
