import * as constants from "./actionTypes";
import axios from "../../utils/axios";
import { encrypt } from "../../utils/algo";

import { Thunk } from "../models/state";
import { modalClose } from "./modalActions";

interface DataLoading {
  type: constants.DATA_LOADING;
}
interface FetchDataSuccess {
  type: constants.FETCH_DATA_SUCCESS;
  payload: any;
}

interface FetchDataError {
  type: constants.FETCH_DATA_ERROR;
  payload: any;
}

interface AddDataSuccess {
  type: constants.ADD_DATA_SUCCESS;
  payload: any;
}

interface SelectName {
  type: constants.SELECT_NAME;
  payload: object;
}

export type Actions =
  | DataLoading
  | FetchDataSuccess
  | FetchDataError
  | AddDataSuccess
  | SelectName;

const encryptData = async (payload: string): Promise<string> => {
  try {
    const master_key = "hello";
    const encrypted = await encrypt(master_key, payload);
    return encrypted;
  } catch (err) {
    throw "Encryption failed.";
  }
};

export const fetchData = (payload?: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.get("/api/getData");
    const { data } = response;
    dispatch(fetchDataSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
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
    console.log("FETCHDATAERROR", err);
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

export const selectName = (payload: any): any => {
  return {
    type: constants.SELECT_NAME,
    payload: payload
  };
};

function dataLoading(payload?: any): any {
  return {
    type: constants.DATA_LOADING
  };
}

function fetchDataSuccess(payload: any): any {
  console.log("SUCCESS pay.data", payload.data);
  return {
    type: constants.FETCH_DATA_SUCCESS,
    payload: payload.data
  };
}

function addDataSuccess(payload: any): any {
  return {
    type: constants.ADD_DATA_SUCCESS,
    payload: payload.success
  };
}

function removeDataSuccess(payload?: any): any {
  return {
    type: constants.ADD_DATA_SUCCESS,
    payload: payload
  };
}

function fetchDataError(payload: any): any {
  return {
    type: constants.FETCH_DATA_ERROR,
    payload: payload.error
  };
}
