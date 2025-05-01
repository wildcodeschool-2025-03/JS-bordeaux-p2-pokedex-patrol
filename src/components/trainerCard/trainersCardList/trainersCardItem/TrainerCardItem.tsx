import "./TrainerCardItem.css";

function TrainerCardItem({ trainerCard }) {
	return (
		<div className="modal_overlay">
			<div className={`trainer_card region_${trainerCard.trainerRegion}`}>
				<h2 className="trainer_name">{trainerCard.trainerName}</h2>
				<img
					className="trainer_image"
					src={trainerCard.trainerImgCrop}
					alt="le dresseur"
				/>
				<div className="trainer_badges">
					{trainerCard.trainerBadges.map((badge, key) => (
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
	);
}

export default TrainerCardItem;
