import { FC, ReactNode } from "react";

import styles from "./Form.module.css";

type FormProps = Readonly<{
  children: ReactNode;
  onSubmit: () => void;
}>;

export const Form: FC<FormProps> = ({
  children,
  onSubmit,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
