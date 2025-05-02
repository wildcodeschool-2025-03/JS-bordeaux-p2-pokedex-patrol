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

	const toggleNotebook = () => setIsNotebookOpen((prev) => !prev);

	return (
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

			<TrainerCheck />
		</div>
	);
}

export default Game;
