import { useEffect, useState, useRef } from "react";
import hoennCard from "../../assets/images/verif/trainer_card_hoenn.svg";
import kantoCard from "../../assets/images/verif/trainer_card_kanto.svg";
import sinnohCard from "../../assets/images/verif/trainer_card_sinnoh.svg";
import unysCard from "../../assets/images/verif/trainer_card_unys.svg";
import Notebook from "../../components/Notebook/Button/NotebookButton";
import CarouselOverlay from "../../components/Notebook/Licences/Licences";
import Modal from "../../components/Notebook/Modal/NotebookModal";
import PokeballTrainer from "../../components/pokeballtrainer/PokeballTrainer";
import PokemonSprite from "../../components/pokeballtrainer/PokemonSprite";
import TrainerCardModal from "../../components/trainerCard/trainerCardModal/TrainerCardModal";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import type { PokemonData } from "../../context/PokemonContext";
import "./Game.css";
import Jenny from "../../components/Jenny/Jenny";
import WildTrainer from "../../components/WildTrainer";
import Pokedex from "../../components/pokedex/Pokedex";
import TrainerCardButton from "../../components/trainerCard/trainerCardButton/TrainerCardButton";
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
	declaredName: string;
	cardName: string;
	declaredRegion: string;
	cardRegion: string;
	portraitImage: string;
	cardPortrait: string;
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
	"cardName" | "portraitImage" | "cardRegion" | "declaredRegion"
>;

const getRandomTrainers = (trainerCount = 10): TrainerInterface[] => {
	const selectedTrainers = shuffleArray(trainers).slice(0, trainerCount);
	const numberOfFakeTrainers = Math.floor(Math.random() * 3) + 2;

	const indicesToCorrupt = shuffleArray([
		...Array(selectedTrainers.length).keys(),
	]).slice(0, numberOfFakeTrainers);

	const propertiesToCorrupt = shuffleArray<CorruptibleTrainerKey>([
		"cardName",
		"portraitImage",
		"cardRegion",
		"declaredRegion",
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
	const [shuffledPokemon, setShuffledPokemon] = useState<PokemonData[]>([]);
	const [selectedPokemons, setSelectedPokemons] = useState<PokemonData[]>([]);
	const [showTrainerCard, setShowTrainerCard] = useState(false);
	const { setPokemonData } = usePokemonContext();

	const [trainers, setTrainers] = useState<TrainerInterface[]>([]);
	const [currentIndex, setCurrentIndex] = useState(1);
	const [currentPokemonIndex, setCurrentPokemonIndex] = useState(3);

	const [selectedTrainer, setSelectedTrainer] = useState<JSX.Element | null>(
		null,
	);
	const [isNotebookOpen, setIsNotebookOpen] = useState(false);
	const notebookRef = useRef<HTMLButtonElement>(null);

	const toggleTrainerCard = () => {
		setShowTrainerCard(!showTrainerCard);
	};

	useEffect(() => {
		if (window.homeMusic) {
			window.homeMusic.pause();
			window.homeMusic.currentTime = 0;
		}

		if (!window.jadeMusic) {
			const music = new Audio("src/assets/music/jade.mp3");
			music.loop = true;
			window.jadeMusic = music;
		}
		window.jadeMusic.play();

		return () => {
			window.jadeMusic?.pause();
			window.jadeMusic.currentTime = 0;
		};
	}, []);

	useEffect(() => {
		if (currentIndex >= 10 && window.jadeMusic) {
			const audio = window.jadeMusic;

			const fadeOut = setInterval(() => {
				if (audio.volume > 0.05) {
					audio.volume -= 0.05;
				} else {
					audio.volume = 0;
					audio.pause();
					clearInterval(fadeOut);
				}
			}, 100);
		}
	}, [currentIndex]);

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

			const allPokemonData = await Promise.all(promises);

			setPokemonData(allPokemonData);

			const shuffled = [...allPokemonData].sort(() => Math.random() - 0.5);
			setShuffledPokemon(shuffled);
			setTimeout(() => {
				setSelectedPokemons(shuffled.slice(0, 3));
			}, 2000);
		};

		fetchPokemons();
	}, [setPokemonData]);

	const getNextPokemonsForTrainer = () => {
		if (currentPokemonIndex + 3 <= shuffledPokemon.length) {
			const nextPokemons = shuffledPokemon.slice(
				currentPokemonIndex,
				currentPokemonIndex + 3,
			);
			setSelectedPokemons(nextPokemons);
			setCurrentPokemonIndex(currentPokemonIndex + 3);
		}
	};

	useEffect(() => {
		const randomTrainers = getRandomTrainers();
		setTrainers(randomTrainers);

		const timeout = setTimeout(() => {
			setSelectedTrainer(<WildTrainer trainers={randomTrainers[0]} />);
		}, 1500);

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

	const handleNotebookClick = () => {
		setIsNotebookOpen(true);
	};

	return (
		<>
			<div className="hud_pokedexpatrol">
				<div className="game_window">
					<PokemonSprite selectedPokemons={selectedPokemons} />

					<div id="trainer">{selectedTrainer}</div>
					<img
						id="window_sill"
						src="src/assets/images/hud/game_window.svg"
						alt="fenêtre de jeu"
					/>
					<p id="counter">{currentIndex} / 10</p>
				</div>

				<div className="game_desk">
					<div className="Jenny">
						<Jenny />
					</div>
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
							pickWildTrainer={pickWildTrainer}
							trainer={trainers[currentIndex - 1]}
							onNextTrainer={getNextPokemonsForTrainer}
						/>
					</div>

					<div className="pokeball_trainer">
						<PokeballTrainer selectedPokemons={selectedPokemons} />
					</div>
					<div className="id_trainer">
						{showTrainerCard ? (
							<TrainerCardModal
								onToggleTrainerCard={toggleTrainerCard}
								trainer={trainers[currentIndex - 1]}
							/>
						) : (
							<TrainerCardButton onToggleTrainerCard={toggleTrainerCard} />
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Game;
