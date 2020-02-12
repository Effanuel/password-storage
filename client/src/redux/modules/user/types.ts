//user
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_ERROR = "LOGIN_ERROR";
export type LOGIN_ERROR = "LOGIN_ERROR";

export const LOADING = "LOADING";
export type LOADING = "LOADING";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export type SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const SIGNUP_ERROR = "SIGNUP_ERROR";
export type SIGNUP_ERROR = "SIGNUP_ERROR";

// export type UserActions = LOGIN_SUCCESS | LOGIN_ERROR | LOADING | SIGNUP_SUCCESS |SIGNUP_ERROR

export interface UserState {
  loading: boolean;
  loggedIn: boolean;
  username: string;
}
