import React, { FunctionComponent } from "react";
import { useAudioDestinationNode, useGainNode } from "../nodes";
import { useAudioModule } from "./audioModule";

export function useMasterModule() {
  const AudioDestination = useAudioDestinationNode();
  const MasterGain = useGainNode();
  return useAudioModule(
    (): FunctionComponent => () => {
      return (
        <>
          <AudioDestination />
          <MasterGain connectTo={AudioDestination.node} gain={0.5} />
        </>
      );
    },
    () => ({ node: MasterGain.node, gain: MasterGain.gain })
  );
}
