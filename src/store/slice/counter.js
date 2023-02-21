import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
    },
    reducers: {
        plus: (state) => {
            state.count = state.count + 1;
        },
    },
});

export const { plus } = counterSlice.actions;
export default counterSlice.reducer;
