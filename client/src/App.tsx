// /client/App.js
import React from "react";

// import { SpinnerComponent } from "./components";
import { SearchContainer } from "./containers";

class App extends React.Component<any, any> {
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
    return (
      <>
        <SearchContainer />
      </>
    );
  }
}
export default App;
