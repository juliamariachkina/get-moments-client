import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";

export const MainNavigation: FC = () => {
  return (
    <header className={styles.header}>
      <h1>GetMoments</h1>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/"
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/events"
          >
            Events
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
