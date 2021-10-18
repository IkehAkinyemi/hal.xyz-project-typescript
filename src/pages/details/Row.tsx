interface IDetailsRow {
	id: string;
	txType: string;
	tokenAmt: string;
	timestamp: string;
}

const DetailsRow: React.FC<IDetailsRow> = ({
	id,
	txType,
	tokenAmt,
	timestamp,
}) => {
	return (
		<div className="my-8">
			<div className="sc-krvtoX">
				<div></div>
				<div>
					<div className="eJnjNO">
						<a
							href={`https://etherscan.io/tx/${id}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500"
						>
							{`https://etherscan.io/tx/${id.substring(1, 12)}....`}
						</a>
					</div>
				</div>
				<p>{txType}</p>
				<p>${tokenAmt.substring(0, 4)}</p>
				<p>{timestamp}</p>
			</div>
		</div>
	);
};

export default DetailsRow;
