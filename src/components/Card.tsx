import React, { ReactNode, FC } from "react";
import styles from "./Card.module.css";

type Props = Readonly<{
  children?: ReactNode;
}>;

export const Card: FC<Props> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};
