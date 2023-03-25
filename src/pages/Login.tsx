import { FC, useEffect, useState } from "react";
import {
  useSignInWithApple,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMeLazyQuery } from "../queries/me";
import { auth } from "../utils/firebase-config";
import { LoginOptions } from "../components/LoginOptions";
import {
  EmailLoginModal,
  LoginForm,
} from "../components/modal/EmailLoginModal";

export const LoginPage: FC = () => {
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

  // const userToken = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!userToken) {
  //     return;
  //   }
  //   getMe();
  //   console.log(auth);
  // }, [userToken]);

  useEffect(() => {
    if (!meLoading && meData?.me?.id) {
      navigate("/");
    }
  }, [meData, meLoading, navigate]);

  const handleConfirm = () => {
    const { email, password } = getValues();
    signInWithEmailAndPassword(email, password);
  };

  const loginOptions = [
    {
      name: "Continue with Facebook",
      onClick: () => signInWithFacebook(),
    },
    {
      name: "Continue with Google",
      onClick: () => signInWithGoogle(),
    },
    {
      name: "Continue with Apple",
      onClick: () => signInWithApple(),
    },
    {
      name: "Continue with email and password",
      onClick: () => setShowLoginPopup(true),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "60rem",
        margin: "auto",
      }}
    >
      <LoginOptions options={loginOptions} />
      <EmailLoginModal
        show={showLoginPopup}
        onModalClose={() => setShowLoginPopup(false)}
        methods={methods}
        onSubmit={() => handleSubmit(handleConfirm)}
        loginError={loginError}
        isButtonDisabled={loadingLogin}
      />
    </div>
  );
};

// const storeTokenInLocalStorage = (auth: Auth) => {
//   auth.currentUser
//     ?.getIdToken()
//     .then((token: string) => localStorage.setItem("token", token));
// };
