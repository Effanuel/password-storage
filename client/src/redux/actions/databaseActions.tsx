import * as constants from "./actionTypes";
import axios from "axios";

import { Thunk } from "../models/state";

export const fetchData = (payload: any): Thunk => async dispatch => {
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
    // const { name, login, password } = payload;
    const response = await axios.post("/api/putData", {
      id: 13,
      name: "NEWDATA",
      login: "GMAIL",
      password: "123ASD"
    });
    const { data } = response;
    console.log("ADDDATARESPONSE", response);
    dispatch(addDataSuccess(data));
  } catch (err) {
    console.log("FETCHDATAERROR", err);
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

function fetchDataError(payload: any): any {
  return {
    type: constants.FETCH_DATA_ERROR,
    payload: payload.error
  };
}
