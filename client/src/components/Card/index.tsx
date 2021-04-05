import React from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';
import styles from './styles.module.css';

const {container, buttonStyle, deleteStyle, edit, nameLoginContainer, nameStyle, loginStyle, copiedStyle} = styles;

interface Props {
  id: string | undefined;
  name: string;
  login: string;
  password: string;
  onClickUpdate: (id: string | undefined, name: string, login: string, password: string) => Promise<void> | void;
  onClickRemove: (id: string | undefined) => void;
  onClickCopy: (password: string, id: string | undefined) => void;
  copied: number | string;
}

export function Card({id, name, login, password, onClickUpdate, onClickRemove, onClickCopy, copied}: Props) {
  return (
    <div className={container}>
      <span className={nameLoginContainer} id={id} onClick={() => onClickCopy(password, id)}>
        <span className={nameStyle}>{name} </span>
        <span className={loginStyle}>{login}</span>
      </span>
      {copied === id && <div className={copiedStyle}>Copied.</div>}
      <div className={styles['button-container']}>
        <div className={buttonStyle} id={edit} onClick={() => onClickUpdate(id, name, login, password)}>
          <MdEdit size={25} />
        </div>
        <div className={buttonStyle} id={deleteStyle} onClick={() => onClickRemove(id)}>
          <MdDelete size={25} />
        </div>
      </div>
    </div>
  );
}
