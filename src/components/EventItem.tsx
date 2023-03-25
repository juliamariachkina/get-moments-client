import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EventExtended } from "../types/event";
import { getDate } from "../utils/EventUtils";

import styles from "./EventItem.module.css";

type Props = Readonly<{
  event: EventExtended;
}>;

export const EventItem: FC<Props> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate("/events")}>&#60;</button>
      <div className={styles.event}>
        <img src={event.image} alt={event.name} />
        <h2>{event.name}</h2>
        <p className={styles.address}>{`${event.venue}, ${event.city}`}</p>
        <p className={styles.date}>{getDate(new Date(event.startTime))}</p>
        <p className={styles.description}>{event.description}</p>
      </div>
    </div>
  );
};
