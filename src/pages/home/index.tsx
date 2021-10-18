import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import Column from "../../components/Column";
import Paginate from "../../components/Paginate/Paginate";
import Row from "../../components/Row/Row";
import "./styles.css";
import { IPool } from "../../interfaces/IPool.interface";
import { selectWatchListState } from "../../store/slices/watchlist.slice";

interface IPoolData {
  pools: IPool[];
}

const Home = () => {
  const { pools } = useSelector(selectWatchListState);
  const [pagination, setPagination] = useState({
    first: 6,
    skip: 0,
  });
  const [watchListPage, setWatchListPage] = useState(1);

  const POOLS_QUERY = gql`
		query GetPools {
			pools(first: ${pagination.first}, skip: ${pagination.skip}) {
				id
				token0 {
					id
					symbol
				}
				token1 {
					id
					symbol
				}
				volumeUSD
				txCount
				totalValueLockedUSD
			}
		}
	`;

  const GetPools = () => {
    const { loading, error, data } = useQuery<IPoolData>(POOLS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        {data?.pools?.length ? (
          data?.pools?.map(
            ({
              token0,
              token1,
              txCount,
              totalValueLockedUSD,
              volumeUSD,
              id,
            }) => (
              <Row
                key={id}
                id={id}
                token0={token0?.symbol}
                token1={token1?.symbol}
                txCount={txCount}
                tvlUSD={totalValueLockedUSD}
                volUSD={volumeUSD}
              />
            )
          )
        ) : (
          <p className="text-center">No available pool!</p>
        )}
      </>
    );
  };

  const handleWatchListPagination = {
    next: () => setWatchListPage(watchListPage + 1),
    prev: () => setWatchListPage(watchListPage - 1),
  };

  console.log(pools);

  const GetWatchListPools = (id: string) => {
		const POOL_QUERY = gql`
				query GetPool {
					pools(where: {
						id: "${id}"
					}) {
						id
						token0 {
							id
							symbol
						}
						token1 {
							id
							symbol
						}
						volumeUSD
						txCount
						totalValueLockedUSD
					}
				}
			`;
		const {loading, error, data} = useQuery<IPoolData>(POOL_QUERY);

			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error occurred</p>;

			if (data) {
				return (<Row
					key={id}
					id={id}
					token0={data.pools[0].token0?.symbol}
					token1={data.pools[0].token1?.symbol}
					txCount={data.pools[0].txCount}
					tvlUSD={data.pools[0].totalValueLockedUSD}
					volUSD={data.pools[0].volumeUSD}
				/>)
			}
  };

  return (
    <>
      <div className="first-section mb-16">
        <p className="text-2xl font-medium mb-4">Pool Watchlist</p>
        <section className="border border-black rounded-md p-5">
          <Column
            header1="Pool"
            header2="TX Count"
            header3="TVL (USD)"
            header4="Volume (USD)"
          />
          <div className="hmITYh my-2" />
					<>
						{pools.length !== 0 && pools.map(id => GetWatchListPools(id))}
					</>
          {pools?.length > 6 && (
            <Paginate
              onPrevClick={
                watchListPage > 1 ? handleWatchListPagination.prev : undefined
              }
              onNextClick={
                watchListPage * 5 < pools?.length
                  ? handleWatchListPagination.next
                  : undefined
              }
            />
          )}
        </section>
      </div>

      <div className="first-section">
        <p className="text-2xl font-medium mb-4">All Pools</p>
        <section className="border border-black rounded-md p-5">
          <Column
            header1="Pool"
            header2="TX Count"
            header3="TVL (USD)"
            header4="Volume (USD)"
          />
          <div className="hmITYh my-2" />
          <GetPools />
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
    </>
  );
};

export default Home;
