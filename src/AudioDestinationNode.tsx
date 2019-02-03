import React, { useRef } from "react";
import { useAudioNode } from "./AudioNode";

const _AudioDestinationNode: React.RefForwardingComponent<
  AudioDestinationNode
> = (_props, ref) => {
  useAudioNode(api => api.destination, null, ref);

  return (
    <div>
      <h2>Audio Destination Node</h2>
    </div>
  );
};

export const AudioDestinationNode = React.forwardRef(_AudioDestinationNode);

export function useAudioDestination() {
  const ref = useRef<AudioDestinationNode>(null);
  return { ref, input: () => ref.current };
}
