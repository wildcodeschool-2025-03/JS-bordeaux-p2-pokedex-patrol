import { useState } from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import PokedexModal from "./Pokedexmodal.tsx";

const Pokedex = () => {
	const { pokemonData } = usePokemonContext();
	const [isPokedexOpen, setIsPokedexOpen] = useState(false);
	const [filter, setFilter] = useState("");

	const openPokedex = () => {
		setIsPokedexOpen(true);
	};

	const closePokedex = () => {
		setIsPokedexOpen(false);
	};

	const filteredPokemon = pokemonData.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(filter.toLowerCase()),
	);

	return (
		<div>
			<img
				src="/src/assets/images/hud/pokedexhud.svg"
				alt="Pokedex fermé"
				onClick={openPokedex}
				onKeyDown={(e) => e.key === "p" && openPokedex()}
			/>

			{isPokedexOpen && (
				<PokedexModal
					pokemonData={filteredPokemon}
					onClose={closePokedex}
					filter={filter}
					setFilter={setFilter}
				/>
			)}
		</div>
	);
};

export default Pokedex;
