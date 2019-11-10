import {
  FETCH_DATA_ERROR,
  DATA_LOADING,
  FETCH_DATA_SUCCESS,
  ADD_DATA_SUCCESS
} from "../actions/actionTypes";

// import { fetchData } from "../actions/databaseActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
  showModal: false
};

export default (state: any = initialState, action: any): any => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: "" };
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
