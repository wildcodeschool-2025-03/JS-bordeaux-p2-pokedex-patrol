import { useState } from "react";
import TrainerCardList from "../../components/trainerCard/trainersCardList/TrainersCardList";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";
import TrainerCardIcon from "../../components/trainerCard/trainersCardList/trainerCardIcon/TrainerCardIcon";

function Game() {
	const [showTrainerCard, setShowTrainerCard] = useState(false);
	const [activeImage, setActiveImage] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentTrainer, setCurrentTrainer] = useState(0);
	const [totalTrainers, setTotalTrainers] = useState(0);

	const handleClick = () => {
		setActiveImage(true);
	};
	const toggleTrainerCard = () => {
		setShowTrainerCard(!showTrainerCard);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
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
					<p id="counter">
						{currentTrainer + 1} / {totalTrainers}
					</p>
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
						<TrainerCheck
							currentTrainer={currentTrainer}
							setCurrentTrainer={setCurrentTrainer}
							onApprove={() => handleNext(true)}
							onDeny={() => handleNext(false)}
							onSetTotalTrainers={setTotalTrainers}
						/>
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
						{showTrainerCard ? (
							<TrainerCardList
								onToggleTrainerCard={toggleTrainerCard}
								currentIndex={currentIndex}
								handleNext={handleNext}
							/>
						) : (
							<TrainerCardIcon onClick={toggleTrainerCard} />
						)}
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
