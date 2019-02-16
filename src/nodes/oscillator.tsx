import React, { useEffect } from "react";
import { ConnectTo, useConnection } from "../connection";
import { useAudioNode } from "./audioNode";

type Props = {
  connectTo: ConnectTo;
  frequency?: number;
  type?: OscillatorNode["type"];
};

export function useOscillatorNode() {
  const Component = useAudioNode(
    api => api.createOscillator(),

    (node): React.FunctionComponent<Props> => ({
      connectTo,
      frequency,
      type
    }) => {
      useConnection(node, connectTo);

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
    },

    node => ({ displayName: "Oscillator", node, frequency: node.frequency })
  );

  useEffect(() => {
    Component.node.start();
    return () => {
      Component.node.stop();
    };
  }, [Component.node]);

  return Component;
}
