// import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import reducer from "./reducer";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // Другие редюсеры, если они есть
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;