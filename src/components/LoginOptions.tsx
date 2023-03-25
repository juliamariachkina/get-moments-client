import { FC } from "react";
import { Button } from "../components/button/Button";

type Props = Readonly<{
  options: readonly Readonly<{
    name: string;
    onClick: () => void;
  }>[];
}>;

export const LoginOptions: FC<Props> = ({ options }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {options.map((option) => (
        <Button key={option.name} onClick={option.onClick}>
          {option.name}
        </Button>
      ))}
    </div>
  );
};
