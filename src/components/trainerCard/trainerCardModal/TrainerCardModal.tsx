import "./TrainerCardModal.css";
interface Trainer {
	id: number;
	declaredName: string;
	cardName: string;
	declaredRegion: string;
	cardRegion: string;
	portraitImage: string;
	cardPortrait: string;
	isTrainerCorrupted: boolean;
}
interface TrainerCardModalInterface {
	trainer: Trainer;
	onToggleTrainerCard: () => void;
}

function TrainerCardModal({
	onToggleTrainerCard,
	trainer,
}: TrainerCardModalInterface) {
	return (
		<div
			className="trainer-card"
			onClick={onToggleTrainerCard}
			onKeyDown={onToggleTrainerCard}
		>
			<div className="modal_overlay">
				<div className={`trainer_card region_${trainer.cardRegion}`}>
					<h2 className="trainer_name">{trainer.cardName}</h2>
					<img
						className="trainer_image"
						src={trainer.cardPortrait}
						alt="le dresseur"
					/>
				</div>
			</div>
		</div>
	);
}

export default TrainerCardModal;
