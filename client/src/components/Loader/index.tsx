import React from "react";
import { BarLoader } from "react-spinners";

import styles from "./styles.module.css";

type Props = {
  loading: boolean;
  height: any;
  width?: any;
  color?: string;
};

const Loader = ({ loading, height, width = "1vw", color }: Props) => {
  return (
    <div className={styles.loader_main}>
      <BarLoader
        loading={loading}
        height={height}
        width={width}
        color={color}
      />
    </div>
  );
};

export { Loader };
