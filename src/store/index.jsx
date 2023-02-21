import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counter'

const store = configureStore({
    reducer:{
        counter:counterReducer
    }
})

export default store
