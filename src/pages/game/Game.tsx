import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import { useEffect, useState } from "react";
import {
	type TrainerInterface,
	getRandomTrainers,
} from "../../algo/trainerList";
import WildTrainer from "../../components/WildTrainer";

function Game() {
	const [trainers, setTrainers] = useState<TrainerInterface[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedTrainer, setSelectedTrainer] = useState<JSX.Element | null>(
		null,
	);

	useEffect(() => {
		setTrainers(getRandomTrainers());
	}, []);

	const pickWildTrainer = () => {
		if (currentIndex < 10) {
			setSelectedTrainer(<WildTrainer trainers={trainers[currentIndex]} />);

			setCurrentIndex((prev) => prev + 1);
		} else {
			setSelectedTrainer(<p>Fin des dresseurs !</p>);
		}
	};

	return (
		<div>
			<button type="button" onClick={pickWildTrainer}>
				Prochain dresseur !
			</button>
			<div>{selectedTrainer}</div>
			<TrainerCheck />
		</div>
	);
}

export default Game;
