import * as constants from './actionTypes';
import axios from 'axios';
import {encrypt} from '../../utils/algo';

import {Thunk} from '../models/state';
import {modalClose} from './modalActions';

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

export type Actions = DataLoading | FetchDataSuccess | FetchDataError | AddDataSuccess | SelectName;

const encryptData = async (payload: string): Promise<string> => {
  try {
    const master_key = 'hello';
    const encrypted = await encrypt(master_key, payload);
    return encrypted;
  } catch (err) {
    throw 'Encryption failed.';
  }
};

export const fetchData = (payload?: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.get('/api/getData');
    const {data} = response;
    dispatch(fetchDataSuccess(data));
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const addData = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const {name, login, password} = payload;
    // Encrypt password
    const encrypted_password = await encryptData(password);

    const response = await axios.post('/api/putData', {
      name,
      login,
      password: encrypted_password,
    });
    console.log('ADDDATARESPONSE', response);
    // dispatch(addDataSuccess(data));
    dispatch(modalClose());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const removeData = (payload: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    const response = await axios.delete('/api/deleteData', {
      data: {
        _id: payload,
      },
    });
    console.log(response);
    dispatch(removeDataSuccess());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const updateData = ({_id, name, login, password}: any): Thunk => async (dispatch) => {
  try {
    dispatch(dataLoading());
    console.log(_id, name, login, password, 'STATS');
    const encrypted_password = await encryptData(password);
    const response = await axios.post('/api/updateData', {
      data: {
        filter: {_id: _id},
        update: {name, login, password: encrypted_password},
      },
    });
    console.log(response);
    dispatch(modalClose());
    dispatch(fetchData());
  } catch (err) {
    dispatch(fetchDataError(err));
  }
};

export const selectName = (payload: any): any => ({
  type: constants.SELECT_NAME,
  payload: payload,
});

const dataLoading = (payload?: any): any => ({
  type: constants.DATA_LOADING,
});
const fetchDataSuccess = (payload: any): any => ({
  type: constants.FETCH_DATA_SUCCESS,
  payload: payload.data,
});

// const addDataSuccess = (payload: any): any => ({
//   type: constants.ADD_DATA_SUCCESS,
//   payload: payload.success
// });

const removeDataSuccess = (payload?: any): any => ({
  type: constants.ADD_DATA_SUCCESS,
  payload: payload,
});

const fetchDataError = (payload: any): any => ({
  type: constants.FETCH_DATA_ERROR,
  payload: payload.error,
});
