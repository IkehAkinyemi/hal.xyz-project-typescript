import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import Column from "../../components/Column";
import Paginate from "../../components/Paginate/Paginate";
import UseTransTypeQuery from "../../hooks/UseTransDetailsQuery";
import { ITranstype } from "../../interfaces/ITranstype.interface";
import Details from "../../components/Detail/Detail";
import {
	addToWatchList,
	removeFromWatchList,
	selectWatchListState,
} from "../../store/slices/watchlist.slice";

const PoolDetails: React.FC = () => {
	const watchlist = useSelector(selectWatchListState);
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [pagination, setPagination] = useState({
		first: 6,
		skip: 0,
	});
	const [transType, setTransType] = useState<ITranstype>("all");

	const transQuery = UseTransTypeQuery(
		transType,
		pagination?.first,
		pagination?.skip
	);

	const POOLS = gql`
  query GetPools {
    pools(where: {
      id: "${id}"
    }){
        id
        token0 {
          id
          symbol
          txCount
        }
        token1{
          id
          symbol
          txCount
        }
        txCount
        ${transQuery}
      }
    }
  `;

	const { loading, error, data } = useQuery(POOLS);

	const isWatchListed = watchlist?.pools?.includes(id);

	useEffect(() => {
		!id && history.push("/");
	}, [history, id]);

	return (
		<div>
			<Link to="/" className="text-blue-600">
				&#10094; Back to Pools
			</Link>
			<div className="flex mt-10 mb-4">
				<div>
					<div className="eJnjNO">
						<div className="elwIhs">
							<img
								className="lplcEi cAezNW"
								alt="token logo"
								src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
							/>
							<img
								className="lplcEi"
								alt="token logo"
								src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
							/>
						</div>
						<div className="text-lg font-medium ml-2">
							{data?.pools[0].token0.symbol}/{data?.pools[0].token1.symbol}
						</div>
					</div>
				</div>
				<div className="ml-auto">
					<button
						onClick={() =>
							!isWatchListed
								? dispatch(addToWatchList(id))
								: dispatch(removeFromWatchList(id))
						}
						type="button"
						className="bg-blue-400 text-white text-lg py-1 px-2 rounded"
					>
						&#9733;{" "}
						{!isWatchListed ? "Add to Watchlist" : "Remove from Watchlist"}
					</button>
				</div>
			</div>

			<div className="border border-black rounded-md p-5 w-2/5">
				<div className="card flex text-base font-medium">
					<span className="w-3/4">Token Value (USD)</span>
					<span className="w-1/4">TX Count</span>
				</div>

				<div className="flex my-4">
					<span className="w-3/4">{data?.pools[0].token0.symbol}</span>
					<span className="w-1/4">{data?.pools[0].token0.txCount}</span>
				</div>
				<div className="flex">
					<span className="w-3/4">{data?.pools[0].token1.symbol}</span>
					<span className="w-1/4">{data?.pools[0].token1.txCount}</span>
				</div>
			</div>

			<div className="section my-20">
				<div className="flex">
					<p className="text-2xl font-medium mb-4 mr-6">Transactions</p>
					<div>
						<div className="border border-black rounded-sm w-min p-1">
							<select
								onChange={(e) => {
									setPagination({
										first: 6,
										skip: 0,
									});
									setTransType(
										e.target.value as "all" | "burns" | "mints" | "burns"
									);
								}}
								className="bg-white pr-6 outline-none"
							>
								<option value="all">All</option>
								<option value="swaps">Swap</option>
								<option value="mints">Mint</option>
								<option value="burns">Burn</option>
							</select>
						</div>
					</div>
				</div>
				<section className="border border-black rounded-md p-5">
					<Column
						header1="Link To Etherscan"
						header2="TX Type"
						header3="Token Amount"
						header4="Timestamp"
					/>
					<div className="hmITYh my-2" />
					<Details
						loading={loading}
						error={error}
						data={data}
						transType={transType}
					/>
					<Paginate
						onPrevClick={
							pagination?.skip > 0
								? () =>
										setPagination({
											...pagination,
											skip: pagination?.skip - pagination?.first,
										})
								: undefined
						}
						onNextClick={() =>
							setPagination({
								...pagination,
								skip: pagination?.skip + pagination?.first,
							})
						}
					/>
				</section>
			</div>
		</div>
	);
};

export default PoolDetails;
