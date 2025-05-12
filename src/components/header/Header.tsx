import "./Header.css";
import { useState } from "react";
import "../../pages/game/Game.css";

function Header() {
	const [activeImage, setActiveImage] = useState(false);

	const handleClick = () => {
		setActiveImage(true);
	};
	return (
		<header>
			<img
				onClick={handleClick}
				onKeyDown={handleClick}
				src="src/assets/images/home/speaker.svg"
				alt="speaker"
			/>
			{activeImage && (
				<div className="information_box">
					<p>Information à venir</p>
				</div>
			)}
		</header>
	);
}

export default Header;
