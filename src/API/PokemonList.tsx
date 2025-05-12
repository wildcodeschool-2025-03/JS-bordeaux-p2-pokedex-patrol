import { useEffect } from "react";
import { type PokemonData, usePokemonContext } from "../context/PokemonContext";

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

const PokemonList = () => {
	const { setPokemonData, pokemonData } = usePokemonContext();

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
				} as PokemonData;
			});

			const clearData = await Promise.all(promises);
			setPokemonData(clearData);
		};

		fetchPokemons();
	}, [setPokemonData]);

	return (
		<div>
			{pokemonData.map((pokemon) => (
				<div key={pokemon.id}>
					<img src={pokemon.image} alt={pokemon.name} />
					<p>{pokemon.name}</p>
				</div>
			))}
		</div>
	);
};

export default PokemonList;
