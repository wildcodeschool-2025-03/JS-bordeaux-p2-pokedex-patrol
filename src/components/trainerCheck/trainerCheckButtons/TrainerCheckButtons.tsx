import "./TrainerCheckButtons.css";

interface ButtonProps {
	onApprove: React.MouseEventHandler<HTMLButtonElement>;
	onDeny: React.MouseEventHandler<HTMLButtonElement>;
}

function TrainerCheckButtons({ onApprove, onDeny }: ButtonProps) {
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

export default TrainerCheckButtons;
