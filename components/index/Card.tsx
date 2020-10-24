import * as React from 'react';

import styles from './Card.module.scss';

import { CardStatus } from "../../types/enum";

export default function Card({value, status, onClick}) {
  const [style, setStyle] = React.useState<string>(styles.card);

  React.useEffect(() => {
    if (status === CardStatus.Open) setStyle(styles.card + " " + styles.open + " " + styles.disabled);
    if (status === CardStatus.Hidden) setStyle(styles.card);
    if (status === CardStatus.Matched) setStyle(styles.card + " " + styles.matched + " " + styles.disabled);
    if (status === CardStatus.Unmatched) setStyle(styles.card + " " + styles.unmatched + " " + styles.disabled);
  }, [status]);

  return (
    <div onClick={onClick} className={style}>
      <p>{(status !== 1) ? value: ""}</p>
    </div>
  )
}