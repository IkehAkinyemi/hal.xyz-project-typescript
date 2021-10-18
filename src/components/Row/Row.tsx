import { BigNumber } from "bignumber.js";
import { Link } from "react-router-dom";
import "./styles.css";

interface IRow {
	token0: string;
	token1: string;
	txCount: string;
	tvlUSD: string;
	volUSD: string;
	id: string;
}

const Row: React.FC<IRow> = ({
	token0,
	token1,
	txCount,
	tvlUSD,
	volUSD,
	id,
}) => {
	function bigNum(num: string): string {
		return new BigNumber(num).decimalPlaces(3).toString();
	}

	return (
		<div className="my-8">
			<Link to={`/pools/${id}`}>
				<div className="sc-krvtoX">
					<div></div>
					<div>
						<div className="eJnjNO">
							<div className="elwIhs">
								<img
									className="lplcEi"
									alt="token logo"
									src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
								/>
								<img
									className="lplcEi"
									alt="token logo"
									src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
								/>
							</div>
							<div>
								{token0}/{token1}
							</div>
						</div>
					</div>
					<p>{txCount}</p>
					<p>${bigNum(tvlUSD)}</p>
					<p>${bigNum(volUSD)}</p>
				</div>
			</Link>
		</div>
	);
};

export default Row;
