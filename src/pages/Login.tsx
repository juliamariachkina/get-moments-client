import { FC, useEffect, useState } from "react";
import {
  useSignInWithApple,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase-config";
import { LoginOptions } from "../components/LoginOptions";
import {
  EmailLoginModal,
} from "../components/modal/EmailLoginModal";
import { useUserContext } from "../store/user";

export const LoginPage: FC = () => {
  const {user} = useUserContext();
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [signInWithApple] = useSignInWithApple(auth);
  const [signInWithEmailAndPassword, , loadingLogin, loginError] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signInWithEmail = (email: string, password: string) => {
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
        onSubmit={signInWithEmail}
        loginError={loginError}
        isLoginDisabled={loadingLogin}
      />
    </div>
  );
};
