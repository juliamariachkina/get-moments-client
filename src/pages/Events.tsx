import { EventsList } from "../components/EventsList";
import { EventObjectTypeEdge } from "../types/event-object-type-edge";
import {
  FEATURED_EVENTS,
  useFeaturedEventsQuery,
} from "../queries/featured-events";
import { FC } from "react";
import { client } from "../utils/apollo-client";
import { json } from "react-router-dom";
import { Button } from "../components/button/Button";

export const EventsPage: FC = () => {
  const { data, loading, fetchMore, error } = useFeaturedEventsQuery();
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  const pageInfo = data.featuredEvents.pageInfo;
  const nodes = data.featuredEvents.edges.map(
    (edge: EventObjectTypeEdge) => edge.node
  );

  const loadMore = () => {
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <div>
      <EventsList events={nodes} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMore} disabled={!pageInfo.hasNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export const loadEvents = async () => {
  console.log("Loader is starting");
  try {
    await client.query({
      query: FEATURED_EVENTS,
    });
  } catch (e) {
    throw json({ data: e });
  }
  return null;
};
