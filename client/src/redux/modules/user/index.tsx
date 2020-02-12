import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOADING,
  UserState
} from "./types";
import { Thunk } from "../../models/state";

const initialState = {
  loading: false,
  loggedIn: false,
  username: ""
};

export const UserReducer = (
  state: UserState = initialState,
  action: any
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state };
    case LOGIN_ERROR:
      return { ...state };
    case SIGNUP_SUCCESS:
      return { ...state };
    case SIGNUP_ERROR:
      return { ...state };
    case LOADING:
      return { ...state };
    default:
      return state;
  }
};

export const login = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(loading());

    dispatch(loginSuccess());
  } catch (e) {
    dispatch(loginError());
  }
};
export const signup = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(loading());

    dispatch(signupSuccess());
  } catch (e) {
    dispatch(signupError());
  }
};

const loading = (payload?: any): any => ({
  type: LOADING
});

const loginSuccess = (payload?: any): any => ({
  type: LOGIN_SUCCESS
});

const loginError = (payload?: any): any => ({
  type: LOGIN_ERROR
});

const signupSuccess = (payload?: any): any => ({
  type: SIGNUP_SUCCESS
});

const signupError = (payload?: any): any => ({
  type: SIGNUP_ERROR
});
