import React from "react";

import { FormGroup, Form } from "react-bootstrap";

import "./styles.css";

const Input = ({ label, placeholder, value, onChange, ...otherProps }: any) => {
  return (
    <FormGroup style={{ paddingBottom: "0px", marginBottom: "0px" }}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="text"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        {...otherProps}
      />
    </FormGroup>
  );
};

export { Input };
