import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {DatabaseReducer} from '../modules/database';
import {ModalReducer} from '../modules/modal';
import {AppState} from '../models/state';

const initialState = {};
const middleware = [thunk];

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers<AppState>({
  database: DatabaseReducer,
  modal: ModalReducer,
});

const store = (state: any = initialState) =>
  createStore(rootReducer, state, composeEnhancers(applyMiddleware(...middleware)));

export {store};
