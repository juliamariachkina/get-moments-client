import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../store/user";

import styles from "./MainNavigation.module.css";

export const MainNavigation: FC = () => {
  const { user } = useContext(UserContext);
  const userctx = useContext(UserContext);
  console.log(userctx);

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
        {user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/events"
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/logout"
              >
                Logout
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};
