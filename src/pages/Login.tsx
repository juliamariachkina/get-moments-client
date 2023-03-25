import { Modal } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import {
  useSignInWithApple,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button/Button";
import { ControlledTextField } from "../components/form/ControlledTextField";
import { Form } from "../components/form/Form";
import { useMeLazyQuery } from "../queries/me";
import { auth } from "../utils/firebase-config";
import { Auth } from "firebase/auth";

type RouterState = {
  from: string;
};

type LoginForm = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [getMe, { data: meData, loading: meLoading }] = useMeLazyQuery();
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [signInWithApple] = useSignInWithApple(auth);
  const [signInWithEmailAndPassword, emailUser, loadingLogin, loginError] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const methods = useForm<LoginForm>({ mode: "onChange" });
  const { handleSubmit, getValues } = methods;

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userToken) {
      return;
    }
    getMe();
    console.log(meData);
  }, [userToken]);

  useEffect(() => {
    if (!meLoading && meData?.me?.id) {
      navigate("/");
    }
  }, [meData, meLoading, navigate]);

  const handleConfirm = () => {
    const { email, password } = getValues();
    signInWithEmailAndPassword(email, password).then(() =>
      storeTokenInLocalStorage(auth)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "60rem",
        margin: "auto",
      }}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={() =>
              signInWithFacebook().then(() => storeTokenInLocalStorage(auth))
            }
          >
            Continue with Facebook
          </Button>
          <Button
            onClick={() =>
              signInWithGoogle().then(() => storeTokenInLocalStorage(auth))
            }
          >
            Continue with Google
          </Button>
          <Button
            onClick={() =>
              signInWithApple().then(() => storeTokenInLocalStorage(auth))
            }
          >
            Continue with Apple
          </Button>
          <Button onClick={() => setShowLoginPopup(true)}>
            Continue with email and password
          </Button>
        </div>
      </div>
      <Modal show={showLoginPopup} onClose={() => setShowLoginPopup(false)}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <Form methods={methods} onSubmit={handleSubmit(handleConfirm)}>
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
                Email or password incorrect or user does not exist. Please use
                the mobile app to Sign up.
              </p>
            )}
            <Button type="submit" disabled={loadingLogin}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;

const storeTokenInLocalStorage = (auth: Auth) => {
  auth.currentUser
    ?.getIdToken()
    .then((token: string) => localStorage.setItem("token", token));
};
