import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/usersInterface';


interface UserState {
    users: IUser[]
    isLoading: boolean
    error: string
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}


export const userToRenderSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
        },
        searchUsers(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
            console.log("done")
        }
    }
});

export default userToRenderSlice.reducer;