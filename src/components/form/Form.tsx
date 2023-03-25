import { ReactNode } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

import styles from "./Form.module.css";

export type FormProps<FormMethods extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<FormMethods>;
  onSubmit: () => void;
};

export const Form = <FormMethods extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProps<FormMethods>) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
