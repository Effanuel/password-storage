//database
export const DATA_LOADING = 'DATA_LOADING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
export const SELECT_NAME = 'SELECT_NAME';

interface DataLoading {
  type: typeof DATA_LOADING;
}

interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: any;
}

interface FetchDataError {
  type: typeof FETCH_DATA_ERROR;
  payload: any;
}

interface AddDataSuccess {
  type: typeof ADD_DATA_SUCCESS;
  payload: any;
}

interface SelectName {
  type: typeof SELECT_NAME;
  payload: object;
}

export type DatabaseActions = DataLoading | FetchDataSuccess | FetchDataError | AddDataSuccess | SelectName;

export interface DatabaseState {
  data: any;
  loading: boolean;
  error: string;
  selectedName: any;
}
