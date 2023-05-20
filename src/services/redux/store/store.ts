import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/users"
import dataReducer from "./reducers/data/data"



const roorReducer = combineReducers({
    userReducer, dataReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: roorReducer
    })
}

export type RootState = ReturnType<typeof roorReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']