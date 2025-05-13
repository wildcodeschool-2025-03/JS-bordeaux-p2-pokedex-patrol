import "./NotebookButton.css";

interface Notebook {
	notebookRef: React.RefObject<HTMLButtonElement>;
	onClick?: () => void;
	open?: boolean;
}

function Notebook({ notebookRef, onClick, open }: Notebook) {
	return (
		<button
			type="button"
			className={`notebook-button ${open ? "open" : "closed"}`}
			ref={notebookRef}
			onClick={onClick}
			aria-label="Notebook"
		/>
	);
}

export default Notebook;
