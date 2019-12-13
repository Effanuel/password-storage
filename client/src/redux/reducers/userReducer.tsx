import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOADING
} from "../actions/actionTypes";

// import { Actions } from "../actions/modalActions";
// import { ModalState } from "../models/state";

const initialState = {
  loading: false
};

export default (state: any = initialState, action: any): any => {
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
