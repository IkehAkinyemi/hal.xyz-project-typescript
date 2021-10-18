import { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import DetailsRow from "../../pages/details/Row";
import { ITranstype } from "../../interfaces/ITranstype.interface";
import {
	IAllTransactions,
	IPoolDetails,
	ITransCategory,
} from "../../interfaces/IPoolDetails.interface";

interface IDetailProps {
	loading: boolean;
	error?: ApolloError;
	transType: ITranstype;
	data?: {
		pools?: IPoolDetails[];
	};
}

const Details: React.FC<IDetailProps> = ({
	loading,
	error,
	transType,
	data,
}) => {
	const [allTransactions, setAllTransactions] = useState<IAllTransactions>();

	useEffect(() => {
		if (transType === "all" && data?.pools) {
			const dataArr = {
				...data?.pools[0],
				data: [
					...(data?.pools[0]?.swaps as unknown as ITransCategory[]),
					...(data?.pools[0]?.mints as unknown as ITransCategory[]),
					...(data?.pools[0]?.burns as unknown as ITransCategory[]),
				],
			};

			delete dataArr.mints;
			delete dataArr.swaps;
			delete dataArr.burns;

			setAllTransactions(dataArr);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	if (loading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>An error occurred!</div>;
	}

	return (
		<>
			{transType === "swaps" ? (
				data?.pools && data?.pools[0]?.swaps?.length ? (
					data?.pools[0]?.swaps?.map((swap, idx) => {
						return (
							<DetailsRow
								key={swap?.transaction.id + idx}
								id={swap?.transaction.id}
								txType={swap?.__typename as string}
								tokenAmt={swap?.amountUSD}
								timestamp={swap?.timestamp}
							/>
						);
					})
				) : (
					<p>No swap transaction</p>
				)
			) : transType === "burns" ? (
				data?.pools && data?.pools[0]?.burns?.length ? (
					data?.pools[0]?.burns?.map((burn, idx) => {
						return (
							<DetailsRow
								key={burn?.transaction.id + idx}
								id={burn?.transaction.id}
								txType={burn?.__typename as string}
								tokenAmt={burn?.amountUSD}
								timestamp={burn?.timestamp}
							/>
						);
					})
				) : (
					<p>No burn transaction</p>
				)
			) : transType === "mints" ? (
				data?.pools && data?.pools[0]?.mints?.length ? (
					data?.pools[0]?.mints?.map((mint, idx) => {
						return (
							<DetailsRow
								key={mint?.transaction.id + idx}
								id={mint?.transaction.id}
								txType={mint?.__typename as string}
								tokenAmt={mint?.amountUSD}
								timestamp={mint?.timestamp}
							/>
						);
					})
				) : (
					<p>No mint transaction</p>
				)
			) : allTransactions?.data?.length ? (
				allTransactions?.data?.map((datum: ITransCategory, idx: number) => {
					return (
						<DetailsRow
							key={datum?.transaction.id + idx}
							id={datum?.transaction.id}
							txType={datum?.__typename as string}
							tokenAmt={datum?.amountUSD}
							timestamp={datum?.timestamp}
						/>
					);
				})
			) : (
				<p>No transaction</p>
			)}
		</>
	);
};

export default Details;
