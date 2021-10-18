import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { POOLS } from "./uniswap/client";
import Home from "./pages/home";
import PoolDetails from "./pages/details";

const App = () => {
	// const { loading, error, data } = useQuery(POOLS);

	// console.log(data?.pools[0]);

	return (
		<div className="App">
			<main className="App-body">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/pools/:id" component={PoolDetails} />
					</Switch>
				</BrowserRouter>
			</main>
		</div>
	);
};

export default App;
