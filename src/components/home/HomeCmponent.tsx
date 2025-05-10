import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./HomeCmponent.css";

function HomeCmponent() {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const navigate = useNavigate();

	const startTransition = () => {
		setIsTransitioning(true);
		setTimeout(() => {
			navigate("/game");
		}, 5000);
	};

	return (
		<>
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

				<button className="btn_home tuto" type="button">
					Tutoriel
				</button>
			</div>
		</>
	);
}

export default HomeCmponent;
