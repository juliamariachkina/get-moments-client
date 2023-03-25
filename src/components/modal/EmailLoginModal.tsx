import { FC } from "react";
import { Modal, ModalProps } from "./Modal";
import { ControlledTextField } from "../form/ControlledTextField";
import { Form, FormProps } from "../form/Form";
import { Button } from "../button/Button";
import { AuthError } from "firebase/auth";

export type LoginForm = {
  email: string;
  password: string;
};

type Props = Omit<ModalProps, "children" | "header"> &
  Omit<FormProps<LoginForm>, "children"> & {
    loginError?: AuthError;
    isButtonDisabled: boolean;
  };

export const EmailLoginModal: FC<Props> = ({
  show,
  onModalClose,
  methods,
  onSubmit,
  loginError,
  isButtonDisabled,
}) => {
  return (
    <Modal show={show} onModalClose={onModalClose} header="Login">
      <Form methods={methods} onSubmit={onSubmit}>
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
        <Button type="submit" disabled={isButtonDisabled}>
          Login
        </Button>
      </Form>
    </Modal>
  );
};
