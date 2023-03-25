import { gql, useQuery } from "@apollo/client";

const FEATURED_EVENTS = gql`
  query featuredEvents($cursor: String) {
    featuredEvents(first: 6, after: $cursor) {
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
