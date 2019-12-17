import React from "react";

import "./styles.css";

const ButtonComponent = ({
  label,
  disabled,
  onClick,
  type,
  ...otherProps
}: any) => {
  return (
    <button
      className={type === "close" ? "btn-style btn-cl" : "btn-style btn-su"}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {label}
    </button>
  );
};

export { ButtonComponent };
