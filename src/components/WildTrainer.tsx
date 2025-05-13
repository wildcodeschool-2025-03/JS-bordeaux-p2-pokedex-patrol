import "./WildTrainer.css";

interface Trainer {
	id: number;
	nameTrainer: string;
	imgTrainer: string;
	imgTrainerCrop: string;
	RegionsTrainer: string;
	isTrainerCorrupted: boolean;

	declaredName?: string;
	declaredRegion?: string;
	portraitImage?: string;
	cardName?: string;
	cardRegion?: string;
}

interface Props {
	trainers: Trainer;
}

function WildTrainer({ trainers }: Props) {
	return (
		<>
			<img src={trainers.portraitImage || trainers.imgTrainer} alt="Trainer" />
			<div className="chatBox">
				<img
					className="trainerImg"
					src="src/assets/images/chat_box.svg"
					alt="chatBox"
				/>
				<p className="textOnImage">
					{trainers.declaredName || trainers.nameTrainer}: <br />
					Salut je viens de {trainers.declaredRegion || trainers.RegionsTrainer}{" "}
					!
				</p>
			</div>
		</>
	);
}

export default WildTrainer;
