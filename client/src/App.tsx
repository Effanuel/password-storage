// /client/App.js
import React from "react";

// import { SpinnerComponent } from "./components";
import { SearchContainer } from "./containers";

// const initialState = Object.freeze({
//   data: [],
//   id: 0,
//   name: null,
//   login: null,
//   password: null,
//   intervalIsSet: false,
//   idToDelete: null,
//   idToUpdate: null,
//   objectToUpdate: null,
//   searchTerm: ""
//   // list: ["Go to the store", "Wash the dishes", "Learn some code"]
// });

// const handleChange = Symbol();

class App extends React.Component<any, any> {
  // readonly state: any = initialState;

  // componentDidMount() {
  //   this.props.fetchData();

  //   // if (!this.state.intervalIsSet) {
  //   //   let interval = setInterval(this.getDataFromDb, 5000);
  //   //   this.setState({ intervalIsSet: interval });
  //   //   console.log("mount did interval");
  //   // }
  // }

  // // // never let a process live forever
  // // // always kill a process everytime we are done using it
  // componentWillUnmount() {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }
  // componentWillReceiveProps(nextProps: any, prevProps: any) {
  //   console.log(nextProps, "NEXT PROPS");
  //   console.log(prevProps, "PREV PROPS");
  // }

  // // our update method that uses our backend api
  // // to overwrite existing data base information
  // updateDB = (idToUpdate: any, updateToApply: any) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.state.data.forEach((dat: any) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post("http://localhost:3001/api/updateData", {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply }
  //   });
  // };

  render() {
    // const { list, data } = this.state;
    // const { data, loading, error } = this.props;
    return (
      <>
        <SearchContainer />
        {/* {(loading && <SpinnerComponent />) || (
          <SearchContainer items={data} onClick={this.props.addData} />
        )} */}
      </>

      // <div>
      //   <ul>
      //     {data.length <= 0
      //       ? "NO DB ENTRIES YET"
      //       : data.map((dat: any) => (
      //           <li style={{ padding: "10px" }} key={data.name}>
      //             <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
      //             <span style={{ color: "gray" }}> name: </span> {dat.name}{" "}
      //             <br />
      //             <span style={{ color: "gray" }}> login: </span> {dat.login}{" "}
      //             <br />
      //             <span style={{ color: "gray" }}> password: </span>{" "}
      //             {dat.password} <br />
      //           </li>
      //         ))}
      //   </ul>
      //   <div style={{ padding: "10px" }}>
      //     <input
      //       type="text"
      //       onChange={this[handleChange]}
      //       placeholder="NAME"
      //       id="name"
      //       style={{ width: "100px" }}
      //     />
      //     <input
      //       type="text"
      //       onChange={e => this.setState({ login: e.target.value })}
      //       placeholder="LOGIN"
      //       style={{ width: "100px" }}
      //     />
      //     <input
      //       type="text"
      //       onChange={e => this.setState({ password: e.target.value })}
      //       placeholder="PASSWORD"
      //       style={{ width: "100px" }}
      //     />
      //     <button onClick={() => this.putDataToDB(this.state.name)}>ADD</button>
      //   </div>
      //   <div style={{ padding: "10px" }}>
      //     <input
      //       type="text"
      //       style={{ width: "200px" }}
      //       onChange={e => this.setState({ idToDelete: e.target.value })}
      //       placeholder="put id of item to delete here"
      //     />
      //     <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
      //       DELETE
      //     </button>
      //   </div>
      //   <div style={{ padding: "10px" }}>
      //     <input
      //       type="text"
      //       style={{ width: "200px" }}
      //       onChange={e => this.setState({ idToUpdate: e.target.value })}
      //       placeholder="id of item to update here"
      //     />
      //     <input
      //       type="text"
      //       style={{ width: "200px" }}
      //       onChange={e => this.setState({ updateToApply: e.target.value })}
      //       placeholder="put new value of the item here"
      //     />
      //     <button
      //       onClick={() =>
      //         this.updateDB(this.state.idToUpdate, this.state.updateToApply)
      //       }
      //     >
      //       UPDATE
      //     </button>
      //   </div>
      // </div>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//   data: state.database.data,
//   loading: state.database.loading,
//   error: state.database.error
//   // preview: state.preview
// });

// export default connect(
//   mapStateToProps,
//   {
//     fetchData,
//     addData
//   }
// )(App);
export default App;
