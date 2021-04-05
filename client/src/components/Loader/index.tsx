import React from 'react';
import {BarLoader} from 'react-spinners';
import styles from './styles.module.css';

interface Props {
  loading: boolean;
  height: any;
  width?: any;
  color?: string;
}

export function Loader({loading, height, width = '1vw', color}: Props) {
  return (
    <div className={styles.loader_main}>
      <BarLoader loading={loading} height={height} width={width} color={color} />
    </div>
  );
}
