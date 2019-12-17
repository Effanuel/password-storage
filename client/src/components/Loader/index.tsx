import React from "react";
import { BarLoader } from "react-spinners";

import styles from "./styles.module.css";

const Loader = ({ loading, height, width, ...other }: any) => {
  return (
    <div className={styles["loader-main"]}>
      <BarLoader loading={loading} height={height} width={"1vw"} {...other} />
    </div>
  );
};

export { Loader };
