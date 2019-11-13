import React from "react";

import { Button } from "react-bootstrap";
import "./styles.css";

interface Props {
  name: string;
  login: string;
  password?: string;
  onClickUpdate: (e: any, name: string) => void;
  onClickRemove: (e: any, name: string) => void;
}

const Card = ({
  name,
  login,
  password,
  onClickUpdate,
  onClickRemove
}: Props) => {
  let myRef: any = React.createRef();
  return (
    <div className="container">
      <span className="name-login-container">
        <span className="name-style">{name} </span>
        <span className="login-style">{login}</span>
      </span>
      <div className="button-container">
        <Button variant="info" onClick={(e: any) => onClickUpdate(e, name)}>
          /
        </Button>
        <Button variant="danger" onClick={(e: any) => onClickRemove(e, name)}>
          X
        </Button>
      </div>
    </div>
  );
};

export { Card };
