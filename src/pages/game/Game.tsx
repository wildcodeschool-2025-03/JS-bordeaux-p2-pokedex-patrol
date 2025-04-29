import React, { useState } from "react";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";

function Game() {
	const [activeImage, setActiveImage] = useState(false);

	const handleClick = () => {
		setActiveImage(true);
	};

	return (
		<>
			<div className="hud_pokedexpatrol">
				<div className="gamewindow">
					<img
						className="pkmn1"
						src="src/assets/images/test_img/test_pkmn1.svg"
						alt="pkmn1 pour test"
					/>
					<img
						className="pkmn2"
						src="src/assets/images/test_img/test_pkmn2.svg"
						alt="pkmn2 pour test"
					/>
					<img
						className="pkmn3"
						src="src/assets/images/test_img/test_pkmn3.svg"
						alt="pkmn3 pour test"
					/>
					<img
						className="trainer"
						src="src/assets/images/test_img/test_trainer.svg"
						alt="trainer pour test"
					/>
					<img
						className="windowsill"
						src="src/assets/images/hud/game_window.svg"
						alt="fenêtre de jeu"
					/>
				</div>

				<div className="gamedesk">
					<div className="temoinofficiel">
						<img
							src="src/assets/images/test_img/test_temoin.svg"
							alt="Le témoin officiel de tous les pokedexpatrolleurs"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="pokedex">
						<img
							src="src/assets/images/test_img/test_pokedex.svg"
							alt="Ceci est un pokédex"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="trainercheck">
						<TrainerCheck />
					</div>
					<div className="pokeballtrainer">
						<img
							src="src/assets/images/test_img/test_pokeball.svg"
							alt="Ceci est la pokéball du dresseur qui se présente au péage"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="idtrainer">
						<img
							src="src/assets/images/test_img/test_permistrainer.svg"
							alt="Ceci est le permis du dresseur qui se présente au péage"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
				</div>
			</div>

			{activeImage && (
				<div className="information-box">
					<p>Information à venir</p>
				</div>
			)}
		</>
	);
}

export default Game;
