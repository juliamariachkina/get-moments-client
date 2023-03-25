import { FC, ReactNode } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

import styles from "./Form.module.css";

type Props<FormMethods extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<FormMethods>;
  onSubmit: () => void;
};

export const Form = <FormMethods extends FieldValues>({
  children,
  methods,
  onSubmit,
}: Props<FormMethods>) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
