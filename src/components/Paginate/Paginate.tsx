interface IPaginate {
	onNextClick?: () => void;
	onPrevClick?: () => void;
}

const Paginate: React.FC<IPaginate> = ({ onNextClick, onPrevClick }) => {
	return (
		<div className="flex items-center justify-center">
			<span
				style={{ cursor: !onPrevClick ? "not-allowed" : "pointer" }}
				role="button"
				onClick={onPrevClick && onPrevClick}
			>
				←
			</span>
			<p className="mx-2 -mb-1.5">View More</p>
			<span
				style={{ cursor: !onNextClick ? "not-allowed" : "pointer" }}
				role="button"
				onClick={onNextClick && onNextClick}
			>
				→
			</span>
		</div>
	);
};

export default Paginate;
