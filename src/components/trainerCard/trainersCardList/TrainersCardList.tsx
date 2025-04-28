import { useState } from "react";
import "./TrainersCardList.css";
import Buttons from "../../trainerCheck/trainerCheckButtons/TrainerCheckButtons";
import TrainerCardItem from "./trainersCardItem/TrainerCardItem";

function TrainerCardList() {
	const trainersCardList = [
		{
			id: 1,
			trainerName: "Sasha",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_sinnoh.svg",
			trainerRegion: "sinnoh",
			trainerBadges: [
				{ imgBadge: "badge_feu.svg" },
				{ imgBadge: "badge_fleur.svg" },
				{ imgBadge: "badge_pierre.svg" },
			],
		},
		{
			id: 2,
			trainerName: "Ondine",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_kanto.svg",
			trainerRegion: "kanto",
			trainerBadges: [
				{ imgBadge: "badge_eau.svg" },
				{ imgBadge: "badge_coeur.svg" },
			],
		},
		{
			id: 3,
			trainerName: "Pierre",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_kanto.svg",
			trainerRegion: "kanto",
			trainerBadges: [
				{ imgBadge: "badge_pierre.svg" },
				{ imgBadge: "badge_feu.svg" },
			],
		},
		{
			id: 4,
			trainerName: "Germain",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_unys.svg",
			trainerRegion: "unys",
			trainerBadges: [
				{ imgBadge: "badge_piece.svg" },
				{ imgBadge: "badge_coeur.svg" },
				{ imgBadge: "badge_fleur.svg" },
			],
		},
		{
			id: 5,
			trainerName: "Louka",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_sinnoh.svg",
			trainerRegion: "sinnoh",
			trainerBadges: [
				{ imgBadge: "badge_eau.svg" },
				{ imgBadge: "badge_pierre.svg" },
			],
		},
		{
			id: 6,
			trainerName: "Amaryllis",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_hoenn.svg",
			trainerRegion: "hoenn",
			trainerBadges: [
				{ imgBadge: "badge_fleur.svg" },
				{ imgBadge: "badge_feu.svg" },
				{ imgBadge: "badge_piece.svg" },
			],
		},
		{
			id: 7,
			trainerName: "Dario",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_unys.svg",
			trainerRegion: "unys",
			trainerBadges: [
				{ imgBadge: "badge_coeur.svg" },
				{ imgBadge: "badge_eau.svg" },
			],
		},
		{
			id: 8,
			trainerName: "Gloria",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_sinnoh.svg",
			trainerRegion: "sinnoh",
			trainerBadges: [
				{ imgBadge: "badge_fleur.svg" },
				{ imgBadge: "badge_pierre.svg" },
				{ imgBadge: "badge_coeur.svg" },
			],
		},
		{
			id: 9,
			trainerName: "Bastien",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_hoenn.svg",
			trainerRegion: "hoenn",
			trainerBadges: [
				{ imgBadge: "badge_eau.svg" },
				{ imgBadge: "badge_piece.svg" },
			],
		},
		{
			id: 10,
			trainerName: "Nina",
			trainerImgCrop: "src/assets/images/trainerCard/trainer_card_kanto.svg",
			trainerRegion: "kanto",
			trainerBadges: [
				{ imgBadge: "badge_feu.svg" },
				{ imgBadge: "badge_coeur.svg" },
				{ imgBadge: "badge_fleur.svg" },
			],
		},
	];
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		if (currentIndex < trainersCardList.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	return (
		<div>
			<TrainerCardItem trainerCard={trainersCardList[currentIndex]} />
			<Buttons
				onApprove={() => handleNext(true)}
				onDeny={() => handleNext(false)}
			/>
		</div>
	);
}

export default TrainerCardList;
