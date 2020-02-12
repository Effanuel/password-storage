import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { ModalState } from "../modules/modal/types";
import { DatabaseState } from "../modules/database/types";

export type Thunk = ThunkAction<void, any, any, Action<string>>;

export interface AppState {
  database: DatabaseState;
  modal: ModalState;
}
