import { AppDispatch } from "../../store";
import { dataSlice } from "./data";

export const loadBigBata = () => async (dispatch: AppDispatch) => {
  dispatch(dataSlice.actions.loadBigBata())
}

export const loadSmallBata = () => async (dispatch: AppDispatch) => {
  dispatch(dataSlice.actions.loadSmallBata())
}