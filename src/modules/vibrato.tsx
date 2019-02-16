import React, { FunctionComponent } from "react";
import { ConnectTo } from "../connection";
import { useGainNode, useOscillatorNode } from "../nodes";
import { useAudioModule } from "./audioModule";

type Props = {
  connectTo: ConnectTo;
  depth: number;
  frequency: number;
};

export function useVibratoModule() {
  const Gain = useGainNode();
  const Lfo = useOscillatorNode();

  return useAudioModule(
    (): FunctionComponent<Props> => ({ connectTo, depth, frequency }) => {
      return (
        <>
          <Gain connectTo={connectTo} gain={depth} />
          <Lfo connectTo={Gain.node} frequency={frequency} />
        </>
      );
    },
    () => ({ depth: Gain.gain, frequency: Lfo.frequency })
  );
}
