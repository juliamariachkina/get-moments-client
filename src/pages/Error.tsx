import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { MainNavigation } from "../components/layout/MainNavigation";

type Error = Readonly<{
  data: string;
  status?: number;
}>;

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
  const { title, message } = createErrorTitleAndMessage(error);

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

const createErrorTitleAndMessage = (error: unknown) => {
  if (isError(error)) {
    if (error.status && error.status === 404) {
      return {
        title: "Not found!",
        message: "Could not find resource or page.",
      };
    }
    return { title: "Not found!", message: error.data };
  }
  return { title: "An error occurred!", message: "Something went wrong :(" };
};
