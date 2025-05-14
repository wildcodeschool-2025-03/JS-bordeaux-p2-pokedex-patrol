import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import "./Home.css";

function Home() {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const navigate = useNavigate();
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = new Audio("/src/assets/music/home.mp3");
		audio.loop = true;
		audio.play();
		audioRef.current = audio;

		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, []);

	const startTransition = () => {
		setIsTransitioning(true);

		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}

		setTimeout(() => {
			navigate("/game");
		}, 3000);
	};

	return (
		<>
			<header>
				<img
					src="src/assets/images/home/speaker.svg"
					alt="speaker"
					className="speaker_img"
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
					onClick={() => {
						if (audioRef.current) {
							audioRef.current.pause();
							audioRef.current.currentTime = 0;
						}
						navigate("/tutorial");
					}}
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
