import {
	createContext,
	useCallback,
	useEffect,
	useState,
	useContext,
} from "react";
import type { ReactNode } from "react";

export interface PokemonData {
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

interface PokemonContextType {
	pokemonData: PokemonData[];
	refreshPokemons: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
	const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

	const getRandomPokemonIds = useCallback(() => {
		const ids = new Set<number>();
		while (ids.size < 30) {
			ids.add(Math.floor(Math.random() * 251) + 1);
		}
		return Array.from(ids);
	}, []);

	const fetchPokemons = useCallback(async () => {
		try {
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
			console.error("Erreur de chargement des Pokémon:", error);
		}
	}, [getRandomPokemonIds]);

	useEffect(() => {
		fetchPokemons();
	}, [fetchPokemons]);

	return (
		<PokemonContext.Provider
			value={{ pokemonData, refreshPokemons: fetchPokemons }}
		>
			{children}
		</PokemonContext.Provider>
	);
};

export const usePokemonContext = () => {
	const context = useContext(PokemonContext);
	if (!context) {
		throw new Error("usePokemonContext must be used within a PokemonProvider");
	}
	return context;
};
