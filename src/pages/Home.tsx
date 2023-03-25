import { FC, useContext } from "react";
import { UserContext } from "../store/user";
import { json, Link } from "react-router-dom";

export const HomePage: FC = () => {
  const { user } = useContext(UserContext);
  const message = user ? (
    <p>
      Browse all of your <Link to="/events">events</Link>
    </p>
  ) : (
    <p>
      <Link to="/login">Log in</Link> to browse your events
    </p>
  );
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome</h1>
      {message}
    </div>
  );
};
