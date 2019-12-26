import { combineReducers, createStore, applyMiddleware } from "redux";
import databaseReducer from "../reducers/databaseReducer";
import modalReducer from "../reducers/modalReducer";
// import websocketReducer from "../reducers/websocketReducer";

import thunk from "redux-thunk";

import { AppState } from "../models/state";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers<AppState>({
  database: databaseReducer,
  modal: modalReducer
});

const store = (state: any = initialState) =>
  createStore(rootReducer, state, applyMiddleware(...middleware));

export { store };
