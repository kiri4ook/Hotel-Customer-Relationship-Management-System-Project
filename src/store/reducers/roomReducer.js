const initialState = {
    guest: null,
    loading: false,
    error: null,
};

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ROOM_GUEST':
            return {
                ...state,
                [action.payload.roomId]: {
                    ...state[action.payload.roomId],
                    guest: action.payload.guest,
                },
            };
        default:
            return state;
    }
};

export default roomReducer;