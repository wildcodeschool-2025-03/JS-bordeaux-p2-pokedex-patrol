import { useState } from "react";
import "./Notebook_carouseloverlay.css";
interface CarouselOverlayProps {
	cardSvgs: string[];
	cardNames: string[];
}

function CarouselOverlay({ cardSvgs, cardNames }: CarouselOverlayProps) {
	const [carouselIndex, setCarouselIndex] = useState(0);

	const nextCard = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCarouselIndex((prev) => (prev + 1) % cardSvgs.length);
	};

	const prevCard = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCarouselIndex((prev) => (prev - 1 + cardSvgs.length) % cardSvgs.length);
	};

	return (
		<div className="notebook-carousel-overlay">
			<button type="button" className="carousel-arrow left" onClick={prevCard}>
				&lt;
			</button>
			<div className="carousel-content">
				<div className="carousel-titles">
					<h2 className="carousel-title">{cardNames[carouselIndex]}</h2>
					<h2 className="carousel-title">
						{cardNames[(carouselIndex + 1) % cardNames.length]}
					</h2>
				</div>
				<div className="carousel-images">
					<img
						src={cardSvgs[carouselIndex]}
						alt={`Carte Dresseur ${cardNames[carouselIndex]}`}
						className="carousel-image"
					/>
					<img
						src={cardSvgs[(carouselIndex + 1) % cardSvgs.length]}
						alt={`Carte Dresseur ${cardNames[(carouselIndex + 1) % cardNames.length]}`}
						className="carousel-image"
					/>
				</div>
			</div>
			<button type="button" className="carousel-arrow right" onClick={nextCard}>
				&gt;
			</button>
		</div>
	);
}

export default CarouselOverlay;
