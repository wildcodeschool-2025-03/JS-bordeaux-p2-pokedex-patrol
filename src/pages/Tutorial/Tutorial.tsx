import "./Tutorial.css";
import officer from "../../assets/images/hud/tutorial.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const handleClick = () => {};

export default function Tutorial() {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const navigate = useNavigate();

	const startTransition = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setTimeout(() => {
			navigate("/game");
		}, 3000);
	};

	const goBack = () => {
		if (isTransitioning) return;
		navigate("/");
	};

	return (
		<>
			<header>
				<img
					onClick={handleClick}
					onKeyDown={handleClick}
					src="src/assets/images/home/speaker.svg"
					alt="speaker"
					className="speaker_img"
				/>
			</header>
			<div className="firstpage-overlay">
				<div className="tutorial-frame-container">
					<img
						src={officer}
						alt="Officer Frame"
						className="tutorial-frame-svg"
					/>
					<div className="firstpage-textbox">
						<p>
							Bienvenue, Agent. Ici, c'est pas la Ligue Pokémon... C'est la
							vraie vie.
							<br />
							<br />
							Tu viens d'être assigné au contrôle des frontières régionales.
							<br />
							<br />
							Ta mission ? Protéger Jade de toute entrée suspecte.
							<br />
							<br />
							Les Dresseurs vont défiler. À toi de vérifier leurs papiers, leur
							badge, leurs Pokémon... et surtout, de repérer les failles.
							<br />
							<br />
							Certains essaieront de tricher. <br />
							<br />
							Faux noms. Pokémon illégaux. <br />
							<br />
							Types interdits. Falsifications.
							<br />
							<br />À toi d'être vigilant.
						</p>
					</div>
				</div>

				{isTransitioning && (
					<div className="transition_overlay">
						<img
							src="src/assets/images/home/pika.gif"
							alt="Transition"
							className="transition_img"
						/>
					</div>
				)}

				<div className="firstpage-buttons">
					<Link to="#" onClick={startTransition} className="firstpage-btn">
						Jouer
					</Link>
					<button
						type="button"
						onClick={goBack}
						className="firstpage-btn"
						disabled={isTransitioning}
					>
						Retour
					</button>
				</div>
			</div>
			<footer />
		</>
	);
}
