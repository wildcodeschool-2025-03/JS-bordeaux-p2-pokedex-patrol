import { useState } from "react";
import JennyModal from "./JennyModal";

const Jenny = () => {
	const [isJennyOpen, setIsJennyOpen] = useState(false);

	const handleOpenJenny = () => {
		const audio = new Audio("/src/assets/music/wow.mp3");
		audio.play().catch((err) => {
			console.error("Erreur de lecture audio :", err);
		});

		setIsJennyOpen(true);
	};

	return (
		<div>
			<img
				src="/src/assets/images/hud/Jenny.svg"
				alt="Officer Jenny"
				onClick={handleOpenJenny}
				onKeyDown={(e) => e.key === "p" && handleOpenJenny()}
				style={{ cursor: "pointer" }}
			/>

			{isJennyOpen && <JennyModal onClose={() => setIsJennyOpen(false)} />}
		</div>
	);
};

export default Jenny;
