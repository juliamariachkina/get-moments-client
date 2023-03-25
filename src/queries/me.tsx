import { useLazyQuery, gql } from "@apollo/client";

const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
      avatar
      avatarWidth
      avatarHeight
      firebaseId
      fcmToken
      isActive
      registered
      language
      validEmail
    }
  }
`;

export const useMeLazyQuery = () => {
  return useLazyQuery(ME);
};
