import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import databaseReducer from "../reducers/databaseReducer";
import modalReducer from "../reducers/modalReducer";
// import websocketReducer from "../reducers/websocketReducer";

import thunk from "redux-thunk";

import { AppState } from "../models/state";

const initialState = {};
const middleware = [thunk];

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers<AppState>({
  database: databaseReducer,
  modal: modalReducer
});

const store = (state: any = initialState) =>
  createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(...middleware))
  );

export { store };
