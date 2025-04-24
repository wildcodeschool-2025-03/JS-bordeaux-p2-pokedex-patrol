import "./Buttons.css";

interface ButtonProps {
	onApprove: React.MouseEventHandler<HTMLButtonElement>;
	onDeny: React.MouseEventHandler<HTMLButtonElement>;
}

function Buttons({ onApprove, onDeny }: ButtonProps) {
	return (
		<>
			<button type="button" className="btnApprove" onClick={onApprove}>
				Approuver
			</button>
			<button type="button" className="btnDeny" onClick={onDeny}>
				Refuser
			</button>
		</>
	);
}

export default Buttons;
