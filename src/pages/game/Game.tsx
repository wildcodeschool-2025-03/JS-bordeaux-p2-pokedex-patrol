import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import { useEffect, useState } from "react";
import WildTrainer from "../../components/WildTrainer";
import trainersData from "../../db/trainers.json";

export interface TrainerInterface {
	id: number;
	nameTrainer: string;
	imgTrainer: string;
	imgTrainerCrop: string;
	RegionsTrainer: string;
	isTrainerCorrupted: boolean;
}

const trainers = trainersData as unknown as TrainerInterface[];

const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
	}
	return shuffled;
};

type CorruptibleTrainerKey = keyof Pick<
	TrainerInterface,
	"nameTrainer" | "imgTrainer" | "imgTrainerCrop" | "RegionsTrainer"
>;

const getRandomTrainers = (trainerCount = 10): TrainerInterface[] => {
	const selectedTrainers = shuffleArray(trainers).slice(0, trainerCount);
	const numberOfFakeTrainers = Math.floor(Math.random() * 3) + 2;

	const indicesToCorrupt = shuffleArray([
		...Array(selectedTrainers.length).keys(),
	]).slice(0, numberOfFakeTrainers);

	const propertiesToCorrupt = shuffleArray<CorruptibleTrainerKey>([
		"nameTrainer",
		"imgTrainer",
		"imgTrainerCrop",
		"RegionsTrainer",
	]).slice(0, numberOfFakeTrainers);

	for (let i = 0; i < indicesToCorrupt.length; i++) {
		const index = indicesToCorrupt[i];
		const prop = propertiesToCorrupt[i];
		const sourceIndex = (index + 4) % selectedTrainers.length;

		selectedTrainers[index].isTrainerCorrupted = true;
		selectedTrainers[index][prop] = selectedTrainers[sourceIndex][prop];
	}

	return selectedTrainers;
};

function Game() {
	const [trainers, setTrainers] = useState<TrainerInterface[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedTrainer, setSelectedTrainer] = useState<JSX.Element | null>(
		null,
	);
	const [activeImage, setActiveImage] = useState(false);

	const handleClick = () => {
		setActiveImage(true);
	};

	useEffect(() => {
		const randomTrainers = getRandomTrainers();
		setTrainers(randomTrainers);

		const timeout = setTimeout(() => {
			setSelectedTrainer(<WildTrainer trainers={randomTrainers[0]} />);
		}, 3000);

		return () => clearTimeout(timeout);
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
		<>
			<div className="hud_pokedexpatrol">
				<div className="game_window">
					<img
						id="pkmn1"
						src="src/assets/images/test_img/test_pkmn1.svg"
						alt="pkmn1 pour test"
					/>
					<img
						id="pkmn2"
						src="src/assets/images/test_img/test_pkmn2.svg"
						alt="pkmn2 pour test"
					/>
					<img
						id="pkmn3"
						src="src/assets/images/test_img/test_pkmn3.svg"
						alt="pkmn3 pour test"
					/>
					<div id="trainer">{selectedTrainer}</div>
					<img
						id="window_sill"
						src="src/assets/images/hud/game_window.svg"
						alt="fenêtre de jeu"
					/>
				</div>

				<div className="game_desk">
					<div className="official_witness">
						<img
							src="src/assets/images/test_img/test_temoin.svg"
							alt="Le témoin officiel de tous les pokedexpatrolleurs"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="pokedex">
						<img
							src="src/assets/images/test_img/test_pokedex.svg"
							alt="Ceci est un pokédex"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="trainer_check">
						<TrainerCheck pickWildTrainer={pickWildTrainer} />
					</div>
					<div className="pokeball_trainer">
						<img
							src="src/assets/images/test_img/test_pokeball.svg"
							alt="Ceci est la pokéball du dresseur qui se présente au péage"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="id_trainer">
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur qui se présente au péage"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
				</div>
			</div>
			{activeImage && (
				<div className="information_box">
					<p>Information à venir</p>
				</div>
			)}
		</>
	);
}

export default Game;
