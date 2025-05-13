import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { PokemonProvider } from "./context/PokemonContext.tsx";
import router from "./router.tsx";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<PokemonProvider>
			<RouterProvider router={router} />
		</PokemonProvider>,
	);
}
