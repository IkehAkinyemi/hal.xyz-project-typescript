export interface ITransCategory {
	id: string;
	__typename?: string;
	timestamp: string;
	amountUSD: string;
	transaction: {
		id: string;
	};
}

export interface IPoolDetails {
	id: string;
	token0: {
		id: string;
		symbol: string;
		__typename: string;
	};
	token1: {
		id: string;
		symbol: string;
		__typename: string;
	};
	totalValueLockedUSD: string;
	txCount: string;
	volumeUSD: string;
	__typename: string;
	burns?: ITransCategory[];
	mints?: ITransCategory[];
	swaps?: ITransCategory[];
}

export interface IAllTransactions extends IPoolDetails {
	data: ITransCategory[];
}
