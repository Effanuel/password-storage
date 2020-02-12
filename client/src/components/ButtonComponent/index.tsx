import React from "react";

import "./styles.css";

type Props = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  type?: string;
};

const ButtonComponent = ({
  label,
  disabled,
  onClick,
  type = "text"
}: Props) => {
  return (
    <button
      className={type === "close" ? "btn-style btn-cl" : "btn-style btn-su"}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export { ButtonComponent };
