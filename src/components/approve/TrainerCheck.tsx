import { useState, useRef } from "react";
import ResultScreen from "../endscreen/ResultScreen";
import Buttons from "../button/Buttons";

interface Trainer {
	name: string;
	isTrainerLegitimate: boolean;
}

function TrainerCheck() {
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

	const [currentTrainer, setcurrentTrainer] = useState(0);
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const nbrLegitimateTrainer = useRef(0);
	const nbrFraudulentTrainer = useRef(0);
	const [trainerArea, setTrainerArea] = useState<Trainer[]>([]);

	const handleClick = (action: "approve" | "deny") => {
		const current = trainers[currentTrainer];
		if (current.isTrainerLegitimate === false && action === "approve") {
			setScore((prev) => prev - 100);
			nbrFraudulentTrainer.current++;
		} else if (action === "deny") {
			setScore((prev) => prev + 0);
		} else {
			setScore((prev) => prev + 100);
			nbrLegitimateTrainer.current++;
			setTrainerArea((prev) => [...prev, current]);
		}

		if (currentTrainer === trainers.length - 1) {
			setIsGameOver(true);
		} else {
			setcurrentTrainer((prev) => prev + 1);
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
					<h2>Dresseur</h2>
					<h3>{trainers[currentTrainer]?.name}</h3>
					<Buttons
						onApprove={() => handleClick("approve")}
						onDeny={() => handleClick("deny")}
					/>
					<h3>{trainerArea.map((t) => t.name).join(", ")}</h3>
				</>
			)}
		</>
	);
}

export default TrainerCheck;
