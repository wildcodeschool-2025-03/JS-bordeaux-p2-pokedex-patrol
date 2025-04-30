import { useState } from "react";
import TrainerCardList from "../../components/trainerCard/trainersCardList/TrainersCardList";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import TrainerCardIcon from "../../components/trainerCard/trainersCardList/trainerCardIcon/TrainerCardIcon";
import Buttons from "../../components/trainerCheck/trainerCheckButtons/TrainerCheckButtons";

function Game() {
	const [showTrainerCard, setShowTrainerCard] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleToggle = () => {
		setShowTrainerCard(!showTrainerCard);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
	};

	return (
		<>
			<TrainerCheck />
			{showTrainerCard ? (
				<TrainerCardList
					onClick={handleToggle}
					currentIndex={currentIndex}
					handleNext={handleNext}
				/>
			) : (
				<TrainerCardIcon onClick={handleToggle} />
			)}
			<Buttons
				onApprove={() => handleNext(true)}
				onDeny={() => handleNext(false)}
			/>
		</>
	);
}

export default Game;
