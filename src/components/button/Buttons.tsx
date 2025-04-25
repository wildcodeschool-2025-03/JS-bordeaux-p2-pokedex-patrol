import "./Buttons.css";

interface ButtonProps {
	onApprove: React.MouseEventHandler<HTMLButtonElement>;
	onDeny: React.MouseEventHandler<HTMLButtonElement>;
}

function Buttons({ onApprove, onDeny }: ButtonProps) {
	return (
		<>
			<button type="button" className="btn Approve" onClick={onApprove}>
				Approuver
			</button>
			<button type="button" className="btn Deny" onClick={onDeny}>
				Refuser
			</button>
		</>
	);
}

export default Buttons;
