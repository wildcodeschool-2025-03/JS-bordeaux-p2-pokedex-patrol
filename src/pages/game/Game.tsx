import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import { useEffect, useState } from "react";
import {
	type TrainerInterface,
	getRandomTrainers,
} from "../../algo/trainerList";
import WildTrainer from "../../components/WildTrainer";

function Game() {
	const [trainers, setTrainers] = useState<TrainerInterface[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedTrainer, setSelectedTrainer] = useState<JSX.Element | null>(
		null,
	);
	const [activeImage, setActiveImage] = useState(false);

	const handleClick = () => {
		setActiveImage(true);
	};

	useEffect(() => {
		setTrainers(getRandomTrainers());
	}, []);

	const pickWildTrainer = () => {
		if (currentIndex < 10) {
			setSelectedTrainer(<WildTrainer trainers={trainers[currentIndex]} />);

			setCurrentIndex((prev) => prev + 1);
		} else {
			setSelectedTrainer(<p>Fin des dresseurs !</p>);
		}
	};

	return (
		<>
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
					<div className="trainer_check">
						<TrainerCheck />
					</div>
					<div className="pokeball_trainer">
						<img
							src="src/assets/images/test_img/test_pokeball.svg"
							alt="Ceci est la pokéball du dresseur qui se présente au péage"
							onClick={handleClick}
							onKeyDown={(e) => e.key === "a" && handleClick()}
						/>
					</div>
					<div className="id_trainer">
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
				<div className="information_box">
					<p>Information à venir</p>
				</div>
			)}
			<div>
				<button type="button" onClick={pickWildTrainer}>
					Prochain dresseur !
				</button>
				<div>{selectedTrainer}</div>
			</div>
		</>
	);
}

export default Game;
