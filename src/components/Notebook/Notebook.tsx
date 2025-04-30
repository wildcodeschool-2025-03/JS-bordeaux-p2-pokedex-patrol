import "./Notebook.css";

interface NotebookProps {
	isOpen: boolean;
	onToggle: () => void;
	notebookRef: React.RefObject<HTMLButtonElement>;
}

function Notebook({ isOpen, onToggle, notebookRef }: NotebookProps) {
	return (
		<button
			type="button"
			ref={notebookRef}
			className={`notebook-button ${isOpen ? "open" : "closed"}`}
			onClick={onToggle}
		/>
	);
}

export default Notebook;
