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
        const snapshot = yield usersRef.orderByChild('email').equalTo(email).once('value');

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const userId = Object.keys(userData)[0];

            if (userData[userId].password === password) {
                const user = {
                    email: userData[userId].email,
                };
                yield put(loginSuccess(user));
            } else {
                yield put(showErrorMessage('Incorrect password'));
            }
        } else {
            yield put(showErrorMessage('User not found'));
        }
    } catch (error) {
        yield put(showErrorMessage(error.message));
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