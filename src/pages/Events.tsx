import { EventsList } from "../components/EventsList";
import { EventObjectTypeEdge } from "../types/event-object-type-edge";
import { useFeaturedEventsQuery } from "../queries/featured-events";
import { Event } from "../types/event";
import { FC } from "react";
import { QueryResult } from "../components/QueryResult";
import { json } from "react-router-dom";

export const EventsPage: FC = () => {
  const { data, loading, fetchMore, error } = useFeaturedEventsQuery();
  if (loading) return <p>Loading...</p>;

  // if (error) {
  //   throw new Error("my error");
  // }

  const nodes: Event[] = data.featuredEvents.edges.map(
    (edge: EventObjectTypeEdge) => edge.node
  );
  const pageInfo = data.featuredEvents.pageInfo;

  const loadMore = () => {
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
        },
      });
    }
  };

  const loadPrev = () => {
    if (pageInfo.hasPreviousPage) {
      fetchMore({
        variables: {
          cursor: pageInfo.startCursor,
        },
      });
    }
  };

  return (
    <div>
      <EventsList events={nodes} />
      <div>
        <button onClick={loadPrev}>Previous</button>
        <button onClick={loadMore}>Next</button>
      </div>
    </div>
  );
};
