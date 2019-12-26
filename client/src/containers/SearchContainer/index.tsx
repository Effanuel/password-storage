import React, { Suspense, lazy } from "react";

// REDUX
import { connect } from "react-redux";
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

const handleChange = Symbol();
const handleAddData = Symbol();
const handleRemoveData = Symbol();
const handleUpdateData = Symbol();
const handleCopyPassword = Symbol();

class SearchContainer extends React.PureComponent<any, any> {
  readonly state: any = initialState;

  componentDidMount() {
    this.props.fetchData();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(nextProps, "NEXTPROPS");
    // console.log(prevState, "PREVSTATE");
    // console.log("DERIVED", nextProps.items !== prevState.filtered);
    if (nextProps.data !== prevState.data) {
      return { filtered: nextProps.data, data: nextProps.data };
    } else return null;
  }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   console.log("DID PREVPROPS", prevProps);
  //   console.log("DID PREVSTATE", prevProps);
  //   console.log("DID THISPROPS", this.props.data);
  //   // if (prevProps.data !== this.props.data) {
  //   //   //Perform some operation here
  //   //   this.setState({ filtered: this.props.data });
  //   // }
  // }

  [handleAddData] = (): void => {
    this.props.modalOpen("addModal");
  };
  [handleRemoveData] = (e: any, id: any): void => {
    this.props.removeData(id);
  };
  [handleUpdateData] = async (
    e: any,
    _id: any,
    name: string,
    login: string,
    password: string
  ): Promise<void> => {
    const decrypted_password = await decrypt("hello", password);
    console.log("OPEN UPDATE MODAL", _id);
    this.props.selectName({ _id, name, login, password: decrypted_password });
    this.props.modalOpen("updateModal");
  };

  [handleChange] = (e: any) => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.data;

      newList = currentList.filter((item: any) => {
        const lc = JSON.stringify(item.name).toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.data;
    }
    console.log("NEWSTATE", newList);
    this.setState({
      filtered: newList
    });
  };

  [handleCopyPassword] = async (
    e: any,
    password: string,
    id: any
  ): Promise<any> => {
    const textField = document.createElement("textarea");
    // Decrypt password with a phrase
    const decrypted_password = await decrypt("hello", password);
    textField.innerText = decrypted_password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    // Copied. message to appear/dissappear
    this.setState({ copied: id });
    setTimeout(() => {
      this.setState({ copied: -1 });
    }, 350);
  };

  render() {
    const { data, loading, error, showModal } = this.props;
    const { filtered } = this.state;

    return (
      <>
        <div className="search-container">
          <div style={{ color: "red" }}>{error}</div>
          <Loader loading={loading} height={5} color="#00ca45" />
          <SearchBarContainer
            onChange={this[handleChange]}
            onClick={this[handleAddData]}
            placeholder="Search..."
          />
          {filtered &&
          filtered.constructor === Array &&
          filtered.length === 0 ? (
            <div style={{ color: "white" }}>No results were found.</div>
          ) : (
            filtered.map((item: any, i: any) => (
              <Card
                id={item._id}
                key={i}
                name={item.name}
                login={item.login}
                password={item.password}
                onClickRemove={this[handleRemoveData]}
                onClickUpdate={this[handleUpdateData]}
                onClickCopy={this[handleCopyPassword]}
                copied={this.state.copied}
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
}

const mapStateToProps = (state: any) => ({
  data: databaseDataSelector(state),
  loading: databaseLoadingSelector(state),
  error: databaseErrorSelector(state),
  showModal: modalShowModalSelector(state)
});

export default connect(mapStateToProps, {
  fetchData,
  removeData,
  modalOpen,
  selectName
})(SearchContainer);
