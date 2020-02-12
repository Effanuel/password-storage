import React from "react";

import { Modal, Form, ProgressBar } from "react-bootstrap";

import { Input, ButtonComponent } from "../";

import { GiCycle } from "react-icons/gi";
import { IoIosEye } from "react-icons/io";
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
  passwordValue?: string;
  onInputChange: (event: any) => void;
  onPasswordChange: (event: any) => void;
  onGeneratePassword?: () => void;
  loadingComponent: any;
  disabled?: boolean;
  progress: number;
}

const ModalComponent = ({
  title,
  show,
  onSave,
  onClose,
  p_name,
  p_login,
  p_password,
  passwordValue,
  onInputChange,
  onPasswordChange,
  onGeneratePassword,
  loadingComponent,
  disabled,
  progress
}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="modal-content">
      <Modal show={show} onHide={onClose} dialogClassName="modal-style">
        <Modal.Header className="modal-header-style">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-style">
          <Form>
            <Form.Group>
              <Input
                label="Name"
                id="name"
                placeholder={p_name}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Input
                label="Login"
                id="login"
                placeholder={p_login}
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group>
              <div className="pass-container">
                <Form.Label>Password</Form.Label>
                <div>
                  <span
                    className="generate"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <IoIosEye />
                  </span>
                  <label className="generate-style">Generate</label>
                  <span className="generate" onClick={onGeneratePassword}>
                    <GiCycle />
                  </span>
                </div>
              </div>
              <Input
                value={passwordValue}
                id="password"
                placeholder={p_password}
                onChange={onPasswordChange}
                type={showPassword ? "text" : "password"}
              />
              <ProgressBar
                variant={styleProgress(progress)}
                now={progress}
                className="progressBarStyle"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-style">
          <ButtonComponent type="close" label="Close" onClick={onClose} />
          <ButtonComponent
            label={loadingComponent || "Save Changes"}
            onClick={onSave}
            disabled={disabled}
          />
          {/* <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave} disabled={disabled}>
            {loadingComponent || "Save Changes"}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { ModalComponent };
