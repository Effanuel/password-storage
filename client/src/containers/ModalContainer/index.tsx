import React from "react";

import { Button, Modal, Form } from "react-bootstrap";

const initialState = Object.freeze({ show: false });

const handleShow = Symbol();
const handleClose = Symbol();

class ModalContainer extends React.Component<any, any> {
  readonly state: any = initialState;

  [handleShow] = (e: any): any => {
    this.setState({ show: !this.state.show });
  };

  [handleClose] = (): any => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { show } = this.state;
    return (
      <>
        <Button variant="primary" onClick={this[handleShow]}>
          /
        </Button>

        <Modal show={show} onHide={this[handleClose]}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGroupLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this[handleClose]}>
              Close
            </Button>
            <Button variant="primary" onClick={this[handleClose]}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export { ModalContainer };
