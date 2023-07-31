export const login = (email, password) => ({
    type: 'LOGIN',
    payload: { email, password },
});

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const logout = () => ({
    type: 'LOGOUT',
});