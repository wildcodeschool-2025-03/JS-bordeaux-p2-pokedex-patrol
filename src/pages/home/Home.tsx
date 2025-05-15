import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Home.css";

function Home() {
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

	const handleTutoClick = () => {
		navigate("/tutorial");
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
			<div className="home">
				<img
					className="img_pokedex"
					src="src/assets/images/home/pokedex.svg"
					alt="pokedex"
				/>
				<img
					className="img_patrol"
					src="src/assets/images/home/patrol.svg"
					alt="patrol"
				/>
				<img
					className="img_trainer1"
					src="src/assets/images/home/trainer1.svg"
					alt="trainer"
				/>
				<img
					className="img_trainer2"
					src="src/assets/images/home/trainer2.svg"
					alt="trainer"
				/>
				{isTransitioning && (
					<div className="transition_overlay">
						<img
							src="src/assets/images/home/pika.gif"
							alt="Transition"
							className="transition_img"
						/>
					</div>
				)}
				<Link to="#" onClick={startTransition} className="btn_home play">
					Jouer
				</Link>
				<button
					onClick={handleTutoClick}
					className="btn_home tuto"
					type="button"
				>
					Tutoriel
				</button>
			</div>
			<footer />
		</>
	);
}

export default Home;
