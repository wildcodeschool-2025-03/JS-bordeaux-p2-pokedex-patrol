import { useEffect, useRef, useState } from "react";
import hoennCard from "../../assets/images/verif/trainer_card_hoenn.svg";
import kantoCard from "../../assets/images/verif/trainer_card_kanto.svg";
import sinnohCard from "../../assets/images/verif/trainer_card_sinnoh.svg";
import unysCard from "../../assets/images/verif/trainer_card_unys.svg";
import Notebook from "../../components/Notebook/Button/NotebookButton";
import CarouselOverlay from "../../components/Notebook/Licences/Licences";
import Modal from "../../components/Notebook/Modal/NotebookModal";
import TrainerCard from "../../components/trainerCard/TrainerCard";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import WildTrainer from "../../components/WildTrainer";
import Pokedex from "../../components/pokedex/Pokedex";
import { usePokemonContext } from "../../context/PokemonContext";
import trainersData from "../../db/trainers.json";

interface NameEntry {
	name: string;
	language: { name: string; url: string };
}

interface TypeEntry {
	slot: number;
	type: { name: string; url: string };
}

interface TrainerInterface {
	id: number;
	nameTrainer: string;
	imgTrainer: string;
	imgTrainerCrop: string;
	RegionsTrainer: string;
	isTrainerCorrupted: boolean;
}

const getRandomPokemonIds = () => {
	const ids = new Set<number>();
	while (ids.size < 30) {
		ids.add(Math.floor(Math.random() * 251) + 1);
	}
	return Array.from(ids);
};

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

const cardSvgs = [hoennCard, kantoCard, sinnohCard, unysCard];
const cardNames = ["Hoenn", "Kanto", "Sinnoh", "Unys"];

function Game() {
	const [showTrainerCard, setShowTrainerCard] = useState(false);
	const { setPokemonData } = usePokemonContext();

	const [trainers, setTrainers] = useState<TrainerInterface[]>([]);
	const [selectedTrainer, setSelectedTrainer] = useState<JSX.Element | null>(
		null,
	);
	const [isNotebookOpen, setIsNotebookOpen] = useState(false);
	const notebookRef = useRef<HTMLButtonElement>(null);
	const [activeImage, setActiveImage] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentTrainer, setCurrentTrainer] = useState(0);
	const [totalTrainers, setTotalTrainers] = useState(0);

	const handleClick = () => {
		setActiveImage(true);
	};
	const toggleTrainerCard = () => {
		setShowTrainerCard(!showTrainerCard);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
	};
	useEffect(() => {
		const fetchPokemons = async () => {
			const ids = getRandomPokemonIds();

			const promises = ids.map(async (id) => {
				const [pokemonRes, speciesRes] = await Promise.all([
					fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
						res.json(),
					),
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
						res.json(),
					),
				]);

				const frenchNameEntry = speciesRes.names.find(
					(entry: NameEntry) => entry.language.name === "fr",
				);

				return {
					id: pokemonRes.id,
					name: frenchNameEntry?.name || pokemonRes.name,
					image: pokemonRes.sprites.front_default,
					weight: pokemonRes.weight,
					height: pokemonRes.height,
					types: pokemonRes.types.map((t: TypeEntry) => t.type.name),
				};
			});

			const clearData = await Promise.all(promises);
			setPokemonData(clearData);
		};

		fetchPokemons();
	}, [setPokemonData]);

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

	const handleNotebookClick = () => {
		setIsNotebookOpen(true);
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
					<img
						id="trainer"
						src="src/assets/images/test_img/test_trainer.svg"
						alt="trainer pour test"
					/>
					<img
						id="window_sill"
						src="src/assets/images/hud/game_window.svg"
						alt="fenêtre de jeu"
					/>
					<p id="counter">
						{currentTrainer + 1} / {totalTrainers}
					</p>
				</div>

				<div className="game_desk">
					<div className="official_witness">
						<div className="game-container">
							{!isNotebookOpen && (
								<Notebook
									notebookRef={notebookRef}
									onClick={handleNotebookClick}
									open={false}
								/>
							)}
							{isNotebookOpen && (
								<Modal onClose={() => setIsNotebookOpen(false)}>
									<div
										style={{
											position: "relative",
											width: "950px",
											height: "950px",
											margin: "0 auto",
										}}
									>
										<Notebook notebookRef={notebookRef} open={true} />
										<CarouselOverlay
											cardSvgs={cardSvgs}
											cardNames={cardNames}
										/>
									</div>
								</Modal>
							)}
						</div>
					</div>
					<div className="pokedex_hud">
						<Pokedex />
					</div>
					<div className="trainer_check">
						<TrainerCheck
							currentTrainer={currentTrainer}
							setCurrentTrainer={setCurrentTrainer}
							onApprove={() => handleNext(true)}
							onDeny={() => handleNext(false)}
							onSetTotalTrainers={setTotalTrainers}
						/>
					</div>
					<div className="pokeball_trainer">
						<img
							src="src/assets/images/test_img/test_pokeball.svg"
							alt="Ceci est la pokéball du dresseur qui se présente au péage"
						/>
					</div>
					<div className="id_trainer">
						{showTrainerCard ? (
							<TrainerCard
								onToggleTrainerCard={toggleTrainerCard}
								currentIndex={currentIndex}
								handleNext={handleNext}
							/>
						) : (
							<img
								src="src/assets/images/trainerCard/trainer_card.svg"
								alt="trainer card"
								onClick={toggleTrainerCard}
								onKeyDown={(e) => e.key === "Enter" && handleClick()}
							/>
						)}
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur qui se présente au péage"
						/>
					</div>
				</div>
			</div>

			<div>
				<button type="button" onClick={pickWildTrainer}>
					Prochain dresseur !
				</button>
				<div>{selectedTrainer}</div>
			</div>
		</>
	);
}

export default Game;
