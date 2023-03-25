import { FC } from "react";
import { Modal, ModalProps } from "./Modal";
import { ControlledTextField } from "../form/ControlledTextField";
import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { AuthError } from "firebase/auth";
import { useForm } from "react-hook-form";

type LoginForm = Readonly<{
  email: string;
  password: string;
}>;

type Props = Omit<ModalProps, "children" | "header"> & {
    loginError?: AuthError;
    isLoginDisabled: boolean;
    show: boolean;
    onSubmit: (email: string, password: string) => void;
  };

export const EmailLoginModal: FC<Props> = ({
  show,
  onModalClose,
  onSubmit,
  loginError,
  isLoginDisabled,
}) => {
  const methods = useForm<LoginForm>({ mode: "onChange" });
  const { handleSubmit, getValues } = methods;

  const submit = () => {
    const {email, password} = getValues();
    return onSubmit(email, password);
  }
  return (
    <Modal show={show} onModalClose={onModalClose} header="Login">
      <Form onSubmit={handleSubmit(submit)}>
        <ControlledTextField
          name="email"
          type="email"
          placeholder="john@doe.com"
          label="Email"
          control={methods.control}
          defaultValue=""
        />
        <ControlledTextField
          name="password"
          type="password"
          placeholder="Enter strong password"
          label="Password"
          control={methods.control}
          defaultValue=""
        />
        {loginError && (
          <p>
            Email or password incorrect or user does not exist. Please use the
            mobile app to Sign up.
          </p>
        )}
        <Button type="submit" disabled={isLoginDisabled}>
          Login
        </Button>
      </Form>
    </Modal>
  );
};
