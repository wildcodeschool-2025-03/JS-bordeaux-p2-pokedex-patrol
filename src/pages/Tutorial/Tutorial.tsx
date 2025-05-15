import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import officer from "../../assets/images/hud/tutorial.svg";

const Tutorial = () => {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!window.homeMusic) {
			const audio = new Audio("/src/assets/music/home.mp3");
			audio.loop = true;
			window.homeMusic = audio;
		}

		window.homeMusic?.play();

		return () => {};
	}, []);

	const startTransition = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);

		if (window.homeMusic) {
			const fadeOut = setInterval(() => {
				if (window.homeMusic && window.homeMusic.volume > 0.05) {
					window.homeMusic.volume -= 0.05;
				} else {
					clearInterval(fadeOut);
					if (window.homeMusic) {
						window.homeMusic.pause();
						window.homeMusic.volume = 1;
						window.homeMusic.currentTime = 0;
					}
				}
			}, 100);
		}

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
					src="src/assets/images/home/speaker.svg"
					alt="speaker"
					className="speaker_img"
					onKeyDown={(e) => e.key === "b"}
					onClick={() => {
						if (window.homeMusic) {
							if (window.homeMusic.paused) {
								window.homeMusic.play();
							} else {
								window.homeMusic.pause();
								window.homeMusic.currentTime = 0;
							}
						}
					}}
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
							vraie vie #ThugLife
							<br />
							<br />
							Tu viens d'être assigné au contrôle des frontières régionales !
							<br />
							<br />
							Ta mission ? Protéger Jade de toute entrée suspecte.
							<br />
							<br />
							Les Dresseurs vont défiler. À toi de vérifier leurs papiers, leurs
							badges, leurs Pokémon...
							<br />
							<br />
							Certains essaieront de tricher ! <br />
							<br />
							Faux noms. Pokémon illégaux. <br />
							<br />
							Types interdits. Falsifications.
							<br />
							<br />À toi d'être vigilant !
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
};

export default Tutorial;
