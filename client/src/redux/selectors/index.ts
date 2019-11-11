import { createSelector } from "reselect";

import { AppState } from "../models/state";

const getError = (state: AppState) => state.database.error;
const getData = (state: AppState) => state.database.data;
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
