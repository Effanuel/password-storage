import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type Thunk = ThunkAction<void, any, any, Action<string>>;

export interface AppState {
  database: DatabaseState;
  modal: ModalState;
}

export interface DatabaseState {
  data: any;
  loading: boolean;
  error: string;
  showModalUpdate?: boolean;
  showModalAdd?: boolean;
  selectedName: any;
}

export interface ModalState {
  showModal: string | null | undefined;
}
