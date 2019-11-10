import React from "react";

import { SearchBar } from "../";

interface Props {
  items: any;
  onClick: any;
  delete?: any;
}
interface State {
  filtered: [object];
  items: [object];
}

const initialState = Object.freeze({
  filtered: [],
  items: []
});

const handleChange = Symbol();

class List extends React.Component<Props, State> {
  readonly state: any = initialState;

  componentDidMount() {
    this.setState({
      items: this.props.items,
      filtered: this.props.items
    });
    console.log(this.props.items);
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    console.log("DERIVED", nextProps.items !== prevState.items);
    if (nextProps.items !== prevState.items) {
      return { items: nextProps.items };
    } else return null;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(prevProps, "=================PROPS PREV");
    console.log(prevState, "=================PROPS STATE");
  }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (prevProps.items !== this.props.items) {
  //     //Perform some operation here
  //     this.setState({ items: someValue });
  //     this.classMethod();
  //   }
  // }

  [handleChange] = (e: any) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.items;

      // Use .filter() to determine which items should be displayed
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
      newList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          onChange={this[handleChange]}
          onClick={this.props.onClick}
          placeholder="Search..."
        />
        <ul>
          {this.state.filtered.map((item: any, i: any) => (
            <li key={i}>
              {item.name} &nbsp;
              {item.login} &nbsp;
              {item.password} &nbsp;
              <span
                className="delete"
                onClick={() => this.props.delete(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { List };
