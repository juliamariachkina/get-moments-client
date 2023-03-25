import { ReactNode, FC, ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

type Props = Readonly<{
  children?: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<unknown>["type"];
  disabled?: boolean;
}>;

export const Button: FC<Props> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
