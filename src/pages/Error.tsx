import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { MainNavigation } from "../components/layout/MainNavigation";

type Error = {
  data: {
    message: string;
  };
  status: number;
};

const isError = (obj: unknown): obj is Error => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj &&
    typeof obj.data === "object" &&
    obj.data !== null &&
    "message" in obj.data &&
    typeof obj.data.message === "string" &&
    "status" in obj &&
    typeof obj.status === "number"
  );
};

export const ErrorPage: FC = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong :(";

  if (isError(error)) {
    if (error.status === 500) {
      message = error.data.message;
    }

    if (error.status === 404) {
      title = "Not found!";
      message = "Could not find resource or page.";
    }
  }

  return (
    <>
      <MainNavigation />
      <div style={{ textAlign: "center" }}>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </>
  );
};
