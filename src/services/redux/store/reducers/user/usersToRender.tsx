import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../interfaces/usersInterface';


interface UserState {
    users: User[]
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
        usersFetchingSuccess(state, action: PayloadAction<User[]>) {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
        },
        searchUsers(state, action: PayloadAction<User[]>) {
            state.isLoading = false
            state.error = ''
            state.users = action.payload
        }
    }
});

export default userToRenderSlice.reducer;