import { useRef, useState } from "react";
import hoennCard from "../../assets/images/verif/carte_dresseur_hoenn.svg";
import kantoCard from "../../assets/images/verif/carte_dresseur_kanto.svg";
import sinnohCard from "../../assets/images/verif/carte_dresseur_sinnoh.svg";
import unysCard from "../../assets/images/verif/carte_dresseur_unys.svg";
import CarouselOverlay from "../../components/CarouselOverlay/CarouselOverlay";
import Modal from "../../components/Modal/Modal";
import Notebook from "../../components/Notebook/Notebook";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";

const cardSvgs = [hoennCard, kantoCard, sinnohCard, unysCard];
const cardNames = ["Hoenn", "Kanto", "Sinnoh", "Unys"];

function Game() {
	const [isNotebookOpen, setIsNotebookOpen] = useState(false);
	const notebookRef = useRef<HTMLDivElement>(null);
	const [activeImage, setActiveImage] = useState(false);

	const handleClick = () => {
		setActiveImage(true);
	};

	const toggleNotebook = () => setIsNotebookOpen((prev) => !prev);

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
						<div className="game-container">
							{!isNotebookOpen && (
								<Notebook
									isOpen={isNotebookOpen}
									onToggle={toggleNotebook}
									notebookRef={notebookRef}
								/>
							)}
							<Modal isOpen={isNotebookOpen} onClose={toggleNotebook}>
								<Notebook
									isOpen={true}
									onToggle={toggleNotebook}
									notebookRef={notebookRef}
								/>
								<CarouselOverlay cardSvgs={cardSvgs} cardNames={cardNames} />
							</Modal>
						</div>
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
		</>
	);
}

export default Game;
