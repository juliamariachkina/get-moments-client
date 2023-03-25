import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../store/user";

import styles from "./MainNavigation.module.css";

export const MainNavigation: FC = () => {
  const { user } = useContext(UserContext);

  const loggedInLinks = [
    { name: "Home", to: "/" },
    { name: "Events", to: "/events" },
    { name: "Logout", to: "/logout" },
  ];

  const loggedOutLinks = [
    { name: "Home", to: "/" },
    { name: "Login", to: "/login" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <header className={styles.header}>
      <h1>GetMoments</h1>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to={link.to}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};
