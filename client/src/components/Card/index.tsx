import React from "react";

import { Button } from "react-bootstrap";
import "./styles.css";

interface Props {
  name: string;
  login: string;
  password: string;
  onClickUpdate: (
    e: any,
    name: string,
    login: string,
    password: string
  ) => void;
  onClickRemove: (e: any, name: string) => void;
  onClickCopy: (e: any, password: string) => any;
}

const Card = ({
  name,
  login,
  password,
  onClickUpdate,
  onClickRemove,
  onClickCopy
}: Props) => {
  console.log(name, login, password, "card");

  return (
    <div className="container">
      <span
        className="name-login-container"
        onClick={(e: any) => onClickCopy(e, password)}
      >
        <span className="name-style">{name} </span>
        <span className="login-style">{login}</span>
      </span>
      <div className="button-container">
        <Button
          variant="info"
          onClick={(e: any) => onClickUpdate(e, name, login, password)}
        >
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
