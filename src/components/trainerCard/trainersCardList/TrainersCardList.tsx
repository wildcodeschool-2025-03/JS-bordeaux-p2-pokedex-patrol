import "./TrainersCardList.css";
import trainers from "../../../db/trainers.json";
import TrainerCardItem from "./trainersCardItem/TrainerCardItem";

function TrainerCardList({ onToggleTrainerCard, currentIndex }) {
	return (
		<div
			className="trainer-card"
			onClick={onToggleTrainerCard}
			onKeyDown={onToggleTrainerCard}
		>
			<TrainerCardItem trainerCard={trainers[currentIndex]} />
		</div>
	);
}

export default TrainerCardList;
