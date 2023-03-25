import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { getNewLink } from "../utils/apollo-client";
import { client } from "../utils/apollo-client";

export const UserContext = createContext<{
  user: User | null;
  token: string;
  isLoading: boolean;
}>({ user: null, token: "", isLoading: true });

type Props = {
  children?: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (optUser) => {
      console.log(client.cache);
      setUser(optUser);
      if (optUser) {
        optUser.getIdToken().then((userToken) => {
          setIsLoading(false);
          setToken(userToken);
          client.setLink(getNewLink(userToken));
        });
      } else {
        setIsLoading(false);
        setToken("");
        client.setLink(getNewLink());
        client.clearStore();
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
