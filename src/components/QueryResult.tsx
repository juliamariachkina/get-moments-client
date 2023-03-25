import { ApolloError } from "@apollo/client";
import { FC, ReactNode } from "react";
import { Loader } from "./Loader";

type Props = Readonly<{
  error?: ApolloError;
  loading: boolean;
  children: ReactNode;
}>;

export const QueryResult: FC<Props> = ({ error, loading, children }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Something went wrong..</h1>
          <p>Please try again</p>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};
