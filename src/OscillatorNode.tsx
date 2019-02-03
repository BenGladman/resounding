import React, { useEffect } from "react";
import { useAudioNode } from "./AudioNode";

type Props = {
  connectTo?: AudioNode | AudioParam;
  frequency?: number;
  type?: OscillatorNode["type"];
  children?: (node: OscillatorNode) => React.ReactElement<any>;
};

export const OscillatorNode: React.FunctionComponent<Props> = ({
  connectTo,
  frequency,
  type,
  children
}) => {
  const node = useAudioNode(api => api.createOscillator(), connectTo);

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
        <dt>connectTo</dt>
        <dd>{connectTo && connectTo.toString()}</dd>
        <dt>actions</dt>
        <dt>children</dt>
        <dd>{children && children(node)}</dd>
      </dl>
    </div>
  );
};
