import { useState } from "react";
import type { PokemonData } from "../../context/PokemonContext";
import PokeballModal from "./PokeballModal";

interface PokeballTrainer {
	selectedPokemons: PokemonData[];
}

const PokeballTrainer = ({ selectedPokemons }: PokeballTrainer) => {
	const [isPokeballOpen, setIsPokeballOpen] = useState(false);

	return (
		<div>
			<img
				src="/src/assets/images/hud/pokeball_hud.svg"
				alt="Pokéball fermé"
				onClick={() => setIsPokeballOpen(true)}
				onKeyDown={(e) => e.key === "b"}
			/>
			{isPokeballOpen && (
				<PokeballModal
					pokemonData={selectedPokemons}
					onClose={() => setIsPokeballOpen(false)}
				/>
			)}
		</div>
	);
};

export default PokeballTrainer;
