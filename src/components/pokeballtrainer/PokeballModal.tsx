import type { PokemonData } from "../../context/PokemonContext";
import "./PokeballModal.css";

interface PokeballModal {
	pokemonData: PokemonData[];
	onClose: () => void;
}

const PokeballModal = ({ pokemonData, onClose }: PokeballModal) => {
	return (
		<div
			className="pokeball-overlay"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			onKeyDown={(e) => e.key === "b" && onClose()}
		>
			<div className="pokeball-content">
				<div className="pokeball-trainer-list">
					{pokemonData.map((pokemon) => (
						<div key={pokemon.id} className="pokeball-card">
							<div className="pokemon-sprite">
								<img src={pokemon.image} alt={pokemon.name} />
							</div>
							<div className="pokemon-info">
								<div className="pokemon-name">
									<h3>{pokemon.name}</h3>
								</div>
								<div className="pokemon-status">
									<p>
										{pokemon.weight / 10} kg / {pokemon.height * 10} cm /
										{pokemon.types[0]}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PokeballModal;
