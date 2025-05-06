import { useRef, useState, useEffect } from "react";
import ResultScreen from "../resultScreen/ResultScreen";
import TrainerCheckButtons from "./trainerCheckButtons/TrainerCheckButtons";

function TrainerCheck({
	onApprove,
	onDeny,
	currentTrainer,
	setCurrentTrainer,
	onSetTotalTrainers,
}) {
	const trainers = [
		{ name: "dresseur1", isTrainerLegitimate: true },
		{ name: "dresseur2", isTrainerLegitimate: true },
		{ name: "dresseur3", isTrainerLegitimate: false },
		{ name: "dresseur4", isTrainerLegitimate: true },
		{ name: "dresseur5", isTrainerLegitimate: true },
		{ name: "dresseur6", isTrainerLegitimate: false },
		{ name: "dresseur7", isTrainerLegitimate: true },
		{ name: "dresseur8", isTrainerLegitimate: true },
		{ name: "dresseur9", isTrainerLegitimate: true },
		{ name: "dresseur10", isTrainerLegitimate: true },
	];
	useEffect(() => {
		onSetTotalTrainers(trainers.length);
	}, [onSetTotalTrainers]);
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const nbrLegitimateTrainer = useRef(0);
	const nbrFraudulentTrainer = useRef(0);

	const handleTrainerCheck = (action: true | false) => {
		const current = trainers[currentTrainer];
		if (current.isTrainerLegitimate) {
			if (action) {
				nbrLegitimateTrainer.current++;
				setScore((prev) => prev + 100);
			} else {
				setScore((prev) => prev - 100);
			}
		} else {
			if (action) {
				setScore((prev) => prev - 150);
				nbrFraudulentTrainer.current++;
			} else {
				setScore((prev) => prev + 150);
			}
		}

		if (currentTrainer === trainers.length - 1) {
			setIsGameOver(true);
		} else {
			setCurrentTrainer((prev) => prev + 1);
		}
	};

	return (
		<>
			{isGameOver ? (
				<ResultScreen
					trainers={trainers}
					score={score}
					nbrLegitimateTrainer={nbrLegitimateTrainer.current}
					nbrFraudulentTrainer={nbrFraudulentTrainer.current}
				/>
			) : (
				<>
					<TrainerCheckButtons
						onApprove={() => {
							handleTrainerCheck(true);
							onApprove(true);
						}}
						onDeny={() => {
							handleTrainerCheck(false);
							onDeny(false);
						}}
					/>
				</>
			)}
		</>
	);
}

export default TrainerCheck;
