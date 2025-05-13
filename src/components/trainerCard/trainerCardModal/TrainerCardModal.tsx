import "./TrainerCardModal.css";
import trainers from "../../../db/trainers.json";

function TrainerCardModal({ onToggleTrainerCard, currentIndex }) {
	const currentTrainer = trainers[currentIndex];
	return (
		<div
			className="trainer-card"
			onClick={onToggleTrainerCard}
			onKeyDown={onToggleTrainerCard}
		>
			<div className="modal_overlay">
				<div className={`trainer_card region_${currentTrainer.cardRegion}`}>
					<h2 className="trainer_name">{currentTrainer.declaredName}</h2>
					<img
						className="trainer_image"
						src={currentTrainer.portraitImage}
						alt="le dresseur"
					/>
				</div>
			</div>
		</div>
	);
}

export default TrainerCardModal;
