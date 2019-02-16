import React from "react";
import { useAudioNode } from "./audioNode";

export function useAudioDestinationNode() {
  return useAudioNode(
    api => api.destination,

    (): React.FunctionComponent => () => (
      <div>
        <h2>Audio Destination Node</h2>
      </div>
    ),

    node => ({ displayName: "AudioDestination", node })
  );
}
