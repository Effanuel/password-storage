import React from "react";

import { connect } from "react-redux";
import { modalOpen, modalClose } from "../../redux/actions/modalActions";

import { ModalComponent, SpinnerComponent } from "../../components";

import { UpdateModalProps, UpdateModalState } from "../../@types";

const initialState = Object.freeze({ name: "", login: "", password: "" });

const handleClose = Symbol();
const handleChange = Symbol();

class UpdateModal extends React.Component<UpdateModalProps, UpdateModalState> {
  readonly state: any = initialState;

  [handleClose] = (): any => {
    this.props.modalClose();
  };

  [handleChange] = (event: any): any => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<UpdateModalState, keyof UpdateModalState>);
  };

  render() {
    const { showModal, loading } = this.props;
    return (
      <>
        <ModalComponent
          title="Update"
          show={showModal === "updateModal" || false}
          onSave={this[handleClose]}
          onClose={this[handleClose]}
          p_name="Name"
          p_password="Password"
          p_login="Login"
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
  modalClose
})(UpdateModal);
