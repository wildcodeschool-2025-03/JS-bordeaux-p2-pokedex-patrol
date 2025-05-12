import { type ReactNode, createContext, useContext, useState } from "react";

export interface PokemonData {
	id: number;
	name: string;
	image: string;
	weight: number;
	height: number;
	types: string[];
}

interface PokemonContextType {
	pokemonData: PokemonData[];
	setPokemonData: (data: PokemonData[]) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
	const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

	return (
		<PokemonContext.Provider value={{ pokemonData, setPokemonData }}>
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
