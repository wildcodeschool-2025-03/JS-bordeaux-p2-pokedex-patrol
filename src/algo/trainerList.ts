export interface TrainerInterface {
	id: number;
	nameTrainer: string;
	imgTrainer: string;
	imgTrainerCrop: string;
	RegionsTrainer: string;
	isTrainerCorrupted: boolean;
}

import trainersData from "../data_base/Trainers.json";

const trainers = trainersData as unknown as TrainerInterface[];

const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
	}
	return shuffled;
};

type CorruptibleTrainerKey = keyof Pick<
	TrainerInterface,
	"nameTrainer" | "imgTrainer" | "imgTrainerCrop" | "RegionsTrainer"
>;

const getRandomTrainers = (trainerCount = 10): TrainerInterface[] => {
	const selectedTrainers = shuffleArray(trainers).slice(0, trainerCount);
	const numberOfFakeTrainers = Math.floor(Math.random() * 3) + 2;

	const indicesToCorrupt = shuffleArray([
		...Array(selectedTrainers.length).keys(),
	]).slice(0, numberOfFakeTrainers);

	const propertiesToCorrupt = shuffleArray<CorruptibleTrainerKey>([
		"nameTrainer",
		"imgTrainer",
		"imgTrainerCrop",
		"RegionsTrainer",
	]).slice(0, numberOfFakeTrainers);

	for (let i = 0; i < indicesToCorrupt.length; i++) {
		const index = indicesToCorrupt[i];
		const prop = propertiesToCorrupt[i];
		const sourceIndex = (index + 4) % selectedTrainers.length;

		selectedTrainers[index].isTrainerCorrupted = true;
		selectedTrainers[index][prop] = selectedTrainers[sourceIndex][prop];
	}

	return selectedTrainers;
};

export { getRandomTrainers };
