function TrainerCardIcon({ onClick }) {
	return (
		<button type="button" onClick={onClick}>
			<img
				src="src/assets/images/trainerCard/trainer_card.svg"
				alt="trainer card"
			/>
		</button>
	);
}

export default TrainerCardIcon;
