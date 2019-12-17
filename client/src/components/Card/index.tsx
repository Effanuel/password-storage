import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";

import styles from "./styles.module.css";

const {
  container,
  buttonStyle,
  deleteStyle,
  edit,
  nameLoginContainer,
  nameStyle,
  loginStyle,
  copiedStyle
} = styles;

interface Props {
  id: any;
  name: string;
  login: string;
  password: string;
  onClickUpdate: (
    e: any,
    id: any,
    name: string,
    login: string,
    password: string
  ) => void;
  onClickRemove: (e: any, id: any) => void;
  onClickCopy: (e: any, password: string, id: any) => void;
  copied: boolean;
}

const Card = ({
  id,
  name,
  login,
  password,
  onClickUpdate,
  onClickRemove,
  onClickCopy,
  copied
}: Props) => {
  return (
    <div className={container}>
      <span
        className={nameLoginContainer}
        id={id}
        onClick={(e: any) => onClickCopy(e, password, id)}
      >
        <span className={nameStyle}>{name} </span>
        <span className={loginStyle}>{login}</span>
      </span>
      {copied === id && <div className={copiedStyle}>Copied.</div>}
      <div className={styles["button-container"]}>
        <div
          className={buttonStyle}
          id={edit}
          onClick={(e: any) => onClickUpdate(e, id, name, login, password)}
        >
          <MdEdit size={25} />
        </div>
        <div
          className={buttonStyle}
          id={deleteStyle}
          onClick={(e: any) => onClickRemove(e, id)}
        >
          <MdDelete size={25} />
        </div>
      </div>
    </div>
  );
};

export { Card };
