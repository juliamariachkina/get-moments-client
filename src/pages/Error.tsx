import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { MainNavigation } from "../components/layout/MainNavigation";

type Error = {
  data: string;
  status?: number;
};

const isError = (obj: unknown): obj is Error => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj &&
    typeof obj.data === "string" &&
    (("status" in obj && typeof obj.status === "number") || !("status" in obj))
  );
};

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);

  let title = "An error occurred!";
  let message = "Something went wrong :(";

  if (isError(error)) {
    if (error.status && error.status === 404) {
      title = "Not found!";
      message = "Could not find resource or page.";
    }
    message = error.data;
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
