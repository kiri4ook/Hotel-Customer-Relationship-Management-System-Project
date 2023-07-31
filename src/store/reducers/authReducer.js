const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'SIGN_IN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;