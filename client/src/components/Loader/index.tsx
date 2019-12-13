import React from "react";
import { BarLoader } from "react-spinners";

import "./styles.css";

const Loader = ({ loading, height, width, ...other }: any) => {
  return (
    <div className="loader-main">
      <BarLoader loading={loading} height={height} width={"1vw"} {...other} />
    </div>
  );
};

export { Loader };
