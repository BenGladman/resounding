import React, { FunctionComponent } from "react";
import { useName } from "../connection";
import { Gain, Oscillator } from "../nodes";

type Props = {
  connectTo: string;
  depth: number;
  depthParam?: string;
  frequency: number;
  frequencyParam?: string;
};

export const Vibrato: FunctionComponent<Props> = ({
  connectTo,
  depth,
  depthParam,
  frequency,
  frequencyParam
}) => {
  const gainName = useName("vibrato");

  return (
    <>
      <Gain
        connectTo={connectTo}
        name={gainName}
        gain={depth}
        gainParam={depthParam}
      />
      <Oscillator
        connectTo={gainName}
        frequency={frequency}
        frequencyParam={frequencyParam}
      />
    </>
  );
};
