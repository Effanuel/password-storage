import React from "react";

// REDUX
import { connect } from "react-redux";
import { modalOpen, modalClose } from "../../redux/actions/modalActions";
import { updateData } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector,
  databaseSelectedNameSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent, SpinnerComponent } from "../../components";

import { UpdateModalProps, UpdateModalState } from "../../@types";

const initialState = Object.freeze({ name: "", login: "", password: "" });

const handleSave = Symbol();
const handleClose = Symbol();
const handleChange = Symbol();

class UpdateModal extends React.Component<UpdateModalProps, UpdateModalState> {
  readonly state: any = initialState;

  componentDidMount() {
    this.setState(this.props.selectedName);
  }

  // static getDerivedStateFromProps(nextProps: any, prevState: any): any {
  //   // console.log(nextProps, "NEXTPROPS");
  //   // console.log(prevState, "PREVSTATE");
  //   // console.log("DERIVED", nextProps.items !== prevState.filtered);
  //   console.log(nextProps, nextProps);
  //   if (nextProps.showModal == "updateModal") {
  //     console.log("CALL GET DERIVED SETSTATE");
  //     return nextProps.selectedName;
  //   } else return null;
  // }

  [handleSave] = (): any => {
    this.props.updateData(this.state);
  };

  [handleClose] = (): any => {
    this.props.modalClose();
    this.setState(initialState);
  };

  [handleChange] = (event: any): any => {
    console.log(this.state);
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<UpdateModalState, keyof UpdateModalState>);
  };

  render() {
    const { showModal, loading } = this.props;
    const emptyStr = "";
    return (
      <>
        <ModalComponent
          title="Update"
          show={showModal === "updateModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          p_name={this.state.name || emptyStr}
          p_login={this.state.login || emptyStr}
          p_password={this.state.password || emptyStr}
          onInputChange={this[handleChange]}
          loadingComponent={loading ? <SpinnerComponent /> : null}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: modalShowModalSelector(state),
  loading: databaseLoadingSelector(state),
  selectedName: databaseSelectedNameSelector(state)
});

export default connect(mapStateToProps, {
  modalOpen,
  modalClose,
  updateData
})(UpdateModal);
