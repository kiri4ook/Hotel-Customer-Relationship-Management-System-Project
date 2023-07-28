export const FETCH_ACCOUNT_DATA = "FETCH_ACCOUNT_DATA";
export const FETCH_ROOM_DATA = "FETCH_ROOM_DATA";
export const SAVE_ACCOUNT_DATA = "SAVE_ACCOUNT_DATA";
export const SAVE_ROOM_DATA = "SAVE_ROOM_DATA";
export const DATA_LOADING_ERROR = "DATA_LOADING_ERROR";

export const fetchAccountData = () => ({ type: FETCH_ACCOUNT_DATA });
export const fetchRoomData = () => ({ type: FETCH_ROOM_DATA });
export const saveAccountData = (data) => ({ type: SAVE_ACCOUNT_DATA, payload: data });
export const saveRoomData = (data) => ({ type: SAVE_ROOM_DATA, payload: data });
export const dataLoadingError = (error) => ({ type: DATA_LOADING_ERROR, payload: error });