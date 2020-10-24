import * as React from 'react';

import styles from './IconButton.module.scss';


export default function IconButton({icon, text, onClick}) {
  return (
    <button onClick={onClick} className={styles.iconBtn}>
      <img src={icon} alt="icon"/>{text}
    </button>
  )
}