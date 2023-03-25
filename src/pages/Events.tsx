import { EventsList } from "../components/EventsList";
import { EventObjectTypeEdge } from "../types/event-object-type-edge";
import { useFeaturedEventsQuery } from "../queries/featured-events";
import { FC } from "react";
import { Button } from "../components/button/Button";
import { QueryResult } from "../components/QueryResult";

export const EventsPage: FC = () => {
  const { data, loading, fetchMore, error } = useFeaturedEventsQuery();

  const pageInfo = data?.featuredEvents.pageInfo;
  const nodes = data?.featuredEvents.edges.map(
    (edge: EventObjectTypeEdge) => edge.node
  );

  const loadMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo?.endCursor,
        },
      });
    }
  };

  return (
    <QueryResult loading={loading} error={error}>
      <EventsList events={nodes} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMore} disabled={!pageInfo?.hasNextPage}>
          Load More
        </Button>
      </div>
    </QueryResult>
  );
};
