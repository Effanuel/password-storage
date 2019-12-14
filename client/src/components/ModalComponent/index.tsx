import React from "react";

import { Button, Modal, Form, ProgressBar } from "react-bootstrap";

import "./styles.css";

import { styleProgress } from "../../utils/functions";

interface Props {
  title: string;
  show: boolean;
  onSave: () => void;
  onClose: () => void;
  p_name: string;
  p_login: string;
  p_password: string;
  onInputChange: (event: any) => void;
  onPasswordChange?: (event?: any) => void;
  loadingComponent: any;
  disabled?: boolean;
  progress?: any;
}

const ModalComponent = ({
  title,
  show,
  onSave,
  onClose,
  p_name,
  p_login,
  p_password,
  onInputChange,
  onPasswordChange,
  loadingComponent,
  disabled,
  progress
}: Props) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                placeholder={p_name}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Login</Form.Label>
              <Form.Control
                id="login"
                placeholder={p_login}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <h1>Generate password</h1>
              <Form.Control
                id="password"
                placeholder={p_password}
                onChange={onPasswordChange}
                type="password"
              />
              <ProgressBar
                variant={styleProgress(progress)}
                now={progress}
                style={{ height: "5px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave} disabled={disabled}>
            {loadingComponent || "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalComponent };
