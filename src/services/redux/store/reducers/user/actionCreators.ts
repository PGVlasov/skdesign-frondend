import { AppDispatch } from "../../store";
import axios, { AxiosResponse } from "axios";
import { userSlice } from "./users";
import { IUser } from "../../../interfaces/usersInterface";



export const fetchUsers = (url: string) => async (dispatch: AppDispatch,) => {

    try {
        dispatch(userSlice.actions.usersFetching())
        const response = await axios.get<IUser[]>(`${url}`
        ).then((response: AxiosResponse) => {
            dispatch(userSlice.actions.usersFetchingSuccess(response.data))
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    } catch (e) {
        dispatch(userSlice.actions.usersFetchingError("something went wrong"))
    }
}

export const updateUsers = (newItem: IUser) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.updateUsers(newItem))
}



