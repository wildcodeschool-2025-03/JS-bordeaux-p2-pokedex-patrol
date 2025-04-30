import "./TrainerCardItem.css";

function TrainerCardItem({ trainerCard }) {
	return (
		<div className={`trainer-card region_${trainerCard.trainerRegion}`}>
			<h1 className="title">{trainerCard.trainerName}</h1>
			<img
				className="trainer-image"
				src={trainerCard.trainerImgCrop}
				alt="le dresseur"
			/>
			<div className="trainer-badges">
				{trainerCard.trainerBadges.map((badge, key) => (
					<img
						className="trainer-badge"
						key={badge.imgBadge}
						src={badge.imgBadge}
						alt="badge"
					/>
				))}
			</div>
		</div>
	);
}

export default TrainerCardItem;
