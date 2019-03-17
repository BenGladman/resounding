import React, { FunctionComponent } from "react";
import { useName } from "../connection";
import { AudioDestination, Gain } from "../nodes";

type Props = {
  name: string;
  gain?: number;
  gainParam?: string;
};

export const Master: FunctionComponent<Props> = ({
  name,
  gain = 0.5,
  gainParam
}) => {
  const destName = useName("destination");

  return (
    <>
      <AudioDestination name={destName} />
      <Gain
        connectTo={destName}
        name={name}
        gain={gain}
        gainParam={gainParam}
      />
    </>
  );
};
