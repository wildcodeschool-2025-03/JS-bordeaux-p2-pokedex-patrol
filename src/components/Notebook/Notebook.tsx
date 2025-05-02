import "./Notebook.css";

interface NotebookProps {
	isOpen: boolean;
	onToggle: () => void;
	notebookRef: React.RefObject<HTMLDivElement>;
}

function Notebook({ isOpen, onToggle, notebookRef }: NotebookProps) {
	if (isOpen) {
		return <div ref={notebookRef} className="notebook-button open" />;
	}
	return (
		<button
			type="button"
			className="notebook-button closed"
			onClick={onToggle}
		/>
	);
}

export default Notebook;
