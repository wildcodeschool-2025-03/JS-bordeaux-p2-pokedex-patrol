import { useLayoutEffect, useRef, useState } from "react";

import hoennCard from "../../assets/images/verif/carte_dresseur_hoenn.svg";
import kantoCard from "../../assets/images/verif/carte_dresseur_kanto.svg";
import sinnohCard from "../../assets/images/verif/carte_dresseur_sinnoh.svg";
import unysCard from "../../assets/images/verif/carte_dresseur_unys.svg";
import CarouselOverlay from "../../components/CarouselOverlay/CarouselOverlay";
import Notebook from "../../components/Notebook/Notebook";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";

const cardSvgs = [hoennCard, kantoCard, sinnohCard, unysCard];
const cardNames = ["Hoenn", "Kanto", "Sinnoh", "Unys"];

function Game() {
	const [isNotebookOpen, setIsNotebookOpen] = useState(false);
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [notebookRect, setNotebookRect] = useState<DOMRect | null>(null);
	const notebookRef = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		if (isNotebookOpen && notebookRef.current) {
			setNotebookRect(notebookRef.current.getBoundingClientRect());
		}
	}, [isNotebookOpen]);

	const toggleNotebook = () => setIsNotebookOpen((prev) => !prev);
	const nextCard = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCarouselIndex((prev) => (prev + 1) % cardSvgs.length);
	};
	const prevCard = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCarouselIndex((prev) => (prev - 1 + cardSvgs.length) % cardSvgs.length);
	};

	return (
		<div className="game-container">
			<Notebook
				isOpen={isNotebookOpen}
				onToggle={toggleNotebook}
				notebookRef={notebookRef}
			/>
			<CarouselOverlay
				isOpen={isNotebookOpen}
				notebookRect={notebookRect}
				cardSvgs={cardSvgs}
				cardNames={cardNames}
				carouselIndex={carouselIndex}
				onNext={nextCard}
				onPrev={prevCard}
			/>
			<TrainerCheck />
		</div>
	);
}

export default Game;
