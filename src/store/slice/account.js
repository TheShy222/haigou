import { createSlice } from '@reduxjs/toolkit'
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: { nick: '', url: '', roleId: 0, mId: 0 },
    },
    reducers: {
        saveAccount: (state, action) => {
            state.account = action.payload
        },
    },
})

export const { saveAccount } = accountSlice.actions
export default accountSlice.reducer
