import {
  FETCH_DATA_ERROR,
  DATA_LOADING,
  FETCH_DATA_SUCCESS,
  ADD_DATA_SUCCESS
} from "../actions/actionTypes";

import { Actions } from "../actions/databaseActions";
import { DatabaseState } from "../models/state";

const initialState = {
  data: [],
  loading: false,
  error: "",
  showModal: false
};

export default (state: DatabaseState = initialState, action: Actions): any => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
        responseSuccess: false
      };
    case DATA_LOADING:
      return { ...state, loading: true, error: "" };
    case FETCH_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_DATA_SUCCESS:
      return { ...state, loading: false };

    // case ADD_DATA_ERROR:
    //   return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
