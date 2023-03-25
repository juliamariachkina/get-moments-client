import { gql, useQuery } from "@apollo/client";

export const FEATURED_EVENTS = gql`
  query featuredEvents($after: String) {
    featuredEvents(first: 3, after: $after) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          name
          slug
          image
          startTime
          city
        }
        cursor
      }
    }
  }
`;

export const useFeaturedEventsQuery = () => {
  return useQuery(FEATURED_EVENTS);
};
