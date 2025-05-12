import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import PokemonList from "../../API/PokemonList";
import Pokedex from "../../components/pokedex/Pokedex";

function Game() {
	return (
		<>
			<div className="PokemonList">
				<PokemonList />
			</div>

			<div className="hud_pokedexpatrol">
				<div className="game_window">
					<img
						id="pkmn1"
						src="src/assets/images/test_img/test_pkmn1.svg"
						alt="pkmn1 pour test"
					/>
					<img
						id="pkmn2"
						src="src/assets/images/test_img/test_pkmn2.svg"
						alt="pkmn2 pour test"
					/>
					<img
						id="pkmn3"
						src="src/assets/images/test_img/test_pkmn3.svg"
						alt="pkmn3 pour test"
					/>
					<img
						id="trainer"
						src="src/assets/images/test_img/test_trainer.svg"
						alt="trainer pour test"
					/>
					<img
						id="window_sill"
						src="src/assets/images/hud/game_window.svg"
						alt="fenêtre de jeu"
					/>
				</div>

				<div className="game_desk">
					<div className="official_witness">
						<img
							src="src/assets/images/test_img/test_temoin.svg"
							alt="Le témoin officiel de tous les pokedexpatrolleurs"
						/>
					</div>
					<div className="pokedex_hud">
						<Pokedex />
					</div>
					<div className="trainer_check">
						<TrainerCheck />
					</div>
					<div className="pokeball_trainer">
						<img
							src="src/assets/images/test_img/test_pokeball.svg"
							alt="Ceci est la pokéball du dresseur qui se présente au péage"
						/>
					</div>
					<div className="id_trainer">
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur qui se présente au péage"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Game;
