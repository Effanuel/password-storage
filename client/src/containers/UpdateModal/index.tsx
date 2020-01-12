import React, { useEffect, useState } from "react";
// REDUX
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { modalClose } from "../../redux/actions/modalActions";
import { updateData } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector,
  databaseSelectedNameSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent } from "../../components";
import { ClipLoader } from "react-spinners";
// UTILS
import { UpdateModalProps, UpdateModalState } from "../../@types";
import { generatePassword, scorePassword } from "../../utils";
// INIT STATE
const initialState = Object.freeze({
  _id: "",
  name: "",
  login: "",
  password: "",
  passStr: 0
});

export default function UpdateModal() {
  const [state, setState] = useState<UpdateModalState>(initialState);

  // --- REDUX ---
  const dispatch = useDispatch();
  const { showModal, loading, selectedName } = useSelector(
    (state: any): UpdateModalProps => ({
      showModal: modalShowModalSelector(state),
      loading: databaseLoadingSelector(state),
      selectedName: databaseSelectedNameSelector(state)
    }),
    shallowEqual
  );
  // --- --- ---

  useEffect(() => {
    const { _id, name, login, password } = selectedName;
    setState(prevState => ({
      ...prevState,
      _id,
      name,
      login
    }));
    setPassword(password);
  }, [selectedName]);

  // Handles saving update data
  const handleSave = async (): Promise<void> => {
    //Handle no input change
    for (let key in Object.keys(state)) {
      if ((state as any)[key] === "") {
        await setState(prevState => ({
          ...prevState,
          [key]: (selectedName as any)[key]
        }));
      }
    }
    dispatch(updateData(state));
  };

  // Handles closing modal
  function handleClose(): void {
    dispatch(modalClose());
    // setState(prevState => ({
    //   ...prevState,
    //   initialState
    // }));
  }

  // Handles input change
  function handleChange(event: any): void {
    const { id, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  function handlePasswordChange(event: any): void {
    const { value } = event.target;
    setPassword(value);
  }

  function handleGeneratePassword(): void {
    const generatedPassword = generatePassword(20);
    console.log("Generated password:", generatedPassword);
    setPassword(generatedPassword);
  }

  // Fills password input
  function setPassword(value: string): void {
    setState(prevState => ({
      ...prevState,
      password: value,
      passStr: scorePassword(value)
    }));
  }

  return (
    <>
      <ModalComponent
        title="Update"
        show={showModal === "updateModal" || false}
        onSave={handleSave}
        onClose={handleClose}
        p_name={selectedName.name}
        p_login={selectedName.login}
        p_password={selectedName.password}
        passwordValue={state.password}
        onPasswordChange={handlePasswordChange}
        onGeneratePassword={handleGeneratePassword}
        onInputChange={handleChange}
        loadingComponent={loading ? <ClipLoader size={15} /> : null}
        progress={state.passStr}
      />
    </>
  );
}
