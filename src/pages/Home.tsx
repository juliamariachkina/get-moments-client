import { FC } from "react";
import { useUserContext } from "../store/user";
import { Link } from "react-router-dom";

export const HomePage: FC = () => {
  const { user } = useUserContext();
  
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome</h1>
      {user ? (
        <p>
          Browse all of your <Link to="/events">events</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Log in</Link> to browse your events
        </p>
      )}
    </div>
  );
};
