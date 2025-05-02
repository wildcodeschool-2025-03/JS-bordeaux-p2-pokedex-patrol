import { useCallback, useEffect, useState } from "react";
import "./PokemonList.css";

interface PokemonData {
	id: number;
	name: string;
	image: string;
	weight: number;
	height: number;
	types: string[];
}

interface NameEntry {
	name: string;
	language: {
		name: string;
		url: string;
	};
}

interface TypeEntry {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

const PokemonList = () => {
	const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

	const getRandomPokemonIds = useCallback(() => {
		const ids = new Set();
		while (ids.size < 30) {
			ids.add(Math.floor(Math.random() * 251) + 1);
		}
		return Array.from(ids);
	}, []);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const ids = getRandomPokemonIds();

				const promises = ids.map(async (id) => {
					const [pokemonRes, speciesRes] = await Promise.all([
						fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
							res.json(),
						),
						fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
							(res) => res.json(),
						),
					]);

					const frenchNameEntry = speciesRes.names.find(
						(entry: NameEntry) => entry.language.name === "fr",
					);
					const frenchName = frenchNameEntry
						? frenchNameEntry.name
						: pokemonRes.name;

					return {
						id: pokemonRes.id,
						name: frenchName,
						image: pokemonRes.sprites.front_default,
						weight: pokemonRes.weight,
						height: pokemonRes.height,
						types: pokemonRes.types.map((t: TypeEntry) => t.type.name),
					};
				});

				const clearData = await Promise.all(promises);
				setPokemonData(clearData);
			} catch (error) {
				console.error("Oups...:", error);
			}
		};

		fetchPokemons();
	}, [getRandomPokemonIds]);

	return (
		<div>
			{pokemonData.map((pokemon) => (
				<div className="TrainerPokemon" key={pokemon.id}>
					<img src={pokemon.image} alt={pokemon.name} />
					<p>{pokemon.name}</p>
					<p>{pokemon.weight / 10} : kg</p>
					<p>{pokemon.height * 10} : cm</p>
					<p>{pokemon.types[0]}</p>
				</div>
			))}
		</div>
	);
};

export default PokemonList;
