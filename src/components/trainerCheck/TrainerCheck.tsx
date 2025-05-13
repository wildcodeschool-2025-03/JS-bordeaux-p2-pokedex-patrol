import { useRef, useState } from "react";
import ResultScreen from "../resultScreen/ResultScreen";
import TrainerCheckButtons from "./trainerCheckButtons/TrainerCheckButtons";
interface TrainerInterface {
	id: number;
	declaredName: string;
	cardName: string;
	declaredRegion: string;
	cardRegion: string;
	portraitImage: string;
	cardPortrait: string;
	isTrainerCorrupted: boolean;
}
interface TrainerCheckProps {
	pickWildTrainer: () => void;
	trainer: TrainerInterface;
}

function TrainerCheck({ pickWildTrainer, trainer }: TrainerCheckProps) {
	const [currentTrainer, setCurrentTrainer] = useState(0);
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const nbrLegitimateTrainer = useRef(0);
	const nbrCorruptedTrainer = useRef(0);
	const nbrLegitimateTrainerDenied = useRef(0);

	const handleTrainerCheck = (action: true | false) => {
		pickWildTrainer();
		if (trainer.isTrainerCorrupted === false) {
			if (action) {
				nbrLegitimateTrainer.current++;
				setScore((prev) => prev + 100);
			} else {
				setScore((prev) => prev - 100);
				nbrLegitimateTrainerDenied.current++;
			}
		} else {
			if (action) {
				setScore((prev) => prev - 150);
				nbrCorruptedTrainer.current++;
			} else {
				setScore((prev) => prev + 150);
			}
		}

		if (currentTrainer === 9) {
			setIsGameOver(true);
		} else {
			setCurrentTrainer((prev) => prev + 1);
		}
	};

	return (
		<>
			{isGameOver ? (
				<ResultScreen
					score={score}
					nbrLegitimateTrainer={nbrLegitimateTrainer.current}
					nbrCorruptedTrainer={nbrCorruptedTrainer.current}
					nbrLegitimateTrainerDenied={nbrLegitimateTrainerDenied.current}
				/>
			) : (
				<>
					<TrainerCheckButtons
						onApprove={() => {
							handleTrainerCheck(true);
						}}
						onDeny={() => {
							handleTrainerCheck(false);
						}}
					/>
				</>
			)}
		</>
	);
}

export default TrainerCheck;
