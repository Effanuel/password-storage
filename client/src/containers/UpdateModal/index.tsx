import React from "react";

import { connect } from "react-redux";
import { modalOpen, modalClose } from "../../redux/actions/modalActions";

import { ModalComponent } from "../../components";

const initialState = Object.freeze({ show: false });

const handleShow = Symbol();
const handleClose = Symbol();

class UpdateModal extends React.Component<any, any> {
  [handleShow] = (e: any): any => {
    this.setState({ show: !this.state.show });
  };

  [handleClose] = (): any => {
    this.props.modalClose();
  };

  render() {
    const { showModal } = this.props;
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
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: state.modal.showModal
});

export default connect(mapStateToProps, {
  modalOpen,
  modalClose
})(UpdateModal);
