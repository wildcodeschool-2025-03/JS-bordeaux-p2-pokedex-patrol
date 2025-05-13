import "./Game.css";
import { useEffect, useState } from "react";
import PokeballTrainer from "../../components/pokeballtrainer/PokeballTrainer";
import PokemonSprite from "../../components/pokeballtrainer/PokemonSprite";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import { usePokemonContext } from "../../context/PokemonContext";
import type { PokemonData } from "../../context/PokemonContext";

function Game() {
	const { pokemonData } = usePokemonContext();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [shuffledPokemon, setShuffledPokemon] = useState<PokemonData[]>([]);
	const [selectedPokemons, setSelectedPokemons] = useState<PokemonData[]>([]);

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
						<TrainerCheck onNextTrainer={getNextPokemonsForTrainer} />
					</div>

					<div className="pokeball_trainer">
						<PokeballTrainer selectedPokemons={selectedPokemons} />
					</div>
					<div className="id_trainer">
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Game;
