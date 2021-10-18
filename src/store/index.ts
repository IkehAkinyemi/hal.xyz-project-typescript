import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
	ThunkAction,
	Action,
} from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import watchlistSlice from "./slices/watchlist.slice";

// redux-persist config
const persistConfig = {
	key: "hal-project",
	storage,
	stateReconciler: autoMergeLevel1,
};

// Our app slices/reducers
const reducers = combineReducers({
	watchList: watchlistSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers as any);

const store = configureStore({
	reducer: _persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
