import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Game from "./pages/game/Game.tsx";
import "./pages/game/Game.css";
import Home from "./pages/home/Home.tsx";
import "./pages/home/Home.css";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/game",
				element: <Game />,
			},
		],
	},
]);

// createRoot(document.getElementById("root")!).render(
// 	<RouterProvider router={router} />,
// );

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
