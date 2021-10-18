import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App";
import store, { persistor } from "./store";

export const client = new ApolloClient({
	uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ApolloProvider client={client}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</ApolloProvider>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);
