const initialState = {
    isAuthorized: false,
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN_REQUEST':
            return {
                ...state,
                isAuthorized: true,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthorized: true,
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
