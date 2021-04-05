import React from 'react';
import {FormGroup, Form} from 'react-bootstrap';
import './styles.css';

interface Props {
  id?: string;
  type?: any;
  label?: string;
  placeholder: string;
  value?: string;
  onChange: (event: any) => void;
}

export function Input({id, type = 'text', label, placeholder, value, onChange}: Props) {
  return (
    <FormGroup style={{paddingBottom: '0px', marginBottom: '0px'}}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        id={id}
        type={type}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </FormGroup>
  );
}
