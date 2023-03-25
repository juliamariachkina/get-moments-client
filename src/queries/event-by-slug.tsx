import { gql, useQuery } from "@apollo/client";

export const EVENT_BY_SLUG = gql`
  query eventBySlug($slug: String) {
    eventBySlug(slug: $slug) {
      name
      slug
      image
      startTime
      city
      description
      venue
    }
  }
`;

export const useEventBySlugQuery = (slug: string) => {
  return useQuery(EVENT_BY_SLUG, { variables: { slug } });
};
