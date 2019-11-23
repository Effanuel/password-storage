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
  (loading: any) => loading
);
export const databaseErrorSelector = createSelector(
  [getError],
  (error: any) => error
);

export const databaseSelectedNameSelector = createSelector(
  [getSelectedName],
  (selectedName: any) => selectedName
);
export const modalShowModalSelector = createSelector(
  [getShowModal],
  (showModal: any) => showModal
);

// const getSearchTerm = (state: AppState) => state.database.searchTerm;

// export const filteredDataSelector = createSelector(
//   [getData, getSearchTerm],
//   (data: [object], searchTerm: string): any => {
//     let currentList: any = [];
//     let newList: any = [];

//     if (searchTerm !== "") {
//       currentList = data;
//       newList = currentList.filter((item: any) => {
//         const lc = JSON.stringify(item.name).toLowerCase();
//         const filter = searchTerm.toLowerCase();
//         return lc.includes(filter);
//       });
//     } else {
//       newList = data;
//     }
//     return newList;
//   }
// );
