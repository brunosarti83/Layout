/* eslint-disable react/prop-types */
import { User } from "@nextui-org/react";
import { symbols } from "../../../helpers/symbols";

export default function SingleTicker({ symbol }) {
  return (
    <User
      name={symbol}
      description={symbols[symbol].description}
      avatarProps={{ src: symbols[symbol].image }}
      classNames={{
        base: "",
        wrapper: "",
        name: "",
        description: "",
      }}
    />
  );
}
