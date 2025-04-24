import "./ResultScreen.css";

interface Trainer {
	name: string;
	isTrainerLegitimate: boolean;
}

interface ResultScreenProps {
	score: number;
	nbrFraudulentTrainer: number;
	nbrLegitimateTrainer: number;
	trainers: Trainer[];
}

function ResultScreen({
	score,
	nbrFraudulentTrainer,
	nbrLegitimateTrainer,
	trainers,
}: ResultScreenProps) {
	return (
		<section>
			<div>
				<h2>Fin du niveau</h2>
				<p>
					Nombres de dresseurs en règles autorisés : ...............{" "}
					{nbrLegitimateTrainer} /{trainers.length}
				</p>
				<p>
					Nombres de dresseurs fraudleux autorisés : ..............{" "}
					{nbrFraudulentTrainer} /{trainers.length}
				</p>
				<hr />
				<h3>
					Score total :
					.................................................................................{" "}
					{score} pts
				</h3>
			</div>
		</section>
	);
}

export default ResultScreen;
