import { ApolloError, useApolloClient } from "@apollo/client";
import { FC } from "react";
import { json, useParams } from "react-router-dom";
import { EventItem } from "../components/EventItem";
import { EVENT_BY_SLUG, useEventBySlugQuery } from "../queries/event-by-slug";
import { client } from "../utils/apollo-client";

export const EventDetailPage: FC = () => {
  const params = useParams();
  const { data } = useEventBySlugQuery(params.slug ?? "");
  if (!data) return <p>Error</p>;
  return <EventItem event={data.eventBySlug} />;
};

export const loadEvent = async (slug: string) => {
  try {
    await client.query({
    query: EVENT_BY_SLUG,
    variables: { slug },
  });
  } catch (e) {
    throw json({data: e});
  }
  return null;
};
