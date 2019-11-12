import React from "react";

import { Button } from "react-bootstrap";
import "./styles.css";

const Card = (props: any) => {
  const { name, login, password } = props;
  return (
    <div className="container">
      <span className="name-login-container">
        <span className="name-style">{name} </span>
        <span className="login-style">{login}</span>
      </span>
      <div className="button-container">
        <Button variant="info">/</Button>
        <Button variant="danger">X</Button>
      </div>
    </div>
  );
};

export { Card };
