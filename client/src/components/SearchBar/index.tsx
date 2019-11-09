import React from "react";

import { Form, InputGroup } from "react-bootstrap";

interface Props {
  onClick: () => void;
  onChange: (event: any) => void;
  placeholder: string;
  value?: any;
}

const SearchBar = (props: Props) => {
  const { onClick, onChange, placeholder, value } = props;

  return (
    <>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        <InputGroup.Prepend onClick={onClick}>
          <InputGroup.Text>Add</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </>
  );
};

export { SearchBar };
