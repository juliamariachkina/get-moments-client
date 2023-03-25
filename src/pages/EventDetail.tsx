import { FC } from "react";
import { useParams } from "react-router-dom";
import { EventItem } from "../components/EventItem";
import { useEventBySlugQuery } from "../queries/event-by-slug";

export const EventDetailPage: FC = () => {
  const params = useParams();
  const { data, error, loading } = useEventBySlugQuery(params.slug ?? "");
  if (!data) return <p>Error</p>;
  return <EventItem event={data.eventBySlug} />;
};
