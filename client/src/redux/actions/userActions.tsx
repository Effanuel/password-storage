import * as constants from './actionTypes';
import {Thunk} from '../models/state';

export const login = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(loading());

    dispatch(loginSuccess());
  } catch (e) {
    dispatch(loginError());
  }
};
export const signup = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(loading());

    dispatch(signupSuccess());
  } catch (e) {
    dispatch(signupError());
  }
};

const loading = (payload?: any): any => ({
  type: constants.LOADING,
});

const loginSuccess = (payload?: any): any => ({
  type: constants.LOGIN_SUCCESS,
});

const loginError = (payload?: any): any => ({
  type: constants.LOGIN_ERROR,
});

const signupSuccess = (payload?: any): any => ({
  type: constants.SIGNUP_SUCCESS,
});

const signupError = (payload?: any): any => ({
  type: constants.SIGNUP_ERROR,
});
