import { combineReducers, createStore, applyMiddleware } from "redux";
import databaseReducer from "../reducers/databaseReducer";
// import websocketReducer from "../reducers/websocketReducer";

import thunk from "redux-thunk";

// import { AppState } from "../models/state";

const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers<any>({
  database: databaseReducer
  //   preview: previewReducer,
  //   websocket: websocketReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export { store };
