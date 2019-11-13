import React from "react";
import { connect } from "react-redux";

import {
  fetchData,
  addData,
  removeData
} from "../../redux/actions/databaseActions";

// import { filteredDataSelector } from "../../redux/selectors";

import { SearchBar, SpinnerComponent, Card } from "../../components";

import "./styles.css";

interface Props {
  items: any;
  onClick: any;
  delete?: any;
}
interface State {
  filtered: [object];
  data: [object];
}

const initialState = Object.freeze({
  filtered: [],
  data: []
});

const handleChange = Symbol();
const handleAddData = Symbol();
const handleRemoveData = Symbol();
const handleUpdateData = Symbol();

class SearchContainer extends React.Component<any, any> {
  readonly state: any = initialState;
  myRef = React.createRef();

  componentDidMount() {
    this.props.fetchData();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(nextProps, "NEXTPROPS");
    // console.log(prevState, "PREVSTATE");
    // console.log("DERIVED", nextProps.items !== prevState.filtered);
    if (nextProps.data !== prevState.data) {
      console.log("CALL GET DERIVED SETSTATE");
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
    this.props.addData();
  };
  [handleRemoveData] = (e: any, value: any): void => {
    console.log(value);
    this.props.removeData(value);
  };
  [handleUpdateData] = (e: any, { name }: any): void => {
    console.log("update");
  };

  [handleChange] = (e: any) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.data;

      // Use .filter() to determine which data should be displayed
      // based on the search terms
      newList = currentList.filter((item: any) => {
        // change current item to lowercase
        const lc = JSON.stringify(item.name).toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.data;
    }
    // Set the filtered state based on what our rules added to newList
    console.log("NEWSTATE", newList);
    this.setState({
      filtered: newList
    });
  };

  render() {
    const { data, loading } = this.props;
    const { filtered } = this.state;
    return (
      <div className="search-container">
        <SearchBar
          onChange={this[handleChange]}
          onClick={this[handleAddData]}
          placeholder="Search..."
        />

        {// loading ? (sp) : (length == 0 ? "gogo" : )

        loading ? (
          <SpinnerComponent />
        ) : filtered &&
          filtered.constructor === Array &&
          filtered.length === 0 ? (
          "No entries found."
        ) : (
          filtered.map((item: any, i: any) => (
            <Card
              key={i}
              name={item.name}
              login={item.login}
              onClickRemove={this[handleRemoveData]}
              onClickUpdate={this[handleUpdateData]}
            />
            // <li key={i}>
            //   {item.name} &nbsp;
            //   {item.login} &nbsp;
            //   {item.password} &nbsp;
            //   <span
            //     className="delete"
            //     onClick={() => this.props.delete(item)}
            //   />
            // </li>
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.database.data,
  // filteredData: filteredDataSelector(state),
  loading: state.database.loading,
  error: state.database.error
});

export default connect(mapStateToProps, {
  fetchData,
  addData,
  removeData
})(SearchContainer);
