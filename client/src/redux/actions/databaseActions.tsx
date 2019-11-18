import * as constants from "./actionTypes";
import axios from "axios";

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

export type Actions =
  | DataLoading
  | FetchDataSuccess
  | FetchDataError
  | AddDataSuccess;

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
    // let currentIds = this.state.data.map((data: any) => data.id);
    // let idToBeAdded = 0;
    // while (currentIds.includes(idToBeAdded)) {
    //   ++idToBeAdded;
    // }
    const { name, login, password } = payload;
    const response = await axios.post("/api/putData", {
      name: name,
      login: login,
      password: password
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
        name: payload
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
  name,
  login,
  password
}: any): Thunk => async dispatch => {
  try {
    dispatch(dataLoading());
    const response = await axios.delete("/api/updateData", {
      data: {
        filter: name,
        update: { login: login, password: password }
      }
    });
    console.log(response);
    dispatch(removeDataSuccess());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
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
