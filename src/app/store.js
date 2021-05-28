import { configureStore } from "@reduxjs/toolkit";
import setLatestReducer from "./latestsRedux/latests.reducer";

export const store = configureStore({
    reducer: {
        latest: setLatestReducer,
    },
});
