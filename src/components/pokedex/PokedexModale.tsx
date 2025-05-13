import type React from "react";
import type { PokemonData } from "../../context/PokemonContext";
import "./Pokedexmodal.css";

const PokedexModal = ({
	pokemonData,
	onClose,
	filter,
	setFilter,
}: {
	pokemonData: PokemonData[];
	onClose: () => void;
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<div
			className="pokedex-overlay"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			onKeyDown={(e) => {
				if (e.key === "x" || e.key === "X") {
					onClose();
				}
			}}
		>
			<div className="pokedex-content">
				<div className="filter-pokedex">
					<input
						type="text"
						placeholder="Filtrer par nom"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>

				<div className="scroll-pokedex">
					{pokemonData.map((pokemon) => (
						<div key={pokemon.id} className="card-pokemon">
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className="sprite-pokemon"
							/>
							<h3>{pokemon.name}</h3>
							<p>{pokemon.weight / 10} kg</p>
							<p>{pokemon.height * 10} cm</p>
							<p>{pokemon.types[0]}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PokedexModal;
