import { createSelector } from "reselect";

import { AppState } from "../models/state";

const getData = (state: AppState) => state.database.data;
const getLoading = (state: AppState) => state.database.loading;
const getError = (state: AppState) => state.database.error;
const getSelectedName = (state: AppState) => state.database.selectedName;
const getShowModal = (state: AppState) => state.modal.showModal;

export const databaseDataSelector = createSelector(
  [getData],
  (data: any) => data
);
export const databaseLoadingSelector = createSelector(
  [getLoading],
  (loading: boolean) => loading
);
export const databaseErrorSelector = createSelector(
  [getError],
  (error: string) => error
);

export const databaseSelectedNameSelector = createSelector(
  [getSelectedName],
  (selectedName: any) => selectedName
);
export const modalShowModalSelector = createSelector(
  [getShowModal],
  (showModal: any) => showModal
);
