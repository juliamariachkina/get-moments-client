import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { getNewLink } from "../utils/apollo-client";
import { client } from "../utils/apollo-client";

export const UserContext = createContext<{
  user: User | undefined;
  token: string;
  isLoading: boolean;
}>({ user: undefined, token: "", isLoading: true });

type Props = {
  children?: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (optUser) => {
      console.info("USER CHANGE", optUser);
      setUser(optUser ?? undefined);
      if (optUser) {
        optUser.getIdToken().then((userToken) => {
          console.log("I am here");
          setIsLoading(false);
          setToken(userToken);
          client.setLink(getNewLink(userToken));
          console.log(client);
        });
      } else {
        setToken("");
        setIsLoading(false);
        client.setLink(getNewLink());
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user, token, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
