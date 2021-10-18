export interface IPool {
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
}
