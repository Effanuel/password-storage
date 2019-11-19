import React from "react";

import { connect } from "react-redux";
import { modalOpen, modalClose } from "../../redux/actions/modalActions";
import { addData } from "../../redux/actions/databaseActions";

import { ModalComponent, SpinnerComponent } from "../../components";

import { AddModalState, AddModalProps } from "../../@types";

const initialState = Object.freeze({ name: "", login: "", password: "" });

const handleSave = Symbol();
const handleClose = Symbol();
const handleChange = Symbol();

class AddModal extends React.Component<AddModalProps, AddModalState> {
  readonly state: AddModalState = initialState;

  [handleSave] = (): void => {
    this.props.addData(this.state);
  };

  [handleClose] = (): void => {
    this.props.modalClose();
    this.setState(initialState);
  };
  [handleChange] = (event: any): any => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<AddModalState, keyof AddModalState>);
  };

  render() {
    const { showModal, loading } = this.props;
    return (
      <>
        <ModalComponent
          title="Add entry"
          show={showModal === "addModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          p_name="Name"
          p_login="Login"
          p_password="Password"
          onInputChange={this[handleChange]}
          loadingComponent={loading ? <SpinnerComponent /> : null}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: state.modal.showModal,
  loading: state.database.loading
});

export default connect(mapStateToProps, {
  modalOpen,
  modalClose,
  addData
})(AddModal);
