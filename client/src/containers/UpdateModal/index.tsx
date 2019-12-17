import React from "react";

import { generatePassword, scorePassword } from "../../utils";

// REDUX
import { connect } from "react-redux";
import { modalOpen, modalClose } from "../../redux/actions/modalActions";
import { updateData } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector,
  databaseSelectedNameSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent } from "../../components";
import { ClipLoader } from "react-spinners";

import { UpdateModalProps, UpdateModalState } from "../../@types";

const initialState = Object.freeze({
  _id: "",
  name: "",
  login: "",
  password: "",
  passStr: ""
});

const handleSave = Symbol();
const handleClose = Symbol();
const handleChange = Symbol();
const handleGeneratePassword = Symbol();
const handlePasswordChange = Symbol();

class UpdateModal extends React.Component<any, any> {
  readonly state: any = initialState;

  componentDidMount() {
    const { name, login, password } = this.props.selectedName;
    this.setState({ name, login });
    this.setPassword(password);
  }

  // static getDerivedStateFromProps(nextProps: any, prevState: any): any {
  //   // console.log(nextProps, "NEXTPROPS");
  //   // console.log(prevState, "PREVSTATE");
  //   // console.log("DERIVED", nextProps.items !== prevState.filtered);
  //   console.log(prevState, "derived");
  //   if (prevState) {
  //     return nextProps.selectedName;
  //   } else return null;
  // }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   console.log("DID", prevState);
  // }

  [handleSave] = async (): Promise<void> => {
    //Handle no input change
    let key: string;
    for (key in this.state) {
      if ((this.state as any)[key] == "") {
        await this.setState({
          [key]: (this.props.selectedName as any)[key]
        });
      }
    }
    this.props.updateData(this.state);
  };

  [handleClose] = (): void => {
    this.props.modalClose();
    this.setState(initialState);
  };

  [handleChange] = (event: any): void => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<UpdateModalState, keyof UpdateModalState>);
  };
  [handlePasswordChange] = (event: any): void => {
    const { value } = event.target;
    this.setPassword(value);
  };

  [handleGeneratePassword] = (): void => {
    const generatedPassword = generatePassword(20);
    console.log("Generated password:", generatedPassword);
    this.setPassword(generatedPassword);
  };

  setPassword = (value: string): void => {
    this.setState({
      password: value,
      passStr: scorePassword(value)
    });
  };

  render() {
    const { showModal, loading, selectedName } = this.props;
    const { password, passStr } = this.state;
    return (
      <>
        <ModalComponent
          title="Update"
          show={showModal === "updateModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          p_name={selectedName.name}
          p_login={selectedName.login}
          p_password={selectedName.password}
          passwordValue={password}
          onPasswordChange={this[handlePasswordChange]}
          onGeneratePassword={this[handleGeneratePassword]}
          onInputChange={this[handleChange]}
          loadingComponent={loading ? <ClipLoader size={15} /> : null}
          progress={passStr}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: modalShowModalSelector(state),
  loading: databaseLoadingSelector(state),
  selectedName: databaseSelectedNameSelector(state)
});

export default connect(mapStateToProps, {
  modalOpen,
  modalClose,
  updateData
})(UpdateModal);
