import React from 'react';
import './styles.css';

interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  type?: string;
}

export function ButtonComponent({label, disabled, onClick, type = 'text'}: Props) {
  const styleType = type === 'close' ? 'btn-cl' : 'btn-su';
  return (
    <button className={`btn-style ${styleType}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
