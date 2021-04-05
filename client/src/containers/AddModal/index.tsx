import React, {useState} from 'react';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {modalClose} from '../../redux/modules/modal';
import {addData} from '../../redux/modules/database';
import {modalShowModalSelector, databaseLoadingSelector} from '../../redux/selectors';
import {ModalComponent} from '../../components';
import {ClipLoader} from 'react-spinners';
import {AddModalState, AddModalProps} from '../../@types';
import {scorePassword, generatePassword} from '../../utils';

const initialState = Object.freeze({
  name: '',
  login: '',
  password: '',
  passStr: 0,
});

export default function AddModal() {
  const dispatch = useDispatch();
  const [state, setState] = useState<AddModalState>(initialState);

  const {showModal, loading} = useSelector(
    (state: any): AddModalProps => ({
      showModal: modalShowModalSelector(state),
      loading: databaseLoadingSelector(state),
    }),
    shallowEqual,
  );

  function handleSave(): void {
    dispatch(addData(state));
  }

  function handleClose(): void {
    dispatch(modalClose());
    setState((prevState) => ({...prevState, initialState}));
  }

  function handleChange(event: any): void {
    const {id, value} = event.target;
    setState((prevState) => ({...prevState, [id]: value}));
  }

  function handlePasswordChange(event: any): void {
    const {value} = event.target;
    setState((prevState) => ({
      ...prevState,
      password: value,
      passStr: scorePassword(value),
    }));
  }

  function setPassword(value: string): void {
    setState((prevState) => ({
      ...prevState,
      password: value,
      passStr: scorePassword(value),
    }));
  }

  function handleGeneratePassword(): void {
    const generatedPassword = generatePassword(20);
    setPassword(generatedPassword);
  }

  return (
    <>
      <ModalComponent
        title="Add entry"
        show={showModal === 'addModal' || false}
        onSave={handleSave}
        onClose={handleClose}
        p_name="Name"
        p_login="Login"
        p_password="Password"
        passwordValue={state.password}
        onInputChange={handleChange}
        onPasswordChange={handlePasswordChange}
        onGeneratePassword={handleGeneratePassword}
        loadingComponent={loading ? <ClipLoader size={15} /> : null}
        disabled={!state.name || !state.login || !state.password || state.passStr < 30}
        progress={state.passStr}
      />
    </>
  );
}
