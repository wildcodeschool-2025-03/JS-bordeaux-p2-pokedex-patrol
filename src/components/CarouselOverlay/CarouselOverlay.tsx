import "./CarouselOverlay.css";
interface CarouselOverlayProps {
	isOpen: boolean;
	cardSvgs: string[];
	cardNames: string[];
	carouselIndex: number;
	onNext: (e: React.MouseEvent) => void;
	onPrev: (e: React.MouseEvent) => void;
}

function CarouselOverlay({
	isOpen,
	cardSvgs,
	cardNames,
	carouselIndex,
	onNext,
	onPrev,
}: CarouselOverlayProps) {
	if (!isOpen) return null;

	return (
		<div className="notebook-carousel-overlay">
			<button type="button" className="carousel-arrow left" onClick={onPrev}>
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
			<button type="button" className="carousel-arrow right" onClick={onNext}>
				&gt;
			</button>
		</div>
	);
}

export default CarouselOverlay;
