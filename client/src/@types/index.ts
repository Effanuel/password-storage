import { string } from "prop-types";

export type AddModalState = {
  name: string;
  login: string;
  password: string;
};

export type AddModalProps = {
  showModal: null | string;
  loading: boolean;
  modalOpen: (payload: string) => void;
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
  modalOpen: (payload: string) => void;
  modalClose: () => void;
};

export type SearchContainerState = {
  filtered: any;
  data: any;
};

export type SearchContainerProps = {
  data: any;
  loading: boolean;
  error: string;
  fetchData: () => void;
  removeData: (payload: string) => void;
  modalOpen: (payload: string) => void;
};
