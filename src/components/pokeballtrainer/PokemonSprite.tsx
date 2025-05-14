import type { PokemonData } from "../../context/PokemonContext";

interface PokemonSprite {
	selectedPokemons: PokemonData[];
}

const PokemonSprite = ({ selectedPokemons }: PokemonSprite) => {
	if (selectedPokemons.length === 0) return <p>Connexion via PC de Léo... !</p>;

	return (
		<>
			{selectedPokemons.map((pokemon, index) => (
				<div key={pokemon.id} className={`pkmn${index + 1}`}>
					<img src={pokemon.image} alt={pokemon.name} />
				</div>
			))}
		</>
	);
};

export default PokemonSprite;
