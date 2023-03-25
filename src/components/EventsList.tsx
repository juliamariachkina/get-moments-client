import styles from "./EventsList.module.css";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Event } from "../types/event";
import { getMonthAndYear } from "../utils/EventUtils";

type Props = Readonly<{
  events: Event[];
}>;

export const EventsList: FC<Props> = (props) => {
  return (
    <div className={styles.events}>
      <h2>All Events</h2>
      <ul className={styles.list}>
        {props.events.map((event) => (
          <li key={event.slug} className={styles.item}>
            <Link to={`/events/${event.slug}`}>
              <div
                className={styles.content}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5)), url(${event.image})`,
                }}
              >
                <h2>{event.name}</h2>
                <h3>{getMonthAndYear(new Date(event.startTime))}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
