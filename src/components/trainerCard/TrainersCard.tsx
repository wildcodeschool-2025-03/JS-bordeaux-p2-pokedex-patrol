import "./TrainersCard.css";
import trainers from "../../db/trainers.json";

function TrainerCardList({ onToggleTrainerCard, currentIndex }) {
	const currentTrainer = trainers[currentIndex];
	return (
		<div
			className="trainer-card"
			onClick={onToggleTrainerCard}
			onKeyDown={onToggleTrainerCard}
		>
			<div className="modal_overlay">
				<div className={`trainer_card region_${currentTrainer.trainerRegion}`}>
					<h2 className="trainer_name">{currentTrainer.trainerName}</h2>
					<img
						className="trainer_image"
						src={currentTrainer.trainerImgCrop}
						alt="le dresseur"
					/>
					<div className="trainer_badges">
						{currentTrainer.trainerBadges.map((badge, key) => (
							<img
								className="trainer_badge"
								key={badge.imgBadge}
								src={badge.imgBadge}
								alt="badge"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrainerCardList;
