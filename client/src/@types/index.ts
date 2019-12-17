import { string } from "prop-types";

export type AddModalState = {
  name: string;
  login: string;
  password: string;
};

export type AddModalProps = {
  showModal: null | string;
  loading: boolean;
  modalClose: () => void;
  addData: (payload: AddModalState) => void;
};

export type UpdateModalState = {
  name: string;
  login: string;
  password: string;
};
export type UpdateModalProps = {
  showModal: null | string;
  loading: boolean;
  selectedName: object;
  modalOpen: (payload: string) => void;
  modalClose: () => void;
  updateData: (payload: object) => void;
};

export type SearchContainerState = {
  filtered: any;
  data: any;
};

export type SearchContainerProps = {
  data: any;
  loading: boolean;
  error: string;
  showModal: any;
  fetchData: () => void;
  removeData: (payload: string) => void;
  modalOpen: (payload: string) => void;
  selectName: (payload: object) => void;
};
