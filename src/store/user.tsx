import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase-config";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? undefined);
      if (u) {
        u.getIdToken().then((token) => setToken(token));
      } else {
        setToken("");
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
