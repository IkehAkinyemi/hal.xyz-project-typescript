import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk, RootState } from "..";

interface IWatchListState {
	pools: string[]
}

const initialState: IWatchListState = {
	pools: []
}

const watchListSlice = createSlice({
	name: "WATCHLIST",
	initialState,
	reducers: {
		addToList: (state, { payload }: PayloadAction<string[]>) => {
			state.pools = payload;
		},
	},
});

const { addToList } = watchListSlice.actions;

export const selectWatchListState = (state: RootState) => state.watchList;

export const addToWatchList =
	(id: string): AppThunk =>
	(dispatch: AppDispatch, getState) => {
		const list = getState()?.watchList?.pools;

		const newList = [...list, id];

		dispatch(addToList(newList));
	};

export const removeFromWatchList =
	(id: string): AppThunk =>
	(dispatch: AppDispatch, getState) => {
		const list = [...getState()?.watchList?.pools];

		const index = list.findIndex((listIdx) => listIdx === id);

		list.splice(index, 1);

		dispatch(addToList(list));
	};

export default watchListSlice.reducer;
