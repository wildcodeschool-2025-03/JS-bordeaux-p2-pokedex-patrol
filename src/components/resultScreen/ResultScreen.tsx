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
				<div>
					<h2>Fin du niveau</h2>
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
					<hr />
					<h3>
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
