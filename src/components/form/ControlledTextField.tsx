import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { FC, HTMLInputTypeAttribute } from "react";

type Props<FormMethods extends FieldValues> = {
  name: Path<FormMethods>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  control: Control<FormMethods, any>;
  defaultValue: PathValue<FormMethods, Path<FormMethods>>;
};

export const ControlledTextField = <FormMethods extends FieldValues>({
  name,
  type,
  placeholder,
  label,
  control,
  defaultValue,
}: Props<FormMethods>) => {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched
            ref={ref} // wire up the input ref
          />
        </>
      )}
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue={defaultValue}
    />
  );
};
