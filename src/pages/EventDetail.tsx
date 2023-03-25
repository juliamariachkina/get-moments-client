import { FC } from "react";
import { useParams } from "react-router-dom";
import { EventItem } from "../components/EventItem";
import { QueryResult } from "../components/QueryResult";
import { useEventBySlugQuery } from "../queries/event-by-slug";

export const EventDetailPage: FC = () => {
  const params = useParams();
  const { data, error, loading } = useEventBySlugQuery(params.slug ?? "");
  return (
    <QueryResult error={error} loading={loading}>
      <EventItem event={data?.eventBySlug} />
    </QueryResult>
  );
};
