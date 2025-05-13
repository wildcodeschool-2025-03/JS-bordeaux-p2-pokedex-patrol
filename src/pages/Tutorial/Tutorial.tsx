import "./Tutorial.css";
import officer from "../../assets/images/hud/tutorial.svg";

export default function Tutorial() {
	return (
		<>
			<header />
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
				<div className="firstpage-buttons">
					<a href="/game">
						<button type="button" className="firstpage-btn">
							Jouer
						</button>
					</a>
					<a href="/">
						<button type="button" className="firstpage-btn">
							Retour
						</button>
					</a>
				</div>
			</div>
			<footer />
		</>
	);
}
