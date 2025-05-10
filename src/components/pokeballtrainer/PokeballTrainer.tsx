import type { PokemonData } from "../../context/PokemonContext";
import { useState } from "react";
import PokeballModal from "./PokeballModal";

interface PokeballTrainer {
	selectedPokemons: PokemonData[];
}

const PokeballTrainer = ({ selectedPokemons }: PokeballTrainer) => {
	const [isPokeballOpen, setIsPokeballOpen] = useState(false);

	const openPokeball = () => setIsPokeballOpen(true);
	const closePokeball = () => setIsPokeballOpen(false);

	return (
		<div>
			<img
				src="/src/assets/images/hud/pokeball_hud.svg"
				alt="Pokéball fermé"
				onClick={openPokeball}
				onKeyDown={(e) => e.key === "b" && openPokeball()}
			/>
			{isPokeballOpen && (
				<PokeballModal pokemonData={selectedPokemons} onClose={closePokeball} />
			)}
		</div>
	);
};

export default PokeballTrainer;
