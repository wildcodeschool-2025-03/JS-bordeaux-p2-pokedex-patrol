import "./WildTrainer.css";

interface Trainer {
	id: number;
	declaredName: string;
	cardName: string;
	declaredRegion: string;
	cardRegion: string;
	portraitImage: string;
	cardPortrait: string;
	isTrainerCorrupted: boolean;
}

interface Props {
	trainers: Trainer;
}

function WildTrainer({ trainers }: Props) {
	return (
		<div className="wildTrainer">
			<img className="Trainer" src={trainers.portraitImage} alt="Trainer" />
			<div className="chatBox">
				<img
					className="trainerImg"
					src="src/assets/images/chat_box.svg"
					alt="chatBox"
				/>
				<p className="textOnImage">
					{trainers.declaredName}: <br />
					Salut je viens de {trainers.declaredRegion} !
				</p>
			</div>
		</div>
	);
}

export default WildTrainer;
