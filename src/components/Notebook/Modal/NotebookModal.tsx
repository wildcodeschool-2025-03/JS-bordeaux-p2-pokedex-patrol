import type { ReactNode } from "react";
import "./NotebookModal.css";

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
	return (
		<div
			className="modal-backdrop"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onClose();
			}}
			aria-label="Close modal"
		>
			<dialog
				className="modal-content"
				open
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Escape") onClose();
				}}
				aria-modal="true"
			>
				<button
					className="modal-close"
					onClick={onClose}
					type="button"
					aria-label="Close"
				>
					×
				</button>
				{children}
			</dialog>
		</div>
	);
}
