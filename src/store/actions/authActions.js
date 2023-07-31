// export const signInRequest = (email, password) => {
//     return async (dispatch) => {
//         try {
//             const usersRef = firebase.database().ref('Accounts');

//             // Выполнить запрос к базе данных по указанной электронной почте
//             const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');

//             if (snapshot.exists()) {
//                 // Пользователь с такой электронной почтой найден в базе данных
//                 const userData = snapshot.val();

//                 // Проверить введенный пароль
//                 const userId = Object.keys(userData)[0];
//                 if (userData[userId].password === password) {
//                     // Пароль совпадает, авторизация успешна
//                     const user = {
//                         email: userData[userId].email,
//                         // Добавьте другие поля пользователя, если они есть в базе данных
//                         // например, имя, фото профиля, и т. д.
//                     };
//                     dispatch(signInSuccess(user));
//                 } else {
//                     // Пароль неправильный
//                     dispatch(signInFailure('Incorrect password'));
//                 }
//             } else {
//                 // Пользователь с такой электронной почтой не найден в базе данных
//                 dispatch(signInFailure('User not found'));
//             }
//         } catch (error) {
//             dispatch(signInFailure(error.message));
//         }
//     };
// };

// export const signInSuccess = (user) => {
//     return {
//         type: 'SIGN_IN_SUCCESS',
//         payload: user,
//     };
// };

// export const signInFailure = (error) => {
//     return {
//         type: 'SIGN_IN_FAILURE',
//         payload: error,
//     };
// };

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