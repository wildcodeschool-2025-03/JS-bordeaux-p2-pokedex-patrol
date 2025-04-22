import "./App.css";
import { Outlet, useNavigate } from "react-router";

function App() {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/game");
	}
	return (
		<>
			<button onClick={handleClick} type="button">
				Jouer
			</button>
			<Outlet />
		</>
	);
}

export default App;
