function TrainerCardIcon({ onClick }) {
	return (
		<img
			src="src/assets/images/trainerCard/trainer_card.svg"
			alt="trainer card"
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && handleClick()}
		/>
	);
}

export default TrainerCardIcon;
