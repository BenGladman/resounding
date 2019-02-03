import React from "react";
import { useAudioNode } from "./AudioNode";

type Props = {
  connectTo?: AudioNode | AudioParam;
  gain?: number;
  children?: (node: GainNode) => React.ReactElement<any>;
};

export const GainNode: React.FunctionComponent<Props> = ({
  connectTo,
  gain,
  children
}) => {
  const node = useAudioNode(api => api.createGain(), connectTo);
  if (gain !== undefined) {
    node.gain.value = gain;
  }
  return (
    <div>
      <h2>Gain Node</h2>
      <dl>
        <dt>gain</dt>
        <dd>{gain}</dd>
        <dt>connectTo</dt>
        <dd>{connectTo && connectTo.toString()}</dd>
        <dt>children</dt>
        <dd>{children && children(node)}</dd>
      </dl>
    </div>
  );
};
