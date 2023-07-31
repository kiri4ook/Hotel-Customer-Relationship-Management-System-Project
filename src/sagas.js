import { put, takeEvery } from "redux-saga/effects";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from "./firebaseConfig";
import { loginSuccess, login } from './store/actions/authActions';
import {
    FETCH_ACCOUNT_DATA,
    FETCH_ROOM_DATA,
    SAVE_ACCOUNT_DATA,
    SAVE_ROOM_DATA,
    dataLoadingError,
} from './actions';

function* fetchAccountDataSaga() {
    try {
        const snapshot = yield db.ref("Accounts").once("value");
        const data = snapshot.val();
        yield put({ type: SAVE_ACCOUNT_DATA, payload: data });
    } catch (error) {
        yield put(dataLoadingError(error.message));
    }
}

function* fetchRoomDataSaga() {
    try {
        const snapshot = yield db.ref("Rooms").once("value");
        const data = snapshot.val();
        yield put({ type: SAVE_ROOM_DATA, payload: data });
    } catch (error) {
        yield put(dataLoadingError(error.message));
    }
}

function* userLogIn(action) {
    try {
        const { email, password } = action.payload;
        const usersRef = firebase.database().ref('Accounts');

        // Выполнить запрос к базе данных по указанной электронной почте
        const snapshot = yield usersRef.orderByChild('email').equalTo(email).once('value');

        if (snapshot.exists()) {
            // Пользователь с такой электронной почтой найден в базе данных
            const userData = snapshot.val();
            const userId = Object.keys(userData)[0];

            if (userData[userId].password === password) {
                // Пароль совпадает, авторизация успешна
                const user = {
                    email: userData[userId].email,
                    // Добавьте другие поля пользователя, если они есть в базе данных
                    // например, имя, фото профиля, и т. д.
                };
                yield put(loginSuccess(user));
            } else {
                // Пароль неправильный
                // Отправьте действие для отображения сообщения об ошибке или обработайте его в соответствии с логикой вашего приложения
            }
        } else {
            // Пользователь с такой электронной почтой не найден в базе данных
            // Отправьте действие для отображения сообщения об ошибке или обработайте его в соответствии с логикой вашего приложения
        }
    } catch (error) {
        // Обработка ошибки
        // Отправьте действие для отображения сообщения об ошибке или обработайте его в соответствии с логикой вашего приложения
    }
}

function* watchUsersSaga() {
    yield takeEvery('LOGIN', userLogIn);
}

function* watchFetchData() {
    yield takeEvery(FETCH_ACCOUNT_DATA, fetchAccountDataSaga);
    yield takeEvery(FETCH_ROOM_DATA, fetchRoomDataSaga);
}

export default function* rootSaga() {
    yield all([watchFetchData(), watchUsersSaga()]);
}