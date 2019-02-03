import React, { useRef } from "react";
import { ConnectTo, useAudioNode } from "./AudioNode";

type Props = {
  connectTo: ConnectTo;
  gain?: number;
};

const _GainNode: React.RefForwardingComponent<GainNode, Props> = (
  { connectTo, gain },
  ref
) => {
  const node = useAudioNode(api => api.createGain(), connectTo, ref);

  if (gain !== undefined) {
    node.gain.value = gain;
  }

  return (
    <div>
      <h2>Gain Node</h2>
      <dl>
        <dt>gain</dt>
        <dd>{gain}</dd>
      </dl>
    </div>
  );
};

export const GainNode = React.forwardRef(_GainNode);

export function useGain() {
  const ref = useRef<GainNode>(null);
  return {
    ref,
    input: () => ref.current,
    gain: () => ref.current && ref.current.gain
  };
}
