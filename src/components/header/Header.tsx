import "./Header.css";

function Header() {
	return (
		<header>
			<img
				onClick={() => console.log("onClick")}
				onKeyDown={() => console.log("onKeyDown")}
				src="src/assets/images/home/speaker.svg"
				alt="speaker"
			/>
		</header>
	);
}

export default Header;
