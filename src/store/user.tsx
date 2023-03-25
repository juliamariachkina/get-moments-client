import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { useApolloClient } from "@apollo/client";
import { getNewLink } from "../utils/apollo-client";

export const UserContext = createContext<{
  user: User | undefined;
  token: string;
}>({ user: undefined, token: "" });

type Props = {
  children?: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");
  const client = useApolloClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      console.info("USER CHANGE", u);
      setUser(u ?? undefined);
      if (u) {
        u.getIdToken().then((userToken) => {
          setToken(userToken);
          client.setLink(getNewLink(userToken));
        });
      } else {
        setToken("");
        client.setLink(getNewLink());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, token }}>
      {children}
    </UserContext.Provider>
  );
};
