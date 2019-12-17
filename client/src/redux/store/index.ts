import { combineReducers, createStore, applyMiddleware } from "redux";
import databaseReducer from "../reducers/databaseReducer";
import modalReducer from "../reducers/modalReducer";
// import websocketReducer from "../reducers/websocketReducer";
import { AppState } from "../models/state";
import thunk from "redux-thunk";

// import { AppState } from "../models/state";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers<AppState>({
  database: databaseReducer,
  modal: modalReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export { store };
