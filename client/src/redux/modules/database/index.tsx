import axios from "axios";
import { encrypt } from "../../../utils/algo";
import { Thunk } from "../../models/state";
import { modalClose } from "../modal";
import {
  FETCH_DATA_ERROR,
  DATA_LOADING,
  FETCH_DATA_SUCCESS,
  SELECT_NAME,
  ADD_DATA_SUCCESS,
  DatabaseActions,
  DatabaseState
} from "./types";

const initialState = {
  data: [],
  loading: false,
  error: "",
  selectedName: {
    _id: "",
    name: "",
    login: "",
    password: ""
  }
};

export const DatabaseReducer = (
  state: DatabaseState = initialState,
  action: DatabaseActions
): DatabaseState => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };
    case DATA_LOADING:
      return { ...state, loading: true, error: "" };
    case FETCH_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SELECT_NAME:
      return {
        ...state,
        loading: false,
        error: "",
        selectedName: action.payload
      };
    // case ADD_DATA_ERROR:
    //   return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//
//
//
//
//
//
//
//
//

const encryptData = async (payload: string): Promise<string> => {
  try {
    const master_key = "hello";
    const encrypted = await encrypt(master_key, payload);
    return encrypted;
  } catch (err) {
    throw "Encryption failed.";
  }
};

export const fetchData = (): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.get("/api/getData");
    const { data } = response;
    dispatch(fetchDataSuccess(data));
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const addData = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const { name, login, password } = payload;
    // Encrypt password
    const encrypted_password = await encryptData(password);

    const response = await axios.post("/api/putData", {
      name,
      login,
      password: encrypted_password
    });
    console.log("ADDDATARESPONSE", response);
    // dispatch(addDataSuccess(data));
    dispatch(modalClose());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const removeData = (payload: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.delete("/api/deleteData", {
      data: {
        _id: payload
      }
    });
    console.log(response);
    dispatch(removeDataSuccess());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const updateData = ({
  _id,
  name,
  login,
  password
}: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    console.log(_id, name, login, password, "STATS");
    const encrypted_password = await encryptData(password);
    const response = await axios.post("/api/updateData", {
      data: {
        filter: { _id: _id },
        update: { name, login, password: encrypted_password }
      }
    });
    console.log(response);
    dispatch(modalClose());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const selectName = (payload: any): DatabaseActions => ({
  type: SELECT_NAME,
  payload: payload
});

const dataLoading = (): DatabaseActions => ({
  type: DATA_LOADING
});
const fetchDataSuccess = (payload: any): DatabaseActions => ({
  type: FETCH_DATA_SUCCESS,
  payload: payload.data
});

// const addDataSuccess = (payload: any): any => ({
//   type: ADD_DATA_SUCCESS,
//   payload: payload.success
// });

const removeDataSuccess = (payload?: any): DatabaseActions => ({
  type: ADD_DATA_SUCCESS,
  payload: payload
});

const fetchDataError = (payload: any): DatabaseActions => ({
  type: FETCH_DATA_ERROR,
  payload: payload.error
});
