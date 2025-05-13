import { createBrowserRouter } from "react-router";
import "./index.css";
import Game from "./pages/game/Game.tsx";
import "./pages/game/Game.css";
import Home from "./pages/home/Home.tsx";
import "./pages/home/Home.css";
import Tutorial from "./pages/Tutorial/Tutorial.tsx";
import "./pages/Tutorial/Tutorial.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/game",
		element: <Game />,
	},
	{
		path: "/tutorial",
		element: <Tutorial />,
	},
]);

export default router;
