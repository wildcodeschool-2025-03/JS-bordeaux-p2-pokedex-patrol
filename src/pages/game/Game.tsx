import "./Game.css";
import { useEffect, useState } from "react";
import PokeballTrainer from "../../components/pokeballtrainer/PokeballTrainer";
import PokemonSprite from "../../components/pokeballtrainer/PokemonSprite";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import { usePokemonContext } from "../../context/PokemonContext";
import type { PokemonData } from "../../context/PokemonContext";

interface NameEntry {
	name: string;
	language: { name: string; url: string };
}

interface TypeEntry {
	slot: number;
	type: { name: string; url: string };
}

const getRandomPokemonIds = () => {
	const ids = new Set<number>();
	while (ids.size < 30) {
		ids.add(Math.floor(Math.random() * 251) + 1);
	}
	return Array.from(ids);
};

function Game() {
	const { pokemonData, setPokemonData } = usePokemonContext();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [shuffledPokemon, setShuffledPokemon] = useState<PokemonData[]>([]);
	const [selectedPokemons, setSelectedPokemons] = useState<PokemonData[]>([]);

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
		if (pokemonData.length >= 30) {
			const shuffled = [...pokemonData].sort(() => 0.5 - Math.random());
			setShuffledPokemon(shuffled);
			setSelectedPokemons(shuffled.slice(0, 3));
			setCurrentIndex(3);
		}
	}, [pokemonData]);

	const getNextPokemonsForTrainer = () => {
		if (currentIndex + 3 <= shuffledPokemon.length) {
			const nextPokemons = shuffledPokemon.slice(
				currentIndex,
				currentIndex + 3,
			);
			setSelectedPokemons(nextPokemons);
			setCurrentIndex(currentIndex + 3);
		}
	};

	return (
		<>
			<div className="hud_pokedexpatrol">
				<div className="game_window">
					<PokemonSprite selectedPokemons={selectedPokemons} />

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
				</div>

				<div className="game_desk">
					<div className="official_witness">
						<img
							src="src/assets/images/test_img/test_temoin.svg"
							alt="Le témoin officiel de tous les pokedexpatrolleurs"
						/>
					</div>
					<div className="pokedex">
						<img
							src="src/assets/images/test_img/test_pokedex.svg"
							alt="Ceci est un pokédex"
						/>
					</div>

					<div className="trainer_check">
						<TrainerCheck onNextTrainer={getNextPokemonsForTrainer} />
					</div>

					<div className="pokeball_trainer">
						<PokeballTrainer selectedPokemons={selectedPokemons} />
					</div>
					<div className="id_trainer">
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Game;
