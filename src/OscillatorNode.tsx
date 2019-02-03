import React, { useEffect, useRef } from "react";
import { ConnectTo, useAudioNode } from "./AudioNode";

type Props = {
  connectTo: ConnectTo;
  frequency?: number;
  type?: OscillatorNode["type"];
};

const _OscillatorNode: React.RefForwardingComponent<OscillatorNode, Props> = (
  { connectTo, frequency, type },
  ref
) => {
  const node = useAudioNode(api => api.createOscillator(), connectTo, ref);

  useEffect(() => {
    node.start();
    return () => {
      node.stop();
    };
  }, [node]);

  if (frequency !== undefined) {
    node.frequency.value = frequency;
  }
  if (type !== undefined) {
    node.type = type;
  }
  return (
    <div>
      <h2>Oscillator Node</h2>
      <dl>
        <dt>type</dt>
        <dd>{type}</dd>
        <dt>frequency</dt>
        <dd>{frequency}</dd>
      </dl>
    </div>
  );
};

export const OscillatorNode = React.forwardRef(_OscillatorNode);

export function useOscillator() {
  const ref = useRef<OscillatorNode>(null);
  return {
    ref,
    frequency: () => ref.current && ref.current.frequency,
    detune: () => ref.current && ref.current.detune
  };
}
