import { SAVE_ACCOUNT_DATA, SAVE_ROOM_DATA, DATA_LOADING_ERROR } from "./actions";

const initialState = {
    accountData: null,
    roomData: null,
    loading: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT_DATA:
            return { ...state, accountData: action.payload, loading: false };
        case SAVE_ROOM_DATA:
            return { ...state, roomData: action.payload, loading: false };
        case DATA_LOADING_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default reducer;
