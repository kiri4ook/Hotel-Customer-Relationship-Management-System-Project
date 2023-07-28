import { put, takeLatest, all } from "redux-saga/effects";
import db from "./firebaseConfig";
import { FETCH_ACCOUNT_DATA, FETCH_ROOM_DATA, SAVE_ACCOUNT_DATA, SAVE_ROOM_DATA, dataLoadingError } from "./actions";

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

function* watchFetchData() {
    yield takeLatest(FETCH_ACCOUNT_DATA, fetchAccountDataSaga);
    yield takeLatest(FETCH_ROOM_DATA, fetchRoomDataSaga);
}

export default function* rootSaga() {
    yield all([watchFetchData()]);
}