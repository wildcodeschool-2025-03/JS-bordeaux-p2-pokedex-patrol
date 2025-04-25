import "./TrainerCheckButtons.css";

interface ButtonProps {
	onApprove: React.MouseEventHandler<HTMLButtonElement>;
	onDeny: React.MouseEventHandler<HTMLButtonElement>;
}

function Buttons({ onApprove, onDeny }: ButtonProps) {
	return (
		<div id="trainerButtons">
			<button type="button" className="btn Approve" onClick={onApprove}>
				Approuver
			</button>
			<button type="button" className="btn Deny" onClick={onDeny}>
				Refuser
			</button>
		</div>
	);
}

export default Buttons;
