import { Card } from "../components/Card";
import { EventsList } from "../components/EventsList";
import { FC } from "react";

export const EventsPage: FC = () => {
  return (
    <div>
      <div>
        <button onClick={loadPrev}>Previous</button>
        <button onClick={loadMore}>Next</button>
      </div>
    </div>
  );
};
