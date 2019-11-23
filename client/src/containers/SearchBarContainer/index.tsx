import React from "react";

// REDUX
import { connect } from "react-redux";
import { addData } from "../../redux/actions/databaseActions";
import {
  databaseDataSelector,
  databaseLoadingSelector,
  databaseErrorSelector
} from "../../redux/selectors";

// COMPONENTS
import { Form, InputGroup } from "react-bootstrap";

interface Props {
  onClick: () => void;
  onChange: (event: any) => void;
  placeholder: string;
  value?: any;
}

const SearchBarContainer = ({
  onClick,
  onChange,
  placeholder,
  value
}: Props) => {
  return (
    <>
      <InputGroup style={{ paddingBottom: "5px" }}>
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

const mapStateToProps = (state: any) => ({
  data: databaseDataSelector(state),
  loading: databaseLoadingSelector(state),
  error: databaseErrorSelector(state)
});

export default connect(mapStateToProps, {
  addData
})(SearchBarContainer);
