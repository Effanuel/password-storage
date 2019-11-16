import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type Thunk = ThunkAction<void, any, any, Action<string>>;

export interface AppState {
  database: DatabaseState;
}

export interface DatabaseState {
  data: any;
  loading: boolean;
  error: string;
  showModal: boolean;
  selectedName: any
}
