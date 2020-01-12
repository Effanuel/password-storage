import React, { Suspense, lazy, useState, useEffect } from "react";

// REDUX
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
  fetchData,
  removeData,
  selectName
} from "../../redux/actions/databaseActions";
import { modalOpen } from "../../redux/actions/modalActions";
import {
  databaseDataSelector,
  databaseLoadingSelector,
  databaseErrorSelector,
  modalShowModalSelector
} from "../../redux/selectors";

// COMPONENTS
import { SearchContainerProps, SearchContainerState } from "../../@types";
import { Card, Loader } from "../../components";
import { SearchBarContainer } from "../";

// UTIL
import "./styles.css";
import { decrypt } from "../../utils";

// LAZY
const AddModal = lazy(() => import("../AddModal"));
const UpdateModal = lazy(() => import("../UpdateModal"));

const initialState = Object.freeze({
  filtered: [],
  data: [],
  copied: -1
});

export default function SearchContainer(props: any) {
  const [state, setState] = useState<SearchContainerState>(initialState);
  // --- REDUX ---
  const dispatch = useDispatch();
  const { data, loading, error, showModal } = useSelector(
    (state: any): SearchContainerProps => ({
      data: databaseDataSelector(state),
      loading: databaseLoadingSelector(state),
      error: databaseErrorSelector(state),
      showModal: modalShowModalSelector(state)
    }),
    shallowEqual
  );
  // --- --- ---

  //componentDidMount
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  //PropsDidUpdate
  useEffect(() => {
    if (data !== state.data) {
      setState(prevState => ({
        ...prevState,
        filtered: data,
        data
      }));
    }
  }, [data]);

  function handleAddData(): any {
    dispatch(modalOpen("addModal"));
  }
  function handleRemoveData(e: any, id: any): void {
    dispatch(removeData(id));
  }
  async function handleUpdateData(
    e: any,
    _id: any,
    name: string,
    login: string,
    password: string
  ): Promise<void> {
    const decrypted_password = await decrypt("hello", password);
    console.log("OPEN UPDATE MODAL", _id);
    dispatch(selectName({ _id, name, login, password: decrypted_password }));
    dispatch(modalOpen("updateModal"));
  }

  function handleChange(e: any) {
    let currentList = [];
    let newList: any = [];

    if (e.target.value !== "") {
      currentList = state.data;

      newList = currentList.filter((item: any) => {
        const lc = JSON.stringify(item.name).toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = state.data;
    }
    setState(prevState => ({
      ...prevState,
      filtered: newList
    }));
  }

  async function handleCopyPassword(
    e: any,
    password: string,
    id: any
  ): Promise<any> {
    const textField = document.createElement("textarea");
    // Decrypt password with a phrase
    const decrypted_password = await decrypt("hello", password);
    textField.innerText = decrypted_password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    // Copied. message to appear/dissappear
    setState(prevState => ({
      ...prevState,
      copied: id
    }));
    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        copied: -1
      }));
    }, 350);
  }

  return (
    <>
      <div className="search-container">
        <div style={{ color: "red" }}>{error}</div>
        <Loader loading={loading} height={5} color="#00ca45" />
        <SearchBarContainer
          onChange={handleChange}
          onClick={handleAddData}
          placeholder="Search..."
        />
        {state.filtered &&
        state.filtered.constructor === Array &&
        state.filtered.length === 0 ? (
          <div style={{ color: "white" }}>No results were found.</div>
        ) : (
          state.filtered.map((item: any, i: any) => (
            <Card
              id={item._id}
              key={i}
              name={item.name}
              login={item.login}
              password={item.password}
              onClickRemove={handleRemoveData}
              onClickUpdate={handleUpdateData}
              onClickCopy={handleCopyPassword}
              copied={state.copied}
            />
          ))
        )}
      </div>
      {showModal === "addModal" && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddModal />
        </Suspense>
      )}
      {showModal === "updateModal" && (
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateModal />
        </Suspense>
      )}
    </>
  );
}
