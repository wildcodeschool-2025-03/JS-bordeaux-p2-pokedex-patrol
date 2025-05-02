import PokemonList from "../../API/PokemonList";
import TrainerCheck from "../../components/trainerCheck/TrainerCheck";
import "./Game.css";

function Game() {
	return (
		<>
			<PokemonList />
			<TrainerCheck />
		</>
	);
}
export default Game;
