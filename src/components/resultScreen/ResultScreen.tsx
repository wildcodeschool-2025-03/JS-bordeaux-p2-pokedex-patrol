import "./ResultScreen.css";

interface ResultScreenProps {
	score: number;
	nbrCorruptedTrainer: number;
	nbrLegitimateTrainer: number;
	nbrLegitimateTrainerDenied: number;
}

function ResultScreen({
	score,
	nbrCorruptedTrainer,
	nbrLegitimateTrainer,
	nbrLegitimateTrainerDenied,
}: ResultScreenProps) {
	return (
		<div className="modal_overlay">
			<section id="resultScreen">
				<img
					className="pika_red"
					src="src/assets/images/hud/pikawalk.gif"
					alt="ceci est un pikachu et red"
				/>
				<div>
					<h2>FIN DU NIVEAU</h2>
					<br />
					<br />

					<p>
						Nombres de dresseurs en règles autorisés : ...............{" "}
						{nbrLegitimateTrainer} /
						{nbrLegitimateTrainer + nbrLegitimateTrainerDenied}
					</p>

					<p>
						Nombres de dresseurs fraudleux autorisés : ..............{" "}
						{nbrCorruptedTrainer} /
						{10 - (nbrLegitimateTrainer + nbrLegitimateTrainerDenied)}
					</p>
					<br />
					<br />

					<hr />
					<h3>
						<br />
						Score total :
						.................................................................................{" "}
						{score} pts
					</h3>
				</div>
			</section>
		</div>
	);
}

export default ResultScreen;
